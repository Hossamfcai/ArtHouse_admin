import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../home/product/product.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private DepartmentsURL: string = 'http://localhost:3000/departments';
  private ProductsURL: string = 'http://localhost:3000/products';
  private productUpdateURL: string =
    'http://localhost:3000/products/updateProduct/';
  private productImageUpdateURL =
    'http://localhost:3000/products/updateProductImage/';
  private addProductURL = 'http://localhost:3000/products';
  private deleteProductURL = 'http://localhost:3000/products/deleteProduct/';
  private token = localStorage.getItem('accessToken');

  private index = new BehaviorSubject<number>(1);
  index$ = this.index.asObservable();

  private status = new BehaviorSubject<string>('');
  status$ = this.index.asObservable();

  private id = new BehaviorSubject<string>('');
  id$ = this.index.asObservable();

  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.index.asObservable();

  getAllProducts() {
    return this.products.value;
  }
  updateProducts(products: Product[]) {
    this.products.next(products);
  }

  updateStatus(status: string) {
    this.status.next(status);
  }

  getStatus() {
    return this.status.value;
  }

  updateIndex(i: number) {
    this.index.next(i);
  }

  getIndex() {
    return this.index.value;
  }
  updateId(id: string) {
    this.id.next(id);
  }
  getId() {
    return this.id.value;
  }

  getDepartments(): Observable<any> {
    return this.http.get<any>(this.DepartmentsURL);
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(this.ProductsURL);
  }
  updateProduct(title: string, price: string, id: string): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.patch<any>(
      this.productUpdateURL + id,
      { title, price },
      { headers: header }
    );
  }
  updateProductImage(filename: FormData, id: string): Observable<any> {
    // console.log(this.updateProduct + id);
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.patch<any>(this.productImageUpdateURL + id, filename, {
      headers: header,
    });
  }
  addProduct(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post<any>(this.addProductURL, formData, {
      headers: header,
    });
  }
  deleteProduct(id: string): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.delete<any>(this.deleteProductURL + id, {
      headers: header,
    });
  }
}

export interface Department {
  _id: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
