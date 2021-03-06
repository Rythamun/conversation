// polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { NgModule, Component, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ConversationModule } from './../src/index';
import {GameStateService} from './MockGameState.service';

@Component({
  selector: 'conversation-demo-app',
  templateUrl: './conversation-demo-app.html',
})
export class ConversationDemoComponent {

  exampleType = null;
  demoOutput = 'Revolver Ocelot (Revolver Ocelot)';
  demoProfile = 'http://i.imgur.com/DtMY6O4.jpg';
  demoName = 'Revolver Ocelot';

  conversation1:any = {
    'id': 'test',
    'conversationSteps': [
      {
        'id': '1',
        'characterImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/Cso7Heh.png' },
        'speaker': 'Revolver Ocelot',
        'profileImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/DtMY6O4.jpg' },
        'text': 'This is a test - fix',
        'nextStep': '1a'
      },
      {
        'id': '1a',
        'characterImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/Cso7Heh.png' },
        'speaker': '${playerName}',
        'profileImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/DtMY6O4.jpg' },
        'text': 'This is a ${playerName} - dynamic',
        'nextStep': '2'
      },
      {
        'id': '2',
        'backgroundImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/nZ1nyhf.jpg' },
        'characterImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/Cso7Heh.png' },
        'speaker': 'Revolver Ocelot',
        'profileImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/DtMY6O4.jpg' },
        'text': 'Yo - test ok',
        'decisions': [
          {
            'id': '1',
            'decisionText': 'DoSomething ${playerName}',
            'effectDesc': 'Back to step 1',
            'nextStep': '1'
          },
          {
            'id': '2',
            'decisionText': 'DoSomething',
            'effectDesc': 'Go to step 3 ${playerName}',
            'nextStep': '3'
          }
        ],
        'nextStep': null
      },
      {
        'id': '3',
        'backgroundImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/nZ1nyhf.jpg' },
        'characterImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/Cso7Heh.png' },
        'speaker': 'Revolver Ocelot',
        'profileImage': { 'type': 'Url', 'resource': 'http://i.imgur.com/DtMY6O4.jpg' },
        'text': 'The End',
        'nextStep': null
      }
    ]
  };

  constructor() {}

  onConversationEnded() {
    this.exampleType = null;
  }

  console(data) {
    console.log(data);
  }
}

@NgModule({
  declarations: [
    ConversationDemoComponent
  ],
  providers: [GameStateService, { provide: 'GameStateService', useExisting: GameStateService }],
  imports: [
    BrowserModule,
    ConversationModule.forRoot()
  ],
  bootstrap: [ConversationDemoComponent],
})
export class ConversationDemoModule {
}
enableProdMode();
platformBrowserDynamic().bootstrapModule(ConversationDemoModule);
