import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from './../../services/group.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { showNotificationMini } from 'src/app/services/utilFunction';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  @ViewChild('inputUpload') file: ElementRef;
  sectors = [];
  listGroupType = [];
  categoryList = [];
  form: FormGroup;
  longitude;
  latitude;
  constructor(
    private renderer: Renderer2,
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombInstitucion: 'Universidad Nacional Mayor de San Marcos',
      tipoInstitucion: [null, Validators.required],
      sectorEconomico: [null, Validators.required],
      categoria: [null, Validators.required],
      latitud: [null],
      longitud: [null],
      vision: [null, Validators.required],
      concepto: [null, Validators.required],
      adjunto: ['']
    });
  }
  ngOnInit(): void {
    this.getSectors();
    this.getGroupType();
    this.getCategoryList();
    this.getLocation();
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
    this.form.controls.latitud.setValue(this.latitude);
    this.form.controls.longitud.setValue(this.longitude);
    this.groupService.saveGroup(this.form.value)
      .subscribe(response => {
        console.log(response);
        if (response) {
          showNotificationMini('Grupo registrado exitosamente!', 'success');
          this.router.navigate(['/principal']);
        }
      });
  }

}
