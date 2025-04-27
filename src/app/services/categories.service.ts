// src/app/services/categories.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'http://localhost:5001'; // Backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      })
    };
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, this.getAuthHeaders());
  }

  addCategory(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, { name }, this.getAuthHeaders());
  }

  updateCategory(id: number, name: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, { name }, this.getAuthHeaders());
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`, this.getAuthHeaders());
  }
}
