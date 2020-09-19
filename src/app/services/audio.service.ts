import { environment } from './../../environments/environment';
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
        const formdata = new FormData();
        formdata.append('file', file, nameFile);
        return this.http.post(`${environment.url}/vgrupo/descargar`, formdata, { headers: this.headers });

    }
}
