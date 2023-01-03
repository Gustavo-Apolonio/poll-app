import { Injectable } from '@angular/core';

import { PollService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private pollService: PollService) {}

  get hasPoll(): boolean {
    const pollId: string = this.pollService.pollId;
    if (!pollId || pollId === '') return false;
    else return true;
  }
}
