import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextboxComponent} from './textbox.component';
import {ConversationComponent} from './conversation.component';
import {Conversation, ConversationStep} from './conversation';
import {DecisionComponent} from './decision.component';
import {IConversationService} from './conversation-service.interface';

export {
  TextboxComponent,
  DecisionComponent,
  ConversationComponent,
  Conversation,
  ConversationStep,
  IConversationService
};

@NgModule({
  declarations: [ConversationComponent, TextboxComponent, DecisionComponent],
  // entryComponents: [],
  exports: [ConversationComponent, TextboxComponent, DecisionComponent],
  imports: [
    CommonModule
  ],
})
export class ConversationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConversationModule,
      providers: []
    };
  }
}
