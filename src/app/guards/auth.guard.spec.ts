import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let guard: authGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      isFirstLogin: jasmine.createSpy('isFirstLogin'),
      getUserRole: jasmine.createSpy('getUserRole'),
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(authGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
