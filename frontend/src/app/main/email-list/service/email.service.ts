import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from 'src/app/api-endpoints';
import { Observable } from 'rxjs';
import { Email } from 'src/app/common/models/email';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  public getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(ApiEndpoints.getEmails());
  }

  public checkIfActivated(id: number): Observable<boolean> {
    return this.http.get<any>(ApiEndpoints.checkIfActivated(id))
      .pipe(map(res => {
        return res.message === 'active';
      }));
  }

  public createEmail(email: Email): Observable<Email> {
    return this.http.post<Email>(ApiEndpoints.getEmails(), email);
  }
}
