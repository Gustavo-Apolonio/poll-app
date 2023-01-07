import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pollId: string;

  @Input() pollOptions: Option[] = [];

  @Output() newPollEvent: EventEmitter<never>;
  @Output() leavePollEvent: EventEmitter<never>;

  constructor() {
    this.newPollEvent = new EventEmitter<never>();
    this.leavePollEvent = new EventEmitter<never>();
  }

  ngOnInit(): void {}

  copyPollId(): void {
    window.navigator.clipboard.writeText(this.pollId);
  }
}
