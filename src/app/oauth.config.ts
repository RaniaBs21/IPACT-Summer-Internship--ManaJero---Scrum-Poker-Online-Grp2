import {AuthConfig} from 'angular-oauth2-oidc';

export const ff: AuthConfig = {
  clientId: 'ZfPIoROl8gc2nTWtoxZYyD3oXrZUYqFq',
  scope: 'manage:jira-project read:jira-work manage:jira-configuration read:jira-user write:jira-work manage:jira-webhook manage:jira-data-provider read:me read:account offline_access',
  responseType: 'code',
  redirectUri: 'http://localhost:4200/pages/agile/scrum-poker-group2/session/room/66ab659e8b7a1840ab2d8cf7',
  dummyClientSecret: 'ATOAmqeOwr_iKeEza84apDXbg9gjg9AMYDFPwNIzwYi5CsWW-z3MEI1y949E4kWl--yB29135E68',
  loginUrl: 'https://auth.atlassian.com/authorize',
  tokenEndpoint: 'https://auth.atlassian.com/oauth/token',
  userinfoEndpoint: 'https://auth.atlassian.com/userinfo',
  revocationEndpoint: 'https://auth.atlassian.com/oauth/revoke',
  issuer: 'https://auth.atlassian.com/authorize',
  oidc: false,
  customQueryParams: {
    audience: 'api.atlassian.com',
    prompt: 'consent',
  },
  showDebugInformation: true,
  requestAccessToken: true,
  useSilentRefresh: true,

};

