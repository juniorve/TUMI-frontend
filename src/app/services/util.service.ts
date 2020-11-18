import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    private languageSource = new BehaviorSubject<boolean>(false);
    public language$ = this.languageSource.asObservable();

    typeOfLanguage = 'esp';

    headers = new HttpHeaders().set('Content-Type', 'application/json');


    constructor(private http: HttpClient) {
    }

    emitEvent(change) {
        this.languageSource.next(change);
    }

    getAgeList(language = null): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaGrupoEdad?pidioma=${!language ? this.typeOfLanguage : language}`);
    }

    getCategoryList(language = null): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaCategoria?pidioma=${!language ? this.typeOfLanguage : language}`);
    }

    getDepatments(): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaDepartamentos`);
    }

    getProvinces(departmentId): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaProvincias?pdepartamento=${departmentId}`);
    }

    getDistricts(departmentId, provinceId): Observable<any> {
        return this.http.get(`${environment.url}/util/getListaDistritos?pdepartamento=${departmentId}&pprovincia=${provinceId}`);
    }

    saveQuechuaPerson(request): Observable<any> {
        return this.http.post(`${environment.url}/vpersonaquec/registrar`, request,
            { headers: this.headers });
    }

    getLocation(): Observable<any> {
        return this.http.get('https://ipapi.co/json/');
    }
}
