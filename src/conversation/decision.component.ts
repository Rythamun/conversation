import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConversationDecision} from './conversation';

@Component({
  selector: 'ryth-action-selection',
  template: `
<div class="content">

  <div class="action-selection">
    <p class="mb-0">Actions:</p>

    <div class="row">
      <div class="col-xs-12">
        <ul class="list-group event-action-group">
          <div class="list-group-item event-list-group-item clearfix" (click)="onDecisionClicked(decision)" *ngFor="let decision of decisions">
            <div class="pull-left">
              <p class="list-group-item-heading action-header">{{decision.decisionText}}</p>
              <p class="list-group-item-text text-muted action-effect-desc" *ngIf="decision.effectDesc">{{decision.effectDesc}}</p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>

</div>
`,
  styles: [`
div.action-selection {
  font-size: 2vmax;
  padding: 5px 5px 5px 5px;
  color: white;
  overflow: auto;
  border-radius: 10px;
  border: 3px solid #263238;
  background-color: rgba(38, 50, 56, 0.8);
}

.event-action-group {
  color: white;
  font-size: 1.5vmax;
}

div.event-list-group-item {
  overflow: auto;
  border-radius: 10px;
  border: 3px solid white;
  background-color: rgba(38, 50, 56, 0);
  padding: 1vmin;
}
div.event-list-group-item:hover {
  background-color: rgba(38, 50, 56, 1);
}

p.action-header {
  font-size: 1.5vmax;
  margin:0;
}
p.action-effect-desc {
  font-size: 1vmax;
  margin:0;
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
