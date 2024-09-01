import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  isSidebarVisible: boolean = true;

  // Function to toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  get imagePath() {
    return '/assets/logo-money.png';
  }
}
