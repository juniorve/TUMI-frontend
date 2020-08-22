import { MaterialModule } from './shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTypeComponent } from './components/language-type/language-type.component';
import { NaturalPersonComponent } from './components/natural-person/natural-person.component';
import { HeaderComponent } from './components/header/header.component';
import { QuechuaPersonComponent } from './components/quechua-person/quechua-person.component';
import { RecordAudioComponent } from './components/record-audio/record-audio.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguageTypeComponent,
    NaturalPersonComponent,
    HeaderComponent,
    QuechuaPersonComponent,
    RecordAudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
