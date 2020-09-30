import { AudioService } from './../../services/audio.service';
import { Router } from '@angular/router';
import { RecordAudioComponent } from './../record-audio/record-audio.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';
import { TranslatorService } from './../../services/translator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { messages } from './quechua-person-validatons';
import { showNotificationMini } from 'src/app/services/utilFunction';
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
  categoryList = [];

  constructor(
    private translatorService: TranslatorService,
    private audioService: AudioService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private router: Router,
    private groupService: GroupService
  ) {
    this.newForm();
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getAgeList();
    this.getCategoryList();
    this.getLocation();
    this.messagesValidations = messages;
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
      vision: ['pendiente'],
      concepto: ['pendiente'],
      categoria: [null, Validators.required]
    });
  }

  getCategoryList() {
    this.groupService.getCategoryList().subscribe(response => {
      console.log(response);
      this.categoryList = response;
    });
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
    this.savePerson();
   /*  this.translatorService.translateLanguage(this.audio1.recordRTC.blob).subscribe(audio1 => {
      this.form.controls.vision.setValue(audio1.text_source);
      this.translatorService.translateLanguage(this.audio2.recordRTC.blob).subscribe(audio2 => {
        this.form.controls.concepto.setValue(audio2.text_source);

        console.log('No espera');
      });
    }); */
    // ATUKUNA UAU
    // awajakikuna
    // manam karirqanchI
  }

  savePerson() {
    this.utilService.saveQuechuaPerson(this.form.value).subscribe(response => {
      console.log(response);
      this.audioService.saveAudio(this.audio1.recordRTC.blob, response, 'v').subscribe(() => {
        this.audioService.saveAudio(this.audio2.recordRTC.blob, response, 'c').subscribe(() => {
          showNotificationMini('Persona registrada exitosamente!', 'success');
          this.router.navigate(['/principal']);
        });
      });
    });
  }

}
