export interface VoteModel {
  id?: string;
  sessionId: string;
  issueId: string;
  userId: string;
  vote: string;
}
