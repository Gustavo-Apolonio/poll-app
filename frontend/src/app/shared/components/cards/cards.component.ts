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
  @Input() index: number;
  @Input() selected: boolean = false;
  @Input() pollIds: string[] = [];

  @Output() selectEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output() searchPollIdsEvent: EventEmitter<never>;
  @Output() enterPollEvent: EventEmitter<EnterPoll>;

  constructor() {
    this.searchPollIdsEvent = new EventEmitter<never>();
    this.enterPollEvent = new EventEmitter<EnterPoll>();
  }

  onSelectEvent($event: number) {
    this.selectEvent.emit($event);
  }
}
