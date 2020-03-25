export const environment = {
  production: true,
  apiUrl: 'http://localhost:90/server/',
  auth: {
    accessTokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    client: 'ozts-client',
    secret: 'ozts-secret',
    whiteListedDomains: [
      'localhost:90',
      'localhost:8082'
    ],
  }
};
