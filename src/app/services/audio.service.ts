import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    headers: HttpHeaders = new HttpHeaders();
    constructor(private http: HttpClient) {

    }

    saveAudio(file: any): any {
        const now = new Date();
        const nameFile = (now.getFullYear() + (now.getMonth() + 1) + now.getDate()
            + now.getSeconds() + now.getMilliseconds() + '.wav').toString();
        console.log(nameFile);
        // return new Promise((resolve, reject) => {
        const formdata = new FormData();
        formdata.append('file', file, nameFile);

        /*     const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', 'http://localhost:8181/vgrupo/descargar', true);
            xhr.send(formdata);
        }); */
        return this.http.post('http://localhost:8181/vgrupo/descargar', formdata, { headers: this.headers });

    }
}
