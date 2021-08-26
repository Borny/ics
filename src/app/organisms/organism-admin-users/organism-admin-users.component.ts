import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { SubscriptionService } from '../../services/subscription/subscription.service';
import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';
import { AgeGroupEnum } from 'src/app/models/age-group.enum';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'organism-admin-users',
  templateUrl: './organism-admin-users.component.html',
  styleUrls: ['./organism-admin-users.component.scss'],
})
export class OrganismAdminUsers implements OnInit {
  public name: string;
  public users: User[] = [];
  public ageGroupEnum = AgeGroupEnum;
  public isLoading = false;
  public search = '';

  public users$: Observable<User[]>;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this._getUsers();
  }

  public onUpdateUsers(): void {
    this._getUsers();
  }

  // public onSearch(): void {
  //   console.log(this.search);
  //   const obs = this.users.filter(({ email }) => email === this.search);
  // }

  private _getUsers(): void {
    this.isLoading = true;
    this.users$ = this.authService.getUsers().pipe(
      finalize(() => (this.isLoading = false)),
      map((users) => users.users),
      tap((users) => (this.users = users))
    );
  }
}
