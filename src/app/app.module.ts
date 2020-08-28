import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MainViewComponent } from './components/main-view/main-view.component';
import { PersonTypeFormComponent } from './components/person-type-form/person-type-form.component';
import { routing, appRoutingProviders } from './app.routing';
import { TranslatorService } from './services/translator.service';
import { NewGroupComponent } from './components/new-group/new-group.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguageTypeComponent,
    NaturalPersonComponent,
    HeaderComponent,
    QuechuaPersonComponent,
    RecordAudioComponent,
    MainViewComponent,
    PersonTypeFormComponent,
    NewGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders, TranslatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
