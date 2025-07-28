/// <reference types="@cloudflare/workers-types" />

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CloudflareEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};