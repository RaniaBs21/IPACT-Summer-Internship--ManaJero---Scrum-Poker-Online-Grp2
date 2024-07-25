/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {AuthConfig} from 'angular-oauth2-oidc';
import azureDevopsConfig from './azdevops.config';
export const jiraConfig: AuthConfig = {
  clientId: 'ZfPIoROl8gc2nTWtoxZYyD3oXrZUYqFq',
  scope: 'manage:jira-project read:jira-work manage:jira-configuration read:jira-user write:jira-work manage:jira-webhook manage:jira-data-provider read:me read:account offline_access',
  responseType: 'code',
  redirectUri: 'http://localhost:4200/pages/agile/scrum-poker-group2/createGame/room',
  dummyClientSecret: 'ATOAQgOHpQ358FgseRRdD5EFqYm403z8uWAIF6SlqXsjfhi5I1mU2z82tGXDfBNF7nZJ337EE055',
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
