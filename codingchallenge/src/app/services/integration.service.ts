import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { SignupRequest } from '../models/signup-request';
import { SignupResponse } from '../models/signup-response';
import { Book } from '../models/book';
import { LocalStorageService } from './local-storage.service'; // 👈 Add this

const BASE_URL = 'http://localhost:8899/api';

@Injectable({
  providedIn: 'root'
})



@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  // ✅ Get token from local storage
  private getToken(): string {
    return this.storage.get('auth-key') || '';
  }

  // ✅ Set auth headers dynamically
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ Auth API Calls
  doLogin(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/doLogin`, request);
  }

  doRegister(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${BASE_URL}/doRegister`, request);
  }

  // ✅ Book CRUD API Calls
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BASE_URL}/books`, {
      headers: this.getHeaders()
    });
  }

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${BASE_URL}/books/${isbn}`, {
      headers: this.getHeaders()
    });
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${BASE_URL}/books`, book, {
      headers: this.getHeaders()
    });
  }

  updateBook(isbn: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${BASE_URL}/books/${isbn}`, book, {
      headers: this.getHeaders()
    });
  }

  deleteBook(isbn: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/books/${isbn}`, {
      headers: this.getHeaders()
    });
  }
}
