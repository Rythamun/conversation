// polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { NgModule, Component, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { TextboxModule } from './../src/index';

@Component({
  selector: 'conversation-demo-app',
  templateUrl: './conversation-demo-app.html',
})
export class ConversationDemoComponent {

  constructor() {}

  console(data) {
    console.log(data);
  }
}

@NgModule({
  declarations: [
    ConversationDemoComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    TextboxModule
  ],
  bootstrap: [ConversationDemoComponent],
})
export class ConversationDemoModule {
}
enableProdMode();
platformBrowserDynamic().bootstrapModule(ConversationDemoModule);
