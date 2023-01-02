import { TestBed, inject } from '@angular/core/testing';
import { LoginGuard } from './login.guard';

describe('Guard: Login', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
