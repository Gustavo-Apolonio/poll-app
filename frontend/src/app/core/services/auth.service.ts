import { Injectable } from '@angular/core';

import { PollService, UserService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private pollService: PollService,
    private userService: UserService
  ) {}

  get hasPoll(): boolean {
    const pollId: string = this.pollService.pollId;
    if (!pollId || pollId === '') return false;
    else return true;
  }

  get hasUserId(): boolean {
    const userId: string = this.userService.userId;
    if (!userId || userId == '') return false;
    else return true;
  }
}
