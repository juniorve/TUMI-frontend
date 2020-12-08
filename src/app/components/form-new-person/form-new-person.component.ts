import { PersonTypeFormComponent } from './../person-type-form/person-type-form.component';
import { LanguageTypeComponent } from './../language-type/language-type.component';
import { languages, typeForm } from './../../core/form.config';
import { UtilService } from 'src/app/services/util.service';
import { QuechuaPersonComponent } from './../quechua-person/quechua-person.component';
import { NaturalPersonComponent } from './../natural-person/natural-person.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-new-person',
  templateUrl: './form-new-person.component.html',
  styleUrls: ['./form-new-person.component.scss']
})
export class FormNewPersonComponent implements OnInit {
  @ViewChild(NaturalPersonComponent) natural: NaturalPersonComponent;
  @ViewChild(QuechuaPersonComponent) quechua: QuechuaPersonComponent;
  @ViewChild(LanguageTypeComponent) childLanguageTypeComponent: LanguageTypeComponent;
  @ViewChild(PersonTypeFormComponent) childPersonTypeFormComponent: PersonTypeFormComponent;
  indexStepper = 0;
  languages = languages;
  form = typeForm;
  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
  }

  changeLanguage() {
    if ((this.childLanguageTypeComponent && (this.childLanguageTypeComponent.form.controls.idioma.value === '1'
      || this.childLanguageTypeComponent.form.controls.idioma.value === '4'))
      || (this.childPersonTypeFormComponent
        && this.childPersonTypeFormComponent.form.controls.type.value === '2')) {
      this.utilService.assignTypeForm(this.form.spanish);
    } else {
      this.utilService.assignTypeForm(null);
    }
  }

  cleanLanguage() {
    if ((this.indexStepper === 2 && this.childLanguageTypeComponent)
      || (this.indexStepper === 1 && this.childPersonTypeFormComponent &&
        this.childPersonTypeFormComponent.form.controls.type.value === '2')) {
      this.changeLanguage();
    } else {
      this.utilService.assignTypeForm(null);
    }
  }

}
