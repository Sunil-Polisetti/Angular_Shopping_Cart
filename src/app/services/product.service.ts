import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private searchSubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  setSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }

  getSearchQuery(): string {
    return this.searchSubject.value;
  }
}

