import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';
import { TranslatorService } from './../../services/translator.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-quechua-person',
  templateUrl: './quechua-person.component.html',
  styleUrls: ['./quechua-person.component.scss']
})
export class QuechuaPersonComponent implements OnInit {
  ageList = [];
  listOfDepartments = [];
  listOfProvinces = [];
  listOfDistricts = [];

  form: FormGroup;
  constructor(
    private translatorService: TranslatorService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      grupoEdad: [null, Validators.required],
      sexo: [null, Validators.required],
      idioma: [null, Validators.required],
      departamento: [null, Validators.required],
      provincia: [null, Validators.required],
      distrito: [null, Validators.required],
      latitud: [null], // revisar
      longitud: [null], // revisar
      file_vision: [null, Validators.required],
      file_concepto: [null, Validators.required],
      file_categoria: [null, Validators.required],
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

  show() {
    console.log(this.form.value);
    /*     const blobDataInWavFormat: Blob = new Blob([this.recordRTC.blobUrl], { type: 'audio/wav; codecs=0' });
        const dataUrl = URL.createObjectURL(blobDataInWavFormat);
        console.log(dataUrl);
        console.log(this.recordRTC.blobUrl); */

    /*     const request = {
          file: dataUrl
        };
        this.translatorService.translateLanguage(request).subscribe(response => {
          console.log(response);
        });
     */
    /*   setTimeout(() => {
        this.translatorService.getText()
          .subscribe(value => {
            console.log(value);
          });
      }, 4000); */
  }
}
