import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();

  onSelectEvent($event: any) {
    this.selectEvent.emit($event);
  }
}
