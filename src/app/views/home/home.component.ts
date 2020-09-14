import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeView {

  public readonly SUBSCRIPTIONS_BTN_TEXT = 'Inscriptions';
  public readonly PROGRAMS_BTN_TEXT = 'Découvrez nos programmes';

  constructor(private router: Router) {
  }

  public onNavigatePrograms(event: Event): void {
    this.router.navigateByUrl('/programmes');
  }

  public onNavigateSubscriptions(event: Event): void {
    this.router.navigateByUrl('/inscriptions');
  }
}
