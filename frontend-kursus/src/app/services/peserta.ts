import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesertaService {
  private base = 'http://localhost:3000/api/peserta';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.base, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}