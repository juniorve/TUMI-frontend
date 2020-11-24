import { languages } from './../core/form.config';
import { UtilService } from 'src/app/services/util.service';
import { environment } from './../../environments/environment';
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


    constructor(private http: HttpClient, private utilService: UtilService) { }

    saveFile(request: any): Observable<any> {
        const headerFile: HttpHeaders = new HttpHeaders();
        const formdata = new FormData();
        formdata.append('file', request.file, request.file.name);
        formdata.append('code', request.code);
        return this.http.post(`${environment.url}/vgrupo/adjuntar`, formdata, { headers: headerFile });
    }

    getSectors(): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaSector?pidioma=${languages.spanish.value}`);
    }

    getGroupType(): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaTipoGrupo?pidioma=${languages.spanish.value}`);
    }

    saveGroup(request): Observable<any> {
        return this.http.post(`${environment.url}/vgrupo/registrar`, request,
            { headers: this.headers });
    }
}
