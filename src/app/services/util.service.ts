import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
   /*  headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    }); */

    headers = new HttpHeaders().set('Content-Type', 'application/json');


    constructor(private http: HttpClient) {
    }

    getAgeList(): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaGrupoEdad`);
    }

    getDepatments(): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaDepartamentos`);
    }

    getProvinces(departmentId): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaProvincias?pdepartamento=${departmentId}`);
    }

    getDistricts(departmentId, provinceId): Observable<any> {
        return this.http.get(`http://localhost:8181/util/getListaProvincias?pdepartamento=${departmentId}&pprovincia=${provinceId}`);
    }

    saveQuechuaPerson(request): Observable<any> {
        return this.http.post(`http://localhost:8181/vpersonaquec/registrar`, request,
            { headers: this.headers });
    }
}
