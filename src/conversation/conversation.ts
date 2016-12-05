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
  backgroundImgUrl: string;
  characterImgUrl: string;
  speaker: string;
  speakerProfilImgUrl: string;
  text: string;
  decisions: Array<ConversationDecision>;
  nextStep: string;
}

export class ConversationDecision {
  id: string;
  decisionText: string;
  effectDesc: string;
  nextStep: string;
}
