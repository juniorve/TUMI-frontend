import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
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
import { FormNewPersonComponent } from './components/form-new-person/form-new-person.component';
import { UtilService } from './services/util.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { DialogLocationComponent } from './components/dialog-location/dialog-location.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

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
    FormNewPersonComponent,
    DialogLocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    appRoutingProviders,
    TranslatorService,
    UtilService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
