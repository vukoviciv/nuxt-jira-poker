export interface AtlassianRawTokens {
  access_token: string;
  refresh_token?: string; // This is accessible because of the offline_access scope
  expires_in?: number;
  token_type?: string;
  scope?: string;
}
