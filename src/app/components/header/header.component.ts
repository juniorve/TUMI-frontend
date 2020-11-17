import { languages } from './../../core/form.config';
import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages = languages;
  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
  }

}
