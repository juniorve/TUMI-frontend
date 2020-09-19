import { AudioService } from './../../services/audio.service';
import { Router } from '@angular/router';
import { RecordAudioComponent } from './../record-audio/record-audio.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';
import { TranslatorService } from './../../services/translator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { messages } from './quechua-person-validatons';
import { showNotificationMini } from 'src/app/services/utilFunction';
import { concatMap } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';
@Component({
  selector: 'app-quechua-person',
  templateUrl: './quechua-person.component.html',
  styleUrls: ['./quechua-person.component.scss']
})
export class QuechuaPersonComponent implements OnInit {
  @ViewChild('audio1') audio1: RecordAudioComponent;
  @ViewChild('audio2') audio2: RecordAudioComponent;
  ageList = [];
  listOfDepartments = [];
  listOfProvinces = [];
  listOfDistricts = [];
  messagesValidations: any = {};

  form: FormGroup;
  longitude;
  latitude;
  categoryList = [];

  constructor(
    private translatorService: TranslatorService,
    private audioService: AudioService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private router: Router,
    private groupService: GroupService
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
      categoria: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getAgeList();
    this.getCategoryList();
    this.getLocation();
    this.messagesValidations = messages;
  }

  getCategoryList() {
    this.groupService.getCategoryList().subscribe(response => {
      console.log(response);
      this.categoryList = response;
    });
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

  save() {

    this.translatorService.translateLanguage(this.audio1.recordRTC.blob).subscribe(audio1 => {
      this.form.controls.vision.setValue(audio1.text_source);

      this.translatorService.translateLanguage(this.audio2.recordRTC.blob).subscribe(audio2 => {
        this.form.controls.concepto.setValue(audio2.text_source);
        this.form.controls.latitud.setValue(this.latitude);
        this.form.controls.longitud.setValue(this.longitude);

        this.audioService.saveAudio(this.audio1.recordRTC.blob).subscribe(() => {
          this.audioService.saveAudio(this.audio2.recordRTC.blob).subscribe(() => {
            console.log('guarda');
            this.savePerson();
          });
        });
        console.log('No espera');
      });
    });
    // ATUKUNA UAU
    // awajakikuna
    // manam karirqanchI
  }

  savePerson() {
    this.utilService.saveQuechuaPerson(this.form.value).subscribe(response => {
      console.log(response);
      showNotificationMini('Persona registrada exitosamente!', 'success');
      this.router.navigate(['/principal']);
    });
  }

}
