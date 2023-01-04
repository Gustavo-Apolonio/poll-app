import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.scss'],
})
export class PollCardComponent implements OnInit {
  @Input() title: string = 'Poll';
  @Input() color: string = '#EDEDED';
  @Input() icon: string = 'assets/generic-vote.png';
  @Input() index: number;
  @Input('selected') isSelected: boolean = false;

  // TODO: type here
  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();

  // CSS Variables
  boxShadow: string = `box-shadow: 0px 5px 10px 2.5px ${this.color};`;
  backgroundColor: string = `background-color: ${this.color}`;
  cardStyle: string = `${this.boxShadow}`;
  backgroundImg: string = `background-image: url(${this.icon});`;
  borderColor: string = `border-color: ${this.color};`;

  ngOnInit(): void {
    this.setCssVariables();
  }

  voteOption(): void {
    this.selectEvent.emit(this.index);
  }

  private setCssVariables(): void {
    this.boxShadow = `box-shadow: 0px 5px 10px 2.5px ${this.color};`;
    this.backgroundColor = `background-color: ${this.color}`;
    this.backgroundImg = `background-image: url(${this.icon});`;
    this.borderColor = `border-color: ${this.color};`;
    this.cardStyle = this.boxShadow;
  }

  // TODO: Finish logic to vote
}
