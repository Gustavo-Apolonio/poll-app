import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-vote',
  templateUrl: './header-vote.component.html',
  styleUrls: ['./header-vote.component.scss'],
})
export class HeaderVoteComponent implements OnInit {
  @Input() title: string = 'Option';
  @Input() votes: number = 0;
  @Input() color: string = '#EDEDED';

  textShadow: string = `text-shadow: 0px 2.5px 5px ${this.color};`;

  constructor() {}

  ngOnInit() {
    this.textShadow = `text-shadow: 0px 2.5px 5px ${this.color};`;
  }
}
