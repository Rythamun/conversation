import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConversationDecision} from './conversation';

@Component({
  selector: 'ryth-action-selection',
  template: `
<div class="decision-group">
  <div class="decision-item clearfix" (click)="onDecisionClicked(decision)" *ngFor="let decision of decisions">
    {{decision.decisionText}}<span *ngIf="decision.effectDesc && decision.effectDesc !== 'undefined'"> ({{decision.effectDesc}})</span>
  </div>
</div>
`,
  styles: [`
@media (min-width: 992px) {
  .decision-group {
    overflow: auto;
    margin: 10vh auto;
    width: 50vw;
  }
}
@media (max-width: 991px) {
  .decision-group {
    overflow: auto;
    margin: 20px auto;
    width: 90vw;
  }
}

.decision-item {
  overflow: auto;
  border-radius: 10px;
  border: 2px solid white;
  background-color: rgba(38, 50, 56, 0.8);
  margin-bottom: 5px;
  padding: 8px;
  color: white;
  text-align: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

div.decision-item:hover {
  background-color: rgba(38, 50, 56, 1);
}
`]
})
export class DecisionComponent implements OnInit {

  @Input() decisions: Array<ConversationDecision> = null;
  @Output() decisionSelected = new EventEmitter<ConversationDecision>();

  constructor() {
  }

  ngOnInit() {
  }

  onDecisionClicked(decision: ConversationDecision) {
    this.decisionSelected.emit(decision);
  }

}
