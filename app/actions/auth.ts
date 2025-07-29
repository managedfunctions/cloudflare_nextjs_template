'use server';

import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { getDb } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { 
  createOTP, 
  sendOTP, 
  verifyOTP, 
  createSession, 
  createSessionToken,
  verifySessionToken,
  getSessionUser
} from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function sendOtpAction(email: string) {
  try {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return { error: 'Invalid email address' };
    }

    const { env } = await getCloudflareContext();
    const db = getDb(env.BROKER_DB);
    const resend = new Resend(env.RESEND_API_KEY);

    let user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (user.length === 0) {
      await db.insert(users).values({ email });
    }

    const otp = await createOTP(db, email);
    const result = await sendOTP(resend, email, otp);

    if (!result.success) {
      return { error: 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in send-otp:', error);
    return { error: 'Internal server error' };
  }
}

export async function verifyOtpAction(email: string, code: string) {
  try {
    if (!email || !code || typeof email !== 'string' || typeof code !== 'string') {
      return { error: 'Invalid email or code' };
    }

    const { env } = await getCloudflareContext();
    const db = getDb(env.BROKER_DB);

    const isValid = await verifyOTP(db, email, code);

    if (!isValid) {
      return { error: 'Invalid or expired code' };
    }

    const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (userResult.length === 0) {
      return { error: 'User not found' };
    }

    const user = userResult[0];
    const sessionId = await createSession(db, user.id);
    const token = await createSessionToken(sessionId);

    const cookieStore = await cookies();
    cookieStore.set('session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        role: user.role,
      }
    };
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return { error: 'Internal server error' };
  }
}

export async function getCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session-token')?.value;

    if (!token) {
      return { error: 'Not authenticated' };
    }

    const sessionId = await verifySessionToken(token);
    
    if (!sessionId) {
      return { error: 'Invalid session' };
    }

    const { env } = await getCloudflareContext();
    const db = getDb(env.BROKER_DB);

    const result = await getSessionUser(db, sessionId);

    if (!result) {
      return { error: 'Session expired' };
    }

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        company: result.user.company,
        role: result.user.role,
      }
    };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { error: 'Internal server error' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session-token');
  return { success: true };
}