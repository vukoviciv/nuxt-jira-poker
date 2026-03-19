declare module '#auth-utils' {
  interface User {
    atlassianId?: string;
    name?: string;
    email?: string;
    avatar?: string;
  }

  interface SecureSessionData {
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: number;
  }
}

export {};
