import {SessionModel} from './SessionModel';

export class IssuesModel {
  id: string;
  description: string;
  file: string;
  platformId: string;
  issueDescription: string;
  issueNumber: string;
  isVoting: boolean;
}
