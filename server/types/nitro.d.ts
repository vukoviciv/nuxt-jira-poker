import type { H3Event } from 'h3';

declare module 'nitropack' {
  interface NitroApp {
    services: {
      auth: {
        getValidAccessToken: (event: H3Event) => Promise<string | undefined>;
      };
    };
  }
}

export {};
