import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnterPoll } from '../../models';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() type: string = 'main';
  @Input() title: string = 'Poll';
  @Input() color: string = '#EDEDED';
  @Input() icon: string = 'assets/generic-vote.png';
  @Input() selected: boolean = false;
  @Input() pollIds: string[] = [];

  @Output() selectEvent: EventEmitter<string>;

  @Output() searchPollIdsEvent: EventEmitter<never>;
  @Output() enterPollEvent: EventEmitter<EnterPoll>;

  constructor() {
    this.selectEvent = new EventEmitter<string>();

    this.searchPollIdsEvent = new EventEmitter<never>();
    this.enterPollEvent = new EventEmitter<EnterPoll>();
  }

  onSelectEvent($event: string) {
    this.selectEvent.emit($event);
  }
}
