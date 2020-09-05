import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'audio/wav'
    });
    constructor(private http: HttpClient) {

    }

    translateLanguage(file: any): any {

        return new Promise((resolve, reject) => {
            const formdata = new FormData();
            formdata.append('files', file, 'xyz.wav');

            const xhr = new XMLHttpRequest();

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
        });
    }
}
