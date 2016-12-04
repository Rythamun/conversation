# @ryth/conversation

@ryth/conversation is an Angular 2 module which has Components and Services that helps to build games / game parts with an visual noval style conversation

## Quick Start

#### 1. Install @ryth/conversation
```bash
  npm install @ryth/conversation --save
```

#### 2. Import the `ConversationModule`:

```ts
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ConversationModule} from '@ryth/conversation';
import {AppComponent} from './app';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ConversationModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

