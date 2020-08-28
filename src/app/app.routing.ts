import { NewGroupComponent } from './components/new-group/new-group.component';
import { LanguageTypeComponent } from './components/language-type/language-type.component';
import { QuechuaPersonComponent } from './components/quechua-person/quechua-person.component';
import { NaturalPersonComponent } from './components/natural-person/natural-person.component';
import { PersonTypeFormComponent } from './components/person-type-form/person-type-form.component';
import { MainViewComponent } from './components/main-view/main-view.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'principal', component: MainViewComponent },
  { path: 'tipo-persona', component: PersonTypeFormComponent },
  { path: 'seleccion-persona', component: LanguageTypeComponent },
  { path: 'persona-natural', component: NaturalPersonComponent },
  { path: 'persona-quechua', component: QuechuaPersonComponent },
  { path: 'nuevo-grupo', component: NewGroupComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

