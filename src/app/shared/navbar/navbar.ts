import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import { UtilsService } from '../services/utils.service';
import { UserService } from '../services/user.service';
import { AppConfig } from '../../app.config';
import { Profile, Login } from '../models/index';
import { MatDialog } from '@angular/material';

import { LanguageComponent } from '../../pages/language/language';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBarComponent implements OnInit {

  public isLoggedIn: boolean;

  constructor(
    private loginService: LoginService,
    public utilsService: UtilsService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }

  ngOnInit(): void {
    this.userIsLoggedIn();
    /*
    if (this.utilsService.currentUser.id) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    */
  }

  userIsLoggedIn() {
    this.loginService.isLoggedIn.subscribe(
      ((res: boolean) => {
        this.isLoggedIn = res;
      })
    );
  }

  public choose() {
    const dialogRef = this.dialog.open(LanguageComponent, {
      height: '390px',
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
