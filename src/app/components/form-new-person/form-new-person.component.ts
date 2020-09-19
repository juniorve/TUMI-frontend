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
  indexStepper = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
