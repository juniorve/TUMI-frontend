import { languagesList, languages } from './../../core/form.config';
import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages = languages;
  languagesList = languagesList;
  idioma: FormControl = new FormControl();
  constructor(public utilService: UtilService) {
    this.idioma.setValue('esp');
  }

  ngOnInit(): void {
  }

  changeLanguage(){
    this.utilService.typeOfLanguage = this.idioma.value;
    this.utilService.emitEvent(true);
  }
}
