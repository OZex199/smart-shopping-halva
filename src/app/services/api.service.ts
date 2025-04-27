import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
  private baseUrl = 'http://localhost:5001'; // Flask Backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/login`, data, { headers });
  }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/register`, data, { headers });
  }

  uploadReceipt(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, formData, this.getAuthHeaders());
  }
  getPartners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/partners`, this.getAuthHeaders());
  }
  
  
  getAnalytics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics`, this.getAuthHeaders());
  }

  getRecommendations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recommendations`, this.getAuthHeaders());
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/history`, this.getAuthHeaders());
  }

  getReceiptImage(filename: string): string {
    return `${this.baseUrl}/uploads/${filename}`;
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
