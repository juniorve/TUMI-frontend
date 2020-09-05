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
    console.log(event);
    this.type = event;
  }

/*   getLocation(): void {
    console.log('a');
    if (navigator.geolocation) {
      console.log('b');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('c');
        console.log(position);
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
      });
    } else {
      console.log("No support for geolocation")
    }
  } */
}
