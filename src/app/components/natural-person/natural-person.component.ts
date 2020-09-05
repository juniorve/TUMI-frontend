import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-natural-person',
  templateUrl: './natural-person.component.html',
  styleUrls: ['./natural-person.component.scss']
})
export class NaturalPersonComponent implements OnInit {
  listOfDepartments = [];
  listOfProvinces = [];
  listOfDistricts = [];
  ageList = [];

  listOfTypes = [
    {
      value: '1',
      viewValue: 'Deber'
    },
    {
      value: '2',
      viewValue: 'Derecho'
    },
    {
      value: '3',
      viewValue: 'Hecho'
    },
    {
      value: '4',
      viewValue: 'Política'
    },
    {
      value: '5',
      viewValue: 'Valor'
    }
  ];
  form: FormGroup;
  constructor(
    private utilService: UtilService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        departamento: [null, Validators.required],
        provincia: [null, Validators.required],
        distrito: [null, Validators.required],
      });
  }
  ngOnInit(): void {
    this.getDepartments();
    this.getAgeList();
  }


  getAgeList() {
    this.utilService.getAgeList().subscribe(response => {
      console.log(response);
      this.ageList = response;
    });
  }

  getDepartments() {
    this.utilService.getDepatments().subscribe(response => {
      console.log(response);
      this.listOfDepartments = response;
    });
  }

  getProvinces() {
    this.utilService.getProvinces(this.form.controls.departamento.value)
      .subscribe(response => {
        console.log(response);
        this.listOfProvinces = response;
      });
  }

  getDistricts() {
    this.utilService.getDistricts(this.form.controls.departamento.value, this.form.controls.provincia.value)
      .subscribe(response => {
        console.log(response);
        this.listOfDistricts = response;
      });
  }

}
