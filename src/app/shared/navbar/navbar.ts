import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LanguageComponent } from '../../pages/language/language';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

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
