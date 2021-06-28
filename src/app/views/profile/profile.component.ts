import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { EditProfileDialog } from './edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileView implements OnInit {
  public user: User;
  public userId: string;
  public isLoading = false;
  public userError = false;

  public readonly CONFIRM = 'confirm';
  public readonly CANCEL = 'cancel';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.authService.getUser(this.userId).subscribe(
        (response) => {
          this.user = response.user;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.userError = true;
          this.isLoading = false;
        }
      );
    });
  }

  public onOpenEditDialog(user: User): void {
    const userId = user._id;
    const dialogRef = this.dialog.open(EditProfileDialog, {
      minWidth: '300px',
      data: userId,
    });
    dialogRef.beforeClosed().subscribe((result) => {
      this.user = result.user;
      this.isLoading = true;
      // if (result.action === this.CONFIRM) {
      //   this.authService.updateUser(
      //     this.userId,
      //     this.user.firstName,
      //     this.user.lastName,
      //     this.user.nickName,
      //     this.user.profileImagePath
      //   )
      //     .subscribe(
      //       response => {
      //         this.user.profileImagePath = result.imagePreview;
      //         this.authService.userDataListener$.next(this.user);
      //         this.isLoading = false;
      //       },
      //       err => {
      //         this.isLoading = false;
      //       }
      //     );
      // } else {
      //   this.isLoading = false;
      // }
    });
  }
}
