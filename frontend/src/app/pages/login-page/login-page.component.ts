import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs';

import { PollService } from 'src/app/shared/services';

import { EnterPoll, Poll } from 'src/app/shared/models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  pollIds: string[] = [];

  constructor(private pollService: PollService, private router: Router) {}

  ngOnInit(): void {
    this.searchPollIds();
  }

  public searchPollIds(): void {
    this.pollService
      .listPollIds()
      .pipe(take(1))
      .subscribe((polls: Poll[]) => {
        this.pollIds = polls.map((poll: Poll) => poll.id);
      });
  }

  public enterPollEvent({ shouldCreate, pollId }: EnterPoll) {
    if (shouldCreate) this.createPoll();
    else if (pollId) this.enterPoll(pollId);
  }

  private createPoll(): void {
    if (this.pollService.requestStatus == 'loading') return;

    this.pollService.requestStatus = 'loading';

    this.pollService
      .createPoll()
      .pipe(take(1))
      .subscribe(this.successPolling.bind(this));
  }

  private enterPoll(pollId: string): void {
    if (pollId) {
      this.pollService.requestStatus = 'loading';

      this.pollService
        .enterPoll(pollId)
        .pipe(take(1))
        .subscribe({
          next: this.successPolling.bind(this),
          error: () => {
            this.pollService.requestStatus = 'error';
          },
        });
    }
  }

  private successPolling(response: Poll): void {
    this.pollService.requestStatus = 'success';
    this.pollService.pollId = response.id;
    this.router.navigateByUrl('/');
  }
}
