declare module '#auth-utils' {
  interface User {
    atlassianId: string | undefined;
    name: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
  }
}

export {};
