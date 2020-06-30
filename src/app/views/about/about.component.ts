import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss']
})

export class AboutView implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;

  private readonly SCREEN_SM = '(max-width: 768px)';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia(this.SCREEN_SM);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log('_mobileQuery ;', this.mobileQuery)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private _mobileQueryListener(): void { }
}
