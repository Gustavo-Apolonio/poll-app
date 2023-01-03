import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Poll } from '../models';
import { PollIdKey } from '../keys/PollId.key';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private baseUrl: string = environment.services.poll.baseUrl;

  constructor(private http: HttpClient) {}

  listPollIds(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.baseUrl);
  }

  createPoll(): Observable<Poll> {
    return this.http.post<Poll>(`${this.baseUrl}/create`, {});
  }

  enterPoll(pollId: string): void {
    localStorage.setItem(PollIdKey, pollId);
  }

  leavePoll(pollId: string): void {
    localStorage.removeItem(PollIdKey);
    this.http.delete(`${this.baseUrl}/delete/${pollId}`);
  }

  get pollId(): string {
    return localStorage.getItem(PollIdKey)?.toString() || '';
  }
}
