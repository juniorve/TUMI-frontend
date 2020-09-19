import { concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from './../../services/group.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { showNotificationMini } from 'src/app/services/utilFunction';
import { messages } from './new-group-validatons';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  @ViewChild('inputUpload') file: ElementRef;
  fileUpload;
  sectors = [];
  listGroupType = [];
  categoryList = [];
  form: FormGroup;
  longitude;
  latitude;
  messagesValidations;
  constructor(
    private renderer: Renderer2,
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router
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
    this.getSectors();
    this.getGroupType();
    this.getCategoryList();
    this.getLocation();
  }

  fileChange(event) {
    console.log(event);
    if ((event.target.files[0].size / (1024 * 1024)) <= 1) {
      const extension = event.target.files[0].name.split('.')[event.target.files[0].name.split('.').length - 1];
      const extensionesPermitidas = ['pdf', 'PDF', 'doc', 'docx'];
      if (extensionesPermitidas.includes(extension)) {
        this.fileUpload = event.target.files[0];

      } else {
        showNotificationMini('Solo estan permitido archivos PDF o Word', 'error');
      }
    } else {
      showNotificationMini('El archivo excede el tamaño de 1MB', 'error');
    }
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

  selectFile() {
    this.renderer.selectRootElement(this.file.nativeElement).click();
  }

  getSectors() {
    this.groupService.getSectors().subscribe(response => {
      console.log(response);
      this.sectors = response;
    });
  }

  getGroupType() {
    this.groupService.getGroupType().subscribe(response => {
      console.log(response);
      this.listGroupType = response;
    });
  }

  getCategoryList() {
    this.groupService.getCategoryList().subscribe(response => {
      console.log(response);
      this.categoryList = response;
    });
  }

  saveGroup() {
    const requestFile: any = {
      file: this.fileUpload
    };
    this.form.controls.latitud.setValue(this.latitude);
    this.form.controls.longitud.setValue(this.longitude);
    this.groupService.saveGroup(this.form.value)
      .subscribe(group => {
        console.log(group);
        requestFile.code = group;
        if (this.fileUpload) {
          this.groupService.saveFile(requestFile).subscribe(response => {
            console.log(response);
            this.finish();
          });
        } else {
          this.finish();
        }
      });
  }

  finish() {
    showNotificationMini('Grupo registrado exitosamente!', 'success');
    this.router.navigate(['/principal']);
  }

}
