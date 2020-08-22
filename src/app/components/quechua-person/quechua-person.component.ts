import { Component, OnInit } from '@angular/core';
import { RecordRTCService } from 'src/app/services/record-rtc.service';
@Component({
  selector: 'app-quechua-person',
  templateUrl: './quechua-person.component.html',
  styleUrls: ['./quechua-person.component.scss'],
  providers: [RecordRTCService]
})
export class QuechuaPersonComponent implements OnInit {
  listAge = [
    {
      value: '1',
      viewValue: '26 a 35 años de edad'
    },
    {
      value: '2',
      viewValue: '36 a 45 años de edad'
    },
    {
      value: '3',
      viewValue: '46 a 55 años de edad'
    },
    {
      value: '4',
      viewValue: '56 a 65 años de edad'
    },
    {
      value: '5',
      viewValue: '66 a más años de edad'
    }
  ];

  listDepartments = [
    {
      value: '1',
      viewValue: 'Lima'
    },
    {
      value: '2',
      viewValue: 'Piura'
    }
  ];

  listProvincias = [
    {
      value: '1',
      viewValue: 'Huarmey'
    },
    {
      value: '2',
      viewValue: 'Talara'
    }
  ];

  listDistritos = [
    {
      value: '1',
      viewValue: 'Puente Piedra'
    },
    {
      value: '2',
      viewValue: 'San Borja'
    }
  ];

  constructor() {

  }

  ngOnInit(): void {
  }

}
