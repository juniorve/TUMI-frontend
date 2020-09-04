import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-type-form',
  templateUrl: './person-type-form.component.html',
  styleUrls: ['./person-type-form.component.scss']
})
export class PersonTypeFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      type: []
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
