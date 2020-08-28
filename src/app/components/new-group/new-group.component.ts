import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  @ViewChild('inputUpload') file: ElementRef;
  sectores = [
    'Sector económico',
    'Sector social',
    'Sector cultural',
    'Sector político',
    'Sector Ambiental',
    'Sector Agricultura',
    'Sector Manufacturero',
    'Sector Minero',
    'Sector Industrial',
    'Sector Educativo',
    'Sector Investigación y Desarrollo',
    'Sector artes',
    'Sector Gastronómico',
    'Sector periodismo e investigación',
    'Sector Turismo'
  ];
  listInstitucion = [
    {
      value: '1',
      viewValue: 'Movimiento o Grupo social'
    },
    {
      value: '2',
      viewValue: 'Movimiento o grupo político'
    },
    {
      value: '3',
      viewValue: 'Entidad Gubernamental (del Gobierno)'
    },
    {
      value: '4',
      viewValue: 'Asociación sin fines de lucro'
    },
    {
      value: '5',
      viewValue: 'Asociación con fines de lucro'
    }
  ];
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

  constructor(private renderer: Renderer2) {

  }
  ngOnInit(): void {
  }

  selectFile() {
    this.renderer.selectRootElement(this.file.nativeElement).click();
  }

}
