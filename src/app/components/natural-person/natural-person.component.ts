import { DialogSaveComponent } from './../dialog-save/dialog-save.component';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
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

  categoryList = [];
  form: FormGroup;

  messagesValidations;
  constructor(
    private dialog: MatDialog,
    private utilService: UtilService,
    private router: Router,
    private groupService: GroupService,
    private fb: FormBuilder) {
    this.newForm();
  }
  ngOnInit(): void {
    this.messagesValidations = messages;
    this.showLocation();
    this.getDepartments();
    this.getAgeList();
    this.getCategoryList();
  }

  showLocation() {
    this.utilService.getLocation().subscribe(response => {
      console.log(response);
      if (response) {
        this.form.controls.latitud.setValue(response.latitude);
        this.form.controls.longitud.setValue(response.longitude);
      }
    });
  }


  newForm() {
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
      categoria: [''],
      lugarproc: ['']
    });
  }

  getCategoryList() {
    this.utilService.getCategoryList().subscribe(response => {
      console.log(response);
      this.categoryList = response;
    });
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.form.controls.latitud.setValue(position.coords.longitude);
        this.form.controls.longitud.setValue(position.coords.latitude);
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  savePerson() {
    this.dialog.open(DialogSaveComponent).afterClosed().subscribe(save => {
      console.log(save);
      if (save) {
        this.utilService.saveQuechuaPerson(this.form.value).subscribe(response => {
          console.log(response);
          showNotificationMini('Persona registrada exitosamente!', 'success');
          this.router.navigate(['/principal']);
        });
      }
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
        this.listOfProvinces = response;
        this.form.controls.provincia.setValue(null);
        this.form.controls.distrito.setValue(null);
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
