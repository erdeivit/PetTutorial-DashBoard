import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Login, Group, Role, Questionnaire, Question, QuestionnaireGame } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';


export interface DialogData {
  // PARA SI QUIERO LLEVARME ALGUNA INFORMACION AL DIALOG

}

@Component({
  selector: 'app-viewquestionnairesdialog',
  templateUrl: 'viewQuestionnairesDialog.html',
})
export class ViewQuestionnairesDialogComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ViewQuestionnairesDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.html',
  styleUrls: ['./questionnaire.scss']
})
export class QuestionnaireComponent implements OnInit {

  public questionnaireGame: Array<QuestionnaireGame>;
  //public myQuestions: Array<Question>;
  //public snackbar: MatSnackBar;
  //private returnUrl: string;
  //public questionnaireId: string;
  // tslint:disable-next-line:no-any
  //private sub: any;
  //public items: string[] = [];


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertService: AlertService,
    public utilsService: UtilsService,
    public loadingService: LoadingService,
    public questionnaireService: QuestionnaireService,
    public dialog: MatDialog) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }

  public ngOnInit(): void {

    this.questionnaireService.getMyQuestionnaireGame().subscribe(
      ((QuestGame: QuestionnaireGame[]) => {
        this.questionnaireGame = QuestGame;
        console.log(this.questionnaireGame);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ViewQuestionnairesDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}





/*
    public goToResultQuestionnaire(): void {

      this.router.navigate([this.returnUrl, this.questionnaireId]);
    }
    */
/*

if (this.utilsService.role === Role.TEACHER) {

  this.questionnaireService.getMyQuestionnaire(this.questionnaireId).subscribe(
    ((questionnaire: Questionnaire) => {
      this.myQuestionnaire = questionnaire;
      this.loadingService.hide();
    }),
    ((error: Response) => {
      this.loadingService.hide();
      this.alertService.show(error.toString());
    }));
  /*
        this.questionnaireService.getMyQuestionnaireQuestions(this.questionnaireId).subscribe(
          ((questions: Array<Question>) => {
            this.myQuestions = questions;
            this.loadingService.hide();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
          */