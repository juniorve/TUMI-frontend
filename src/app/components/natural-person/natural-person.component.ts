import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { showNotificationMini } from 'src/app/services/utilFunction';
import { messages } from './natural-person-validatons';

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
  longitude;
  latitude;
  messagesValidations;
  constructor(
    private utilService: UtilService,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      grupoEdad: [null, Validators.required],
      sexo: [null, Validators.required],
      idioma: [null, Validators.required],
      departamento: [null, Validators.required],
      provincia: [null, Validators.required],
      distrito: [null, Validators.required],
      latitud: [null], // revisar
      longitud: [null], // revisar
      vision: [null, Validators.required],
      concepto: [null, Validators.required],
      categoria: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.messagesValidations = messages;
    this.getLocation();
    this.getDepartments();
    this.getAgeList();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  savePerson() {
    console.log(this.latitude);
    this.form.controls.latitud.setValue(this.latitude);
    this.form.controls.longitud.setValue(this.longitude);
    this.utilService.saveQuechuaPerson(this.form.value).subscribe(response => {
      console.log(response);
      showNotificationMini('Persona registrada exitosamente!', 'success');
      this.router.navigate(['/principal']);
    });
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
