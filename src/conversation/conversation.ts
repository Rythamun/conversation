export class Conversation {

  id: string;
  conversationSteps: Array<ConversationStep>;

  constructor(conversation: any) {
    this.id = conversation.id;
    this.conversationSteps = conversation.conversationSteps;
  }
}

export class ConversationStep {

  id: string;
  backgroundImage: MediaRequestModel;
  speaker: string;
  characterImage: MediaRequestModel;
  profileImage: MediaRequestModel;
  text: string;
  decisions: Array<ConversationDecision>;
  nextStep: string;
  nextStepRule: any;
}

export class ConversationDecision {
  id: string;
  visibleRule: any;
  visible: boolean;
  decisionText: string;
  effectDesc: string;
  effectRule: any;
  nextStep: string;
  nextStepRule: any;
}

export class MediaRequestModel {
  type: string;
  resource: string;
  plugin: string;
  id: string;
}

