import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeView {
  public navigateProgramButtonText = 'Découvrez nos programmes';

  constructor(private router: Router) {
  }

  public onNavigate(event: Event): void {
    this.router.navigateByUrl('/programs');
  }
}
