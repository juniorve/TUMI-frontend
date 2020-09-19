import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable(
    { providedIn: 'root' }
)

export class GroupService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });


    constructor(private http: HttpClient) { }

    saveFile(request: any): Observable<any> {
        const headerFile: HttpHeaders = new HttpHeaders();
        /*   headerFile.append('Accept', 'application/json'); */

        console.log(request);
        // return new Promise((resolve, reject) => {
        const formdata = new FormData();
        formdata.append('file', request.file, request.file.name);
        formdata.append('code', request.code);

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
        xhr.open('POST', 'http://localhost:8181/vgrupo/adjuntar', true);
        xhr.send(formdata);
    }); */
        return this.http.post('http://localhost:8181/vgrupo/adjuntar', formdata, { headers: headerFile });
    }

    getSectors(): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaSector`);
    }

    getGroupType(): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaTipoGrupo`);
    }

    getCategoryList(): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaCategoria`);
    }

    saveGroup(request): Observable<any> {
        return this.http.post(`http://localhost:8181/vgrupo/registrar`, request,
            { headers: this.headers });
    }
}
