import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getObject(object: string) {
    return this.http.get(`${BASE_URL}${object}`);
  }

  getObjectsAuthenticated(object: string, page: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${BASE_URL}${object}/${page}`, { headers: headers});
  }

  createObject(object: string, requestBody: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${BASE_URL}${object}`, requestBody, { headers: headers});
  }

  authentification(object: string, requestBody: any) {
    return this.http.post(`${BASE_URL}${object}`, requestBody);
  }

  updateObject(object: string, requestBody: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${BASE_URL}${object}`, requestBody, { headers: headers });
  }

  deleteObject(object: string, idObject: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${BASE_URL}${object}/${idObject}`, { headers: headers });
  }

  deleteToken() {
    const id_user = localStorage.getItem('userId');
    console.log(`${BASE_URL}/utilisateur/${id_user}`);
    localStorage.clear();
    return this.http.delete(`${BASE_URL}utilisateur/${id_user}`);
  }
}
