import {SessionModel} from './SessionModel';

export class IssuesModel {
  id: string;
  issueDescription: string;
  hasVoted: boolean = false;
  isVoting: boolean = false;
  issueNumber: string;
  lastVoteValue?: string;

}
