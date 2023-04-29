import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { TypingComponent } from './chatroom/typing/typing.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TextInputComponent } from './chatroom/text-input/text-input.component';
import { MessagesComponent } from './chatroom/messages/messages.component';
import { ActiveContactComponent } from './chatroom/active-contact/active-contact.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    NotificationComponent,
    TypingComponent,
    ContactsComponent,
    TextInputComponent,
    MessagesComponent,
    ActiveContactComponent,
    ChatroomComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
