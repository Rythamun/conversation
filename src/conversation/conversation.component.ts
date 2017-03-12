import {Component, Input, OnInit, EventEmitter, Output, Inject, Optional, HostListener} from '@angular/core';
import {Conversation, ConversationStep, ConversationDecision, MediaRequestModel} from './conversation';
import {IConversationService, IRuleEngineService} from './conversation-service.interface';
import {tryCatch} from 'rxjs/util/tryCatch';

@Component({
  selector: 'ryth-conversation',
  template: `

  <div *ngIf="conversationStep.decisions">
    <ryth-action-selection
      [decisions]="conversationStep.decisions" 
      (decisionSelected)="onDecisionSelected($event)"
      *ngIf="conversationStep.decisions.length > 0">
    </ryth-action-selection>
  </div>
<div class="cover" (click)="onClick()" >
  <img [src]="backgroundImageUrl" class="cover no-selection" *ngIf="backgroundImageUrl"/>
 
  <img draggable="false" class="event-character no-selection" [src]="characterImageUrl" *ngIf="characterImageUrl"/>
   
  <ryth-textbox
    [speaker]="conversationStep.speaker"
    [profile_img]="profileImageUrl">
        {{conversationStep.text}}
  </ryth-textbox>

</div>`,
  styles: [`

div.cover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
}

img.cover {
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

img.no-selection {
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

@media (min-width: 992px) {
  img.event-character {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 80vh;
    max-height: 80vh;
    width: auto;
    max-width: 90vw;
  }
}

@media screen and (orientation: portrait) {
  img.event-character {
    display: block;
    position: absolute;
    right: 0;
    bottom: 18vh;
    margin: 10px 10px 10px 10px;
    height: auto;
    max-height: 72vh;
    width: auto;
    max-width: 100vw;
  }
}

@media screen and (orientation: landscape) {
  img.event-character {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 80vh;
    max-height: 80vh;
    width: auto;
    max-width: 90vw;
  }
}
`]
})
export class ConversationComponent implements OnInit {

  @Input() conversation: Conversation = null;
  @Output() conversationEnded = new EventEmitter();

  conversationStep: ConversationStep = null;
  conversationService: IConversationService = null;
  ruleEngineService: IRuleEngineService = null;
  characterImageUrl: string = null;
  profileImageUrl: string = null;
  backgroundImageUrl: string = null;

  constructor(@Optional() @Inject('GameStateService') conversationService: IConversationService,
              @Optional() @Inject('RuleEngineService') ruleEngineService: IRuleEngineService) {
    if (conversationService) {
      this.conversationService = conversationService;
    }
    if (ruleEngineService) {
      this.ruleEngineService = ruleEngineService;
    }
  }

  ngOnInit() {

    if (this.conversation) {
      this.conversationStep = this.conversation.conversationSteps[0];
      this.replacePlaceholder();
      this.checkDecisionVisibleRule();
      this.resolveMedia()
    }

  }

  checkDecisionVisibleRule() {
    if (this.conversationService && this.conversationStep) {
      if (this.conversationStep.decisions && this.conversationStep.decisions.length > 0) {
        this.conversationStep.decisions.forEach(
          (decision, index) => {
            if (decision.visibleRule) {

              let resultSet = this.ruleEngineService.executeRuleEngine(decision.visibleRule);
              if (resultSet.result) {
                this.conversationStep.decisions[index].visible = true;
              } else {
                this.conversationStep.decisions[index].visible = false;
              }
            } else {
              this.conversationStep.decisions[index].visible = true;
            }
          });
      }
    }
  }

  replacePlaceholder() {
    if (this.conversationService && this.conversationStep) {
      this.conversationStep.text = this.replacer(this.conversationStep.text, this.conversationService.currentGameState);
      this.conversationStep.speaker = this.replacer(this.conversationStep.speaker, this.conversationService.currentGameState);

      if (this.conversationStep.decisions && this.conversationStep.decisions.length > 0) {
        this.conversationStep.decisions.forEach(
          (decision, index) => {
            this.conversationStep.decisions[index].decisionText = this.replacer(decision.decisionText, this.conversationService.currentGameState);
            this.conversationStep.decisions[index].effectDesc = this.replacer(decision.effectDesc, this.conversationService.currentGameState);
          });
      }
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar') {
      this.onClick();
    }
  }

  onClick() {
    if (!this.conversationStep.decisions) {

      if (this.conversationStep.nextStep) {
        this.getNextStep(this.conversationStep.nextStep);
      } else if (this.conversationStep.nextStepRule) {
        this.getNextStepByRule(this.conversationStep.nextStepRule);
      } else {
        this.isEventFinished();
      }

    }
  }

  getNextStepByRule(rule: any) {
    let resultSet = this.ruleEngineService.executeRuleEngine(rule);
    this.conversationStep = this.conversation.conversationSteps.filter(item => item.id === resultSet.result)[0];
    this.replacePlaceholder();
    this.resolveMedia()
  }

  getNextStep(id: string) {
    this.conversationStep = this.conversation.conversationSteps.filter(item => item.id === id)[0];
    this.replacePlaceholder();
    this.resolveMedia()
  }

  resolveMedia() {
    if (this.conversationStep.characterImage) {
      this.getMediaUrl(this.conversationStep.characterImage).then(
        url => this.characterImageUrl = url
      );
    } else {
      this.characterImageUrl = null;
    }

    if (this.conversationStep.profileImage) {
      this.getMediaUrl(this.conversationStep.profileImage).then(
        url => this.profileImageUrl = url
      );
    } else {
      this.profileImageUrl = null;
    }

    if (this.conversationStep.backgroundImage) {
      this.getMediaUrl(this.conversationStep.backgroundImage).then(
        url => this.backgroundImageUrl = url
      );
    } else {
      this.backgroundImageUrl = null;
    }
  }

  onDecisionSelected(decision: ConversationDecision) {
    // Execute conditionRule after selection
    if (decision.effectRule) {
      this.ruleEngineService.executeRuleEngine(decision.effectRule);
    }

    // next Step or finish Event
    if (decision.nextStep) {
      this.getNextStep(decision.nextStep);
    } else if (decision.nextStepRule) {
      this.getNextStepByRule(decision.nextStepRule);
    } else {
      this.isEventFinished();
    }
  }

  private isEventFinished() {
    if (!this.conversationStep.nextStep && !this.conversationStep.nextStepRule && !this.conversationStep.decisions) {
      this.conversationEnded.emit();
    }
  }

  private getMediaUrl(mediaRequest: MediaRequestModel): Promise<string> {
    if (mediaRequest) {
      if (this.conversationService) {
        return new Promise((resolve, reject) => {
          let response = this.conversationService.getMediaUrl(mediaRequest);

          if (response) {
            resolve(response);
          } else {
            reject(null)
          }
        });
      } else {
        return new Promise((resolve, reject) => {
          if (mediaRequest.resource) {
            resolve(mediaRequest.resource);
          } else {
            reject(null);
          }

        });
      }
    } else {
      return null;
    }
  }

  private replacer(template, obj) {
    try {
      let keys = Object.keys(obj);
      let func = Function(...keys, 'return `' + template + '`;');

      return func(...keys.map(k => obj[k]));
    }
    catch (e) {
      console.log(e);
      return template;
    }
  }

}
