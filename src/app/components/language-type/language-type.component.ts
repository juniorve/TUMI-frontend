import { languages } from './../../core/form.config';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-language-type',
  templateUrl: './language-type.component.html',
  styleUrls: ['./language-type.component.scss']
})
export class LanguageTypeComponent implements OnInit {
  languages = languages;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public utilService: UtilService
    ) {
    this.form = this.fb.group({
      idioma: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  sendValue() {
    if (this.form.controls.idioma.value === '1' || this.form.controls.idioma.value === '3') {
      this.router.navigate(['persona-natural']);
    }
    if (this.form.controls.idioma.value === '2') {
      this.router.navigate(['persona-quechua']);
    }
  }

}
