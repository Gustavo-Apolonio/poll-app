import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { EnterPoll } from 'src/app/shared/models';
import { PollService } from 'src/app/shared/services';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  @Input() title: string = 'Poll';
  @Input() set pollIds(pollIds: string[]) {
    this.filteredPollIds = of(pollIds);
  }

  pollIdFormController: FormControl = new FormControl('', []);
  filteredPollIds: Observable<string[]>;

  @Output() searchPollIdsEvent: EventEmitter<never>;
  @Output() enterPollEvent: EventEmitter<EnterPoll>;

  constructor(public pollService: PollService) {
    this.searchPollIdsEvent = new EventEmitter<never>();
    this.enterPollEvent = new EventEmitter<EnterPoll>();
  }

  ngOnInit() {
    this.filteredPollIds = this.pollIdFormController.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.pollIdFormController.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => this.enterPoll(false));
  }

  private _filter(value: string): string[] {
    if (!value || value === '') return this.pollIds;
    const filterValue = value.toLowerCase();

    return this.pollIds.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public enterPoll(shouldCreate: boolean): void {
    this.enterPollEvent.emit({
      shouldCreate,
      pollId: this.pollIdFormController.value,
    });
  }
}
