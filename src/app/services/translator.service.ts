import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    headers: HttpHeaders = new HttpHeaders();
    constructor(private http: HttpClient) {

    }

    translateLanguage(file: any): Observable<any> {
        const now = new Date();
        const nameFile = (now.getFullYear() + (now.getMonth() + 1) + now.getDate()
            + now.getSeconds() + now.getMilliseconds() + '.wav').toString();
        console.log(nameFile);
        // return new Promise((resolve, reject) => {
        const formdata = new FormData();
        formdata.append('files', file, nameFile);

        /*       const xhr = new XMLHttpRequest();
              xhr.onreadystatechange = () => {
                  if (xhr.readyState === 4) {
                      if (xhr.status === 200) {
                          resolve(xhr.response);
                      } else {
                          reject(xhr.response);
                      }
                  }
              };
              xhr.open('POST', 'http://18.218.29.107:5000/upload', true);
              xhr.send(formdata);
          }); */
        return this.http.post('http://18.218.29.107:5000/upload', formdata, { headers: this.headers });
    }
}
