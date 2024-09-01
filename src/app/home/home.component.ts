import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isSidebarVisible: boolean = true;
  private authService = inject(AuthenticationService);

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  get imagePath() {
    return '/assets/logo-money.png';
  }

  onLogOut() {
    this.authService.logout();
  }
}
