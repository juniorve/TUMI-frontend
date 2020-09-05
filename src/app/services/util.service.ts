import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

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
}
