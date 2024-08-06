export interface  IssuesRequest {
  description: string;
  platformId: string;
  issueKey?: string;
  name?: string;
  lastVoteValue?: string;
  issueNumber: string;
  hasVoted: boolean ;
  isVoting: boolean ;
}
