import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PollService, UserService } from 'src/app/shared/services';

import { Socket } from 'ngx-socket-io';
import { take } from 'rxjs';
import { Option, Poll } from 'src/app/shared/models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  pollOptions: Option[] = [
    {
      icon: 'assets/images/anger.png',
      color: '#FF0000',
      title: 'anger',
      selected: false,
      votes: 0,
    },
    {
      icon: 'assets/images/sadness.png',
      color: '#0000FF',
      title: 'sadness',
      selected: false,
      votes: 0,
    },
    {
      icon: 'assets/images/disgust.png',
      color: '#009B00',
      title: 'disgust',
      selected: false,
      votes: 0,
    },
    {
      icon: 'assets/images/fear.png',
      color: '#9100F0',
      title: 'fear',
      selected: false,
      votes: 0,
    },
    {
      icon: 'assets/images/joy.png',
      color: '#F1F10E',
      title: 'joy',
      selected: false,
      votes: 0,
    },
    {
      icon: 'assets/images/bingbong.png',
      color: '#FF72FF',
      title: 'bing bong',
      selected: false,
      votes: 0,
    },
  ];

  pollId: string;

  constructor(
    private socket: Socket,
    private pollService: PollService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pollId = this.pollService.pollId;

    this.socket.emit('enter-poll', {
      pollId: this.pollService.pollId,
      userId: this.userService.userId,
    });
    this.socket.on('non-existing-poll', () => {
      this.pollService.leavePoll(this.pollService.pollId || '');
      this.router.navigateByUrl('/login');
    });
  }

  onSelectEvent(selectedIndex: number): void {
    this.pollOptions.forEach((pollOption, index) => {
      if (index == selectedIndex) pollOption.selected = !pollOption.selected;
      else pollOption.selected = false;
    });
  }

  copyPollId(): void {
    window.navigator.clipboard.writeText(this.pollId);
  }

  newPoll(): void {
    this.pollService
      .createPoll()
      .pipe(take(1))
      .subscribe(this.successPolling.bind(this));
  }

  private successPolling(response: Poll): void {
    this.pollService.pollId = response.id;
    window.location.reload();
  }

  leavePoll(): void {
    this.pollService.leavePoll(this.pollId);
    this.router.navigateByUrl('/login');
  }
}
