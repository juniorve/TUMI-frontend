import { UtilService } from './../../services/util.service';
import { DialogLocationComponent } from './../dialog-location/dialog-location.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from './../../services/group.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { showNotificationMini } from 'src/app/services/utilFunction';
import { messages } from './new-group-validatons';
import { MatDialog } from '@angular/material/dialog';
import { DialogSaveComponent } from '../dialog-save/dialog-save.component';
import { languages } from 'src/app/core/form.config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit, OnDestroy {
  @ViewChild('inputUpload') file: ElementRef;
  languages = languages;
  fileUpload;
  fileBase64;
  sectors = [];
  listGroupType = [];
  categoryList = [];
  form: FormGroup;
  longitude;
  latitude;
  messagesValidations;
  fileName;
  extension;
  private countdownEndRef: Subscription = null;
  constructor(
    private renderer: Renderer2,
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public utilService: UtilService
  ) {
    this.form = this.fb.group({
      nombInstitucion: [''],
      tipoInstitucion: [null, Validators.required],
      sectorEconomico: [null, Validators.required],
      categoria: [null, Validators.required],
      latitud: [null],
      longitud: [null],
      vision: [null, Validators.required],
      concepto: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.messagesValidations = messages;
    this.countdownEndRef = this.utilService.language$.subscribe(value => {
      if (value) {
        this.getOptions();
      }
    });
    this.getOptions();
    this.showLocation();
  }

  ngOnDestroy() {
    this.countdownEndRef.unsubscribe();
  }

  getOptions() {
    this.getSectors();
    this.getGroupType();
    this.getCategoryList();
  }
  showLocation() {
    this.utilService.getLocation().subscribe(response => {
      if (response) {
        this.form.controls.latitud.setValue(response.latitude);
        this.form.controls.longitud.setValue(response.longitude);
      }
    });
  }

  getLocation(): void {
    this.dialog.open(DialogLocationComponent);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.form.controls.latitud.setValue(position.coords.longitude);
        this.form.controls.longitud.setValue(position.coords.latitude);
      },
        error => {
          this.showError(error);
        });
    }
  }

  showError(error) {
    this.utilService.getLocation().subscribe(response => {
      // console.log(response);
    });
    switch (error.code) {
      case error.PERMISSION_DENIED:
        break;
      case error.POSITION_UNAVAILABLE:
        break;
      case error.TIMEOUT:
        break;
      case error.UNKNOWN_ERROR:
        break;
    }
  }

  selectFile() {
    this.renderer.selectRootElement(this.file.nativeElement).click();
  }

  getSectors() {
    this.groupService.getSectors().subscribe(response => {
      this.sectors = response;
    });
  }

  getGroupType() {
    this.groupService.getGroupType().subscribe(response => {
      this.listGroupType = response;
    });
  }

  getCategoryList() {
    this.utilService.getCategoryList().subscribe(response => {
      this.categoryList = response;
    });
  }

  saveGroup() {
    this.dialog.open(DialogSaveComponent).afterClosed().subscribe(save => {
      if (save) {
        const requestFile: any = {
          file: this.fileUpload
        };
        this.groupService.saveGroup(this.form.value)
          .subscribe(group => {
            requestFile.code = group;
            if (this.fileUpload) {
              this.groupService.saveFile(requestFile).subscribe(response => {
                this.finish();
              });
            } else {
              this.finish();
            }
          });
      }
    });
  }

  finish() {
    showNotificationMini('Grupo registrado exitosamente!', 'success');
    this.router.navigate(['/principal']);
  }

  fileChange(event) {
    this.extension = null;
    if ((event.target.files[0].size / (1024 * 1024)) <= 1) {
      this.extension = event.target.files[0].name.split('.')[event.target.files[0].name.split('.').length - 1];
      const extensionesPermitidas = ['pdf', 'PDF', 'doc', 'docx'];
      if (extensionesPermitidas.includes(this.extension)) {
        this.fileUpload = event.target.files[0];
        this.fileName = event.target.files[0].name;

        this.getBase64(event.target.files[0]).then(
          (val: any) => {
            if (val) {
              this.fileBase64 = val.split(',')[1];
            }
          }
        );
      } else {
        showNotificationMini('Solo estan permitido archivos PDF o Word', 'error');
      }
    } else {
      showNotificationMini('El archivo excede el tamaño de 1MB', 'error');
    }
  }


  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  showDocument() {
    if (!this.fileBase64 || !this.extension) {
      return;
    }

    if (this.extension === 'doc' || this.extension === 'docx') {
      window.location.href = 'data:application/msword;base64,' + this.fileBase64;
    } else {
      const binary = atob(this.fileBase64);
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new Uint8Array(buffer);
      for (let j = 0; j < len; j++) {
        view[j] = binary.charCodeAt(j);
      }
      const blob = new Blob([view], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);
      iframe.contentWindow.print();
    }
  }
}
