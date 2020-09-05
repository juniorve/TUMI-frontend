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

    translateLanguage(request: any): any {

        console.log(request);


        return new Promise((resolve, reject) => {
            const formdata = new FormData();
            formdata.append('files', request.file, '/C:/Users/Jofré Valenzuela/Downloads/punoondaazul2017Nov23A_16-117 (1).wav');

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
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

    getText(): Observable<any> {
        return of({
            text_source: 'ntitawajrikikuna karicun nt atukuna wau laqtkunapi mri qanahu manam karirqanchi riki kaqatarikukuna aan famarc uraphisa uacallia qapunin kay iunkai mayta wakpir pkuay iaaaqmi awajakikuna kasunchk kaunger alin pullykachkun pana llta\n',
            upload_at: '22-02-18',
            text_target: 'ntitawajrikikuna karicun nt atukuna wau laqtkunapi mri qanahu manam karirqanchi riki kaqatarikukuna aan famarc uraphisa uacallia qapunin kay iunkai mayta wakpir pkuay iaaaqmi awajakikuna kasunchk kaunger alin pullykachkun pana llta\n',
            user_id: '1',
            name: 'hispana.wav'
        });
    }
}
