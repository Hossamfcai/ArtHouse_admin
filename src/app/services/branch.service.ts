import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private token = localStorage.getItem('accessToken');
  constructor(private http: HttpClient) {}
  private getBranchesURL = 'http://localhost:3000/branch';
  private addBranchURL = 'http://localhost:3000/branch';
  private deleteBranchURL = 'http://localhost:3000/branch/deleteBranch/';

  private branches = new BehaviorSubject<Branch[]>([]);
  branches$ = this.branches.asObservable();

  getAllBranches() {
    return this.branches.value;
  }
  updateBranches(products: Branch[]) {
    this.branches.next(products);
  }

  getBranches(): Observable<any> {
    return this.http.get<any>(this.getBranchesURL);
  }
  addBranch(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post<any>(this.addBranchURL, formData, {
      headers: header,
    });
  }
  deleteBranch(id: string): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.delete<any>(this.deleteBranchURL + id, {
      headers: header,
    });
  }
}

export interface Branch {
  _id: string;
  branchName: string;
  branchImg: string;
  __v?: number;
}
