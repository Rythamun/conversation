export interface IConversationService{
  getMediaUrl(mediaRequestModel: any);
  currentGameState: any;
}

export interface IRuleEngineService{
  executeRuleEngine(rule: any): any;
}
