import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

// import { routeStateFadeInTrigger } from 'src/app/animations/route-animations';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  // animations: [routeStateFadeInTrigger],
})
export class AboutView implements OnInit, OnDestroy {
  // @HostBinding('@routeStateFadeIn') routeAnimation = true;

  public mobileQuery: MediaQueryList;

  private readonly SCREEN_SM = '(max-width: 768px)';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia(this.SCREEN_SM);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log('_mobileQuery ;', this.mobileQuery);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private _mobileQueryListener(): void {}
}
