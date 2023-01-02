import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { PoolService } from '../../services';
import PoolId from '../../models/PoolIdModel';

interface PoolIdState {
  error: boolean;
  loading: boolean;
  success: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() type: string = 'main';
  @Input() title: string = 'Pool';

  // Main card
  poolIdState: PoolIdState = { error: false, loading: false, success: false };
  poolIdFormController: FormControl = new FormControl('', []);
  poolIds: string[] = [];
  filteredPoolIds: Observable<string[]>;

  // Pool card

  constructor(private poolService: PoolService) {}

  ngOnInit() {
    this.poolService
      .listPoolIds()
      .pipe(take(1))
      .subscribe((poolIds: PoolId[]) => {
        this.poolIds = poolIds.map((poolId: PoolId) => poolId.id);
        this.filteredPoolIds = of(this.poolIds);
      });

    this.filteredPoolIds = this.poolIdFormController.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    if (!value || value === '') return this.poolIds;
    const filterValue = value.toLowerCase();

    return this.poolIds.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
