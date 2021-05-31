import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import {
  descriptionListTrigger,
  fadeInTrigger,
} from '../../animations/animations';
// import { routeStateFadeInTrigger, slideInAnimation } from 'src/app/animations/route-animations';
import { Description } from '../../models/description.model';

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [descriptionListTrigger, fadeInTrigger],
})
export class HomeView {
  // @HostBinding('@routeStateFadeIn') routeAnimation = true;

  public readonly SUBSCRIPTIONS_BTN_TEXT = 'Inscriptions';
  public readonly PROGRAMS_BTN_TEXT = 'Découvrez nos programmes';

  public descriptionList: Description[] = [
    {
      title: 'Agilité',
      content: `La capoeira fait travailler l'agilité ainsi que l'équilibre`,
    },
    {
      title: 'Force',
      content: `La capoeira fait travailler le poids de corps`,
    },
    {
      title: 'Musicalité',
      content: `La capoeira fait travailler les instruments et le chant`,
    },
  ];

  constructor(private router: Router) {}

  public onNavigatePrograms(event: Event): void {
    this.router.navigateByUrl('/programmes');
    console.log('navigate');
  }

  public onNavigateSubscriptions(): void {
    this.router.navigateByUrl('/inscriptions');
  }
}
