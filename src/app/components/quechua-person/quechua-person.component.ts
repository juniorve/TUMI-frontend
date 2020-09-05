import { RecordAudioComponent } from './../record-audio/record-audio.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';
import { TranslatorService } from './../../services/translator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-quechua-person',
  templateUrl: './quechua-person.component.html',
  styleUrls: ['./quechua-person.component.scss']
})
export class QuechuaPersonComponent implements OnInit {
  @ViewChild('audio1') audio1: RecordAudioComponent;
  @ViewChild('audio2') audio2: RecordAudioComponent;
  @ViewChild('audio3') audio3: RecordAudioComponent;
  ageList = [];
  listOfDepartments = [];
  listOfProvinces = [];
  listOfDistricts = [];

  form: FormGroup;
  longitude;
  latitude;
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
      vision: [null],
      concepto: [null],
      categoria: [null],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getAgeList();
    this.getLocation();
  }

  getLocation(): void {
    console.log('a');
    if (navigator.geolocation) {
      console.log('b');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('c');
        console.log(position);
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    } else {
      console.log("No support for geolocation")
    }
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
    console.log(this.form.value,
      this.audio1.recordRTC.blob,
      this.audio2.recordRTC.blob,
      this.audio3.recordRTC.blob
    );
    this.saveAudios();
  }

  saveAudios() {
    this.translatorService.translateLanguage(this.audio1.recordRTC.blob).then(audio1 => {
      this.form.controls.vision.setValue(JSON.parse(audio1).text_source);

      this.translatorService.translateLanguage(this.audio1.recordRTC.blob).then(audio2 => {
        this.form.controls.concepto.setValue(JSON.parse(audio2).text_source);

        this.translatorService.translateLanguage(this.audio1.recordRTC.blob).then(audio3 => {
          this.form.controls.categoria.setValue(JSON.parse(audio3).text_source);
          this.form.controls.latitud.setValue(this.latitude);
          this.form.controls.longitud.setValue(this.longitude);
          this.utilService.saveQuechuaPerson(this.form.value).subscribe(response=>{
            console.log(response);
          });
        });
      });
    });

    // ATUKUNA UAU
  /*   this.form.controls.latitud.setValue(this.latitude);
    this.form.controls.longitud.setValue(this.longitude);
    this.utilService.saveQuechuaPerson(this.form.value).subscribe(response=>{
      console.log(response);
    }); */
  }
}
