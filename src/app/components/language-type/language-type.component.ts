import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-language-type',
  templateUrl: './language-type.component.html',
  styleUrls: ['./language-type.component.scss']
})
export class LanguageTypeComponent implements OnInit {
  @Output() next = new EventEmitter<any>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idioma: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  sendValue() {
    console.log(this.form.value);
    this.next.emit(this.form.controls.idioma.value);
  }

}
