import { getValidAccessToken } from '../modules/auth/auth.service';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.services = {
    auth: {
      getValidAccessToken,
    },
  };
});
