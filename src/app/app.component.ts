import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tumi-frontend';
  type;
  constructor() {
    // this.getLocation();
  }

  next(event) {
    this.type = event;
  }
}
