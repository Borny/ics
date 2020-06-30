import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('snav') navToggle;

  public mobileQuery: MediaQueryList;
  public toggleIconName = 'menu';

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

  public closeNav(): void {
    this.navToggle.close();
  }

  public toggleNav(): void {
    this.navToggle.toggle();

    // TODO: delete logs
    console.log('mobileQuery ;', this.mobileQuery)
    console.log('open', this.navToggle.opened)
    console.log('this.navToggle', this.navToggle)
  }

  private _mobileQueryListener(): void { }
}
