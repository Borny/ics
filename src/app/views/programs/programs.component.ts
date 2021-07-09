import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { Formule } from 'src/app/models/formule.models';
import { FormuleService } from 'src/app/services/formule/formule.service';

// import { SessionsKids } from '../../models/sessionsKids.model';
// import { SessionsAdults } from '../../models/sessionsAdults.model';

@Component({
  selector: 'programs',
  templateUrl: 'programs.component.html',
  styleUrls: ['programs.component.scss'],
})
export class ProgramView implements OnInit {
  public loading = false;
  public ageGroupEnum = AgeGroupEnum;
  public formules: Formule[] = [];

  public formules$: Observable<Formule[]>;

  public readonly CONTACT_BTN_TEXT = 'Nous contacter';
  public readonly SUBSCRIPTIONS_BTN_TEXT = 'Inscriptions';


  constructor(private router: Router, private formuleService: FormuleService) {}

  ngOnInit() {
    this._getFormules();
  }

  public onNavigateContact(event: Event): void {
    this.router.navigateByUrl('/contact');
  }

  public onNavigateSubscriptions(event: Event): void {
    this.router.navigateByUrl('/inscriptions');
  }

  private _getFormules(): void {
    this.loading = true;

    this.formules$ = this.formuleService.getFormules().pipe(
      map((res) => {
        return res.map((formule, idx) => {
          formule.index = idx;
          return formule;
        });
      }),
      tap((formules) => (this.formules = formules)),
      finalize(() => (this.loading = false))
    );
  }
}
