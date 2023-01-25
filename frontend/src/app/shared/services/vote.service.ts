import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vote } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private baseUrl: string = environment.services.vote.baseUrl;

  constructor(private http: HttpClient) {}

  add(pollId: string, vote: Vote): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/`, { pollId, vote });
  }

  remove(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/unvote`, {});
  }
}
