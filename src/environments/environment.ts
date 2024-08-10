import { AuthConfig } from 'angular-oauth2-oidc';
import { v4 as uuidv4 } from 'uuid';
import azureDevopsConfig from './azdevops.config';

export function authConfig(): AuthConfig {
  const dynamicSessionId = uuidv4();
  localStorage.setItem('sessionId', dynamicSessionId);

  const staticRedirectUri = `http://localhost:4200/pages/agile/scrum-poker-group2/session/room`;

  return {
    clientId: 'ZfPIoROl8gc2nTWtoxZYyD3oXrZUYqFq',
    scope: 'manage:jira-project read:jira-work manage:jira-configuration read:jira-user write:jira-work manage:jira-webhook manage:jira-data-provider read:me read:account offline_access',
    responseType: 'code',
    redirectUri: staticRedirectUri,
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
}

export const environment = {
  production: false,
  azureConfig: azureDevopsConfig,
  jiraConfig: authConfig(),
};
