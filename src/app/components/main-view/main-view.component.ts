import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showNewPerson() {
    this.router.navigate(['/tipo-persona']);
  }
}
