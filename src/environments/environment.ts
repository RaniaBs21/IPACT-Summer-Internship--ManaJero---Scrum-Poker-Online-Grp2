/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {AuthConfig} from 'angular-oauth2-oidc';
import azureDevopsConfig from './azdevops.config';
export const jiraConfig: AuthConfig = {
  clientId: 'guhytL7qi0X6IYqVbeMVlTxSpdP6dl9V',
  scope: 'manage:jira-project read:jira-work manage:jira-configuration read:jira-user write:jira-work manage:jira-webhook manage:jira-data-provider read:me read:account offline_access',
  responseType: 'code',
  redirectUri: `http://localhost:4200/pages/agile/scrum-poker-group2/session/room/66a17df98dc9cb3e0164e89b`,
  dummyClientSecret: 'ATOAoY-FDgDreo7Z8Tvy9cjr57I3s-xBXnQ-FnvDxnpcLdli8-TQR6WKF0rSwUd9NgY8DF70EFE4',
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
export const environment = {
  production: false,
  azureConfig: azureDevopsConfig,
  jiraConfig: jiraConfig,
};
