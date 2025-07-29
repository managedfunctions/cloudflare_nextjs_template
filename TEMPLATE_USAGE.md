# Using This Template

This template provides a complete authentication system built on Next.js 15, Cloudflare Workers, D1 database, and OTP authentication via email.

## What's Included

### Authentication System
- Email-based OTP (One-Time Password) authentication
- Secure session management with JWT tokens
- Protected routes with middleware
- User profile management

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Runtime**: Node.js runtime (not Edge runtime)
- **Actions**: React 15 Server Actions for data mutations
- **Styling**: Tailwind CSS v3
- **Deployment**: Cloudflare Workers via OpenNext adapter
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM
- **Email**: Resend for OTP delivery
- **Session Storage**: JWT tokens in HTTP-only cookies

### Database Schema
- `users` - User accounts with email, name, company, and role
- `user_items` - Generic many-to-many relationship table (customize for your needs)
- `otps` - One-time passwords for authentication
- `sessions` - Active user sessions

## Customization Guide

### 1. Branding
- Update the app name in `package.json` and `wrangler.toml`
- Modify the homepage content in `app/page.tsx`
- Customize colors and styling in Tailwind classes

### 2. Database Schema
- Rename `user_items` table to match your domain (e.g., `user_projects`, `user_documents`)
- Add new tables by creating migration files in `migrations/`
- Update Drizzle schema in `src/db/schema.ts`

### 3. User Roles
- Default role is 'user' - customize in `src/db/schema.ts`
- Add role-based access control in middleware or API routes
- Implement admin features based on roles

### 4. Email Templates
- Customize OTP email template in `src/lib/auth.ts`
- Add your company branding and messaging
- Consider adding email verification for new users

### 5. Dashboard Content
- Replace placeholder content in `app/dashboard/page.tsx` and `app/dashboard/dashboard-client.tsx`
- Add your application-specific features
- Create additional protected pages as needed
- Use server actions for data mutations

## Security Considerations

### Before Production
1. **Environment Variables**
   - Generate a strong JWT_SECRET (32+ characters)
   - Rotate API keys regularly
   - Never commit secrets to version control

2. **Rate Limiting**
   - Implement rate limiting for OTP requests
   - Add CAPTCHA for repeated failed attempts
   - Monitor for suspicious activity

3. **Additional Security**
   - Add CSRF protection
   - Implement Content Security Policy (CSP)
   - Enable CORS appropriately
   - Add request validation and sanitization

4. **Session Management**
   - Consider shorter session durations for sensitive apps
   - Implement "remember me" functionality carefully
   - Add session invalidation on password change

## Common Modifications

### Add Social Login
```typescript
// Add OAuth providers in addition to OTP
// Consider using Auth.js (NextAuth) or similar
```

### Add User Profiles
```typescript
// Extend the users table with additional fields
// Create a profile page for users to update their information
```

### Multi-tenancy
```typescript
// Add organization/tenant tables
// Implement tenant isolation in queries
// Add tenant context to sessions
```

### API Integration
```typescript
// Use Hyperdrive for external databases
// Use server actions for data mutations instead of API routes
// Implement proper error handling in server actions
// For external APIs, call them from server actions
```

## Performance Tips

1. **Database Queries**
   - Use indexes for frequently queried fields
   - Implement pagination for large datasets
   - Consider caching strategies with KV

2. **Node Runtime Optimization**
   - Keep bundle sizes small
   - Use dynamic imports for large components
   - Leverage Cloudflare's caching capabilities
   - Server actions reduce client-server roundtrips

3. **Monitoring**
   - Set up error tracking (e.g., Sentry)
   - Monitor performance metrics
   - Track authentication failures

## Getting Help

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [OpenNext Documentation](https://github.com/opennextjs/opennextjs-cloudflare)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Resend Documentation](https://resend.com/docs)