export const oktaConfig = {
    clientId: '0oafap3yattMrzKEB5d7',
    issuer: 'https://dev-35378216.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}