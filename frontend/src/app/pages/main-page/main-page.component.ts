import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PollService } from 'src/app/shared/services';

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private socket: Socket,
    private pollService: PollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.socket.emit('enter-poll', { pollId: this.pollService.pollId });
    this.socket.on('non-existing-poll', () => {
      this.pollService.leavePoll(this.pollService.pollId || '');
      this.router.navigateByUrl('/login');
    });
  }
}
