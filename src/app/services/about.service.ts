import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  private getAboutDataURL: string = 'http://localhost:3000/about';
  private updateHeaderImgURL: string =
    'http://localhost:3000/about/updateHeaderImage';
  private updateFirstImageURL: string =
    'http://localhost:3000/about/updatedFirstImage';
  private updateSecondImageURL: string =
    'http://localhost:3000/about/updateSecondImage';
  private updateInfo: string = 'http://localhost:3000/about/updateInfoOfAbout';

  private token = localStorage.getItem('accessToken');

  private about = new BehaviorSubject<About>({
    headerImg: '',
    firstImage: '',
    secondImage: '',
    history: '',
    growth: '',
    MissionAndVisionstatement: '',
    strategy: '',
    WhyArtHouse: '',
    OurScope: '',
    OurCommitment: '',
    __v: 0,
  });
  about$ = this.about.asObservable();

  getAllAbout() {
    return this.about.value;
  }
  updateAbout(about: About) {
    this.about.next(about);
  }

  getAboutData(): Observable<any> {
    return this.http.get<any>(this.getAboutDataURL);
  }

  updateHeaderImg(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.patch<any>(this.updateHeaderImgURL, formData, {
      headers: header,
    });
  }

  updateFirstImg(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.patch<any>(this.updateFirstImageURL, formData, {
      headers: header,
    });
  }

  updateSecondImg(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.patch<any>(this.updateSecondImageURL, formData, {
      headers: header,
    });
  }

  updateAboutData(data: object): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.patch<any>(this.updateInfo, data, {
      headers: header,
    });
  }
}

export interface About {
  headerImg: string;
  firstImage: string;
  secondImage: string;
  history: string;
  growth: string;
  MissionAndVisionstatement: string;
  strategy: string;
  WhyArtHouse: string;
  OurScope: string;
  OurCommitment: string;
  __v: number;
}
