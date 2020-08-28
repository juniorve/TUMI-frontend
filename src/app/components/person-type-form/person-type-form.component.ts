import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-type-form',
  templateUrl: './person-type-form.component.html',
  styleUrls: ['./person-type-form.component.scss']
})
export class PersonTypeFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectLanguage() {
    this.router.navigate(['/seleccion-persona']);
  }

}
