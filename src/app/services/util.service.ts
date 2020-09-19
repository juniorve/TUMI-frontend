import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');


    constructor(private http: HttpClient) {
    }

    getAgeList(): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaGrupoEdad`);
    }

    getDepatments(): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaDepartamentos`);
    }

    getProvinces(departmentId): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaProvincias?pdepartamento=${departmentId}`);
    }

    getDistricts(departmentId, provinceId): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaProvincias?pdepartamento=${departmentId}&pprovincia=${provinceId}`);
    }

    saveQuechuaPerson(request): Observable<any> {
        return this.http.post(`${environment.url}/vpersonaquec/registrar`, request,
            { headers: this.headers });
    }
}
