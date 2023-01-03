import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

import { Poll } from 'src/app/shared/models';
import { PollService } from 'src/app/shared/services';

interface PollIdState {
  error: boolean;
  loading: boolean;
  success: boolean;
}

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  @Input() title: string = 'Poll';

  pollIdState: PollIdState = { error: false, loading: false, success: false };
  pollIdFormController: FormControl = new FormControl('', []);
  pollIds: string[] = [];
  filteredPollIds: Observable<string[]>;
  enteringPoll: boolean = false;

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

  public enterPoll(createPoll: boolean = false): void {
    if (this.enteringPoll) return;

    this.enteringPoll = true;

    if (createPoll) {
      this.pollService
        .createPoll()
        .pipe(take(1))
        .subscribe((response) => {
          this.enteringPoll = false;
          this.pollService.enterPoll(response.id);
          this.router.navigateByUrl('/');
        });
    } else {
      const { value } = this.pollIdFormController;
      if (value) {
        this.enteringPoll = false;
        this.pollService.enterPoll(value);
        this.router.navigateByUrl('/');
      }
    }
  }
}
