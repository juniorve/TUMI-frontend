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
        const formdata = new FormData();
        formdata.append('files', file, nameFile);
        return this.http.post(`http://18.218.29.107:5000/upload`, formdata, { headers: this.headers });
    }
}
