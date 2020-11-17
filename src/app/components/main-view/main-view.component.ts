import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { languages } from 'src/app/core/form.config';
declare var $: any;
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  languages = languages;
  constructor(
    private router: Router,
    public utilService: UtilService
  ) { }

  ngOnInit(): void {
  }

  showNewPerson() {
    this.router.navigate(['/registro-persona']);
  }
}
