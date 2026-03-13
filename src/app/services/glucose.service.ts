import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Glucose, GlucoseCreate, GlucoseRespose } from './glucose.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlucoseService {
  private apiURL = `${environment.apiBaseUrl}/glucose-records`;

  constructor(private http: HttpClient) {}

  public getGlucoseHistory(): Observable<Array<Glucose>> {
    return this.http.get<Array<Glucose>>(this.apiURL);
  }

  public createGlucose(payload: GlucoseCreate): Observable<GlucoseRespose> {
    return this.http.post<GlucoseRespose>(this.apiURL, payload);
  }
}
