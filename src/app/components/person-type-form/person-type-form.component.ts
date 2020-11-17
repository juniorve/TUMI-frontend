import { languages } from './../../core/form.config';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-type-form',
  templateUrl: './person-type-form.component.html',
  styleUrls: ['./person-type-form.component.scss']
})
export class PersonTypeFormComponent implements OnInit {
  form: FormGroup;
  languages = languages;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public utilService: UtilService
  ) {
    this.form = this.fb.group({
      type: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  selectLanguage() {
    this.router.navigate(['/seleccion-persona']);
  }

  newGroup() {
    this.router.navigate(['/nuevo-grupo']);
  }

}
