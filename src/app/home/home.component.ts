import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
