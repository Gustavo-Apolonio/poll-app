import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

import { Poll } from 'src/app/shared/models';
import { PollService } from 'src/app/shared/services';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  @Input() title: string = 'Poll';

  pollIdState: 'error' | 'loading' | 'success' | null = null;
  pollIdFormController: FormControl = new FormControl('', []);
  pollIds: string[] = [];
  filteredPollIds: Observable<string[]>;

  constructor(private pollService: PollService, private router: Router) {}

  ngOnInit() {
    this.searchPollIds();

    this.filteredPollIds = this.pollIdFormController.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  public searchPollIds(): void {
    this.pollService
      .listPollIds()
      .pipe(take(1))
      .subscribe((polls: Poll[]) => {
        this.pollIds = polls.map((poll: Poll) => poll.id);
        this.filteredPollIds = of(this.pollIds);
      });
  }

  private _filter(value: string): string[] {
    if (!value || value === '') return this.pollIds;
    const filterValue = value.toLowerCase();

    return this.pollIds.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public enterPoll(): void {
    if (this.pollIdState == 'loading') return;

    const { value } = this.pollIdFormController;

    if (value) {
      this.pollIdState = 'loading';

      this.pollService
        .enterPoll(value)
        .pipe(take(1))
        .subscribe({
          next: this.successPolling.bind(this),
          error: () => {
            this.pollIdState = 'error';
            this.pollIdFormController.setValue('');
          },
        });
    }
  }

  public createPoll(): void {
    if (this.pollIdState == 'loading') return;

    this.pollIdState = 'loading';

    this.pollService
      .createPoll()
      .pipe(take(1))
      .subscribe(this.successPolling.bind(this));
  }

  private successPolling(response: Poll): void {
    this.pollIdState = 'success';
    this.pollService.pollId = response.id;
    this.router.navigateByUrl('/');
  }
}
