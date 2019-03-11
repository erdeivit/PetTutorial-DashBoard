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
  questionnaireshtml: Array<Questionnaire>;

}
@Component({
  selector: 'app-viewquestionnairesdialog',
  templateUrl: 'viewQuestionnairesDialog.html',
})
export class ViewQuestionnairesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionnairesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.html',
  styleUrls: ['./questionnaire.scss']
})
export class QuestionnaireComponent implements OnInit {

  public questionnaires: Array<Questionnaire>;
  public animal: string;
  public name: string;

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
  public openDialog(): void {

    this.questionnaireService.getMyQuestionnaires(this.utilsService.currentUser.userId).subscribe(
      ((Quest: Questionnaire[]) => {
        this.questionnaires = Quest;
        console.log(this.questionnaires);
        this.name = 'DAVID';
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));

    const dialogRef = this.dialog.open(ViewQuestionnairesDialogComponent,
      {
        width: '3000px',
        data: { questionnaireshtml: this.questionnaires }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //RECOGER DATOS AL CERRAR
    });
  }

  public ngOnInit(): void {


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
