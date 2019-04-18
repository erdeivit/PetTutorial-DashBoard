import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { Login, Group, Role, Questionnaire, Question, QuestionnaireGame } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { SelectionModel } from '@angular/cdk/collections';

export interface DialogViewQuestionnaires {
}
@Component({
  selector: 'app-viewquestionnairesdialog',
  templateUrl: 'viewQuestionnairesDialog.html',
})
export class ViewQuestionnairesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionnairesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogViewQuestionnaires) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public getInformation(id: String) {
    console.log(id);

  }
}

export interface DialogViewQuestions {
}
@Component({
  selector: 'app-viewquestionsdialogcomponent',
  templateUrl: 'viewQuestionsDialogComponent.html',
})
export class ViewQuestionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogViewQuestions) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogCreateQuestionnaires {

}
@Component({
  selector: 'app-createquestionnairesdialogcomponent',
  templateUrl: 'createQuestionnairesDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class CreateQuestionnairesDialogComponent {
  public option1: boolean;
  public option2: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateQuestionnairesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateQuestionnaires) {
    this.option1 = false;
    this.option2 = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public myFn(id: string) {
    console.log(id);
  }
}

export interface DialogCreateQuestions { }
@Component({
  selector: 'app-createquestionsdialogcomponent',
  templateUrl: 'createQuestionsDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class CreateQuestionsDialogComponent {
  public option1: boolean;
  public option2: boolean;
  public respuesta1: boolean;
  public respuesta2: boolean;
  public respuesta3: boolean;
  public respuesta4: boolean;
  public respuesta5: boolean;
  public respuesta6: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateQuestions) {
    this.option1 = false;
    this.option2 = false;
    this.respuesta1 = false;
    this.respuesta2 = false;
    this.respuesta3 = false;
    this.respuesta4 = false;
    this.respuesta5 = false;
    this.respuesta6 = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public eleccion0() {
    this.option1 = false;
    this.option2 = false;
  }
  public eleccion1() {
    this.option1 = true;
    this.option2 = false;
  }
  public eleccion2() {
    this.option1 = false;
    this.option2 = true;
  }

  public numrespuestas(i: number) {
    console.log(i);
    switch (i) {
      case 0:
        this.respuesta1 = false;
        this.respuesta2 = false;
        this.respuesta3 = false;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 1:
        this.respuesta1 = true;
        this.respuesta2 = false;
        this.respuesta3 = false;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 2:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = false;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 3:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = false;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 4:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = true;
        this.respuesta5 = false;
        this.respuesta6 = false;
        break;
      case 5:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = true;
        this.respuesta5 = true;
        this.respuesta6 = false;
        break;
      case 6:
        this.respuesta1 = true;
        this.respuesta2 = true;
        this.respuesta3 = true;
        this.respuesta4 = true;
        this.respuesta5 = true;
        this.respuesta6 = true;
        break;
    }
  }
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.html',
  styleUrls: ['./questionnaire.scss']
})
export class QuestionnaireComponent implements OnInit {

  public questionnaires: Array<Questionnaire>;
  public question: Array<Question>;
  public animal: string;
  public QuestionnaireNumber: string;
  public QuestionParameters: Array<string>;


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
  public openViewQuestionnairesDialog(): void {
    console.log('openViewQuestionnairesDialog');
    const dialogRef = this.dialog.open(ViewQuestionnairesDialogComponent,
      {
        height: 'auto',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionnaireshtml: this.questionnaires }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //RECOGER DATOS AL CERRAR
    });

  }
  public openViewQuestionsDialog(): void {
    console.log('ViewQuestionsDialogComponent');
    const dialogRef = this.dialog.open(ViewQuestionsDialogComponent,
      {
        height: 'auto',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionshtml: this.question }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //RECOGER DATOS AL CERRAR
    });

  }

  public openCreateQuestionnairesDialog(): void {
    console.log('openCreateQuestionnairesDialog');
    const dialogRef = this.dialog.open(CreateQuestionnairesDialogComponent,
      {
        height: 'auto',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionshtml: this.question }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The CreateQuestionnairesDialogComponent was closed');
      console.log(result);
      //RECOGER DATOS AL CERRAR

      if (result != undefined) {
        //var obj = Object.values(result);
        result["teacherId"] = this.utilsService.currentUser.userId;

        this.questionnaireService.saveQuestionnaire(result).subscribe(
          (() => {
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
        this.getMyQuestionnaires();
      }
    });


  }

  public openCreateQuestionsDialog(): void {
    console.log('CreateQuestionsDialogComponent');
    const dialogRef = this.dialog.open(CreateQuestionsDialogComponent,
      {
        height: 'auto',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The CreateQuestionsDialogComponent was closed');
      console.log(result);

      if (result != undefined) {
        //var obj = Object.values(result);
        result["teacherId"] = this.utilsService.currentUser.userId;
        this.questionnaireService.saveQuestion(result).subscribe(
          (() => {
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
        this.getMyQuestions();
      }
    });

  }

  public ngOnInit(): void {

    this.getMyQuestionnaires();
    this.getMyQuestions();

  }

  public getMyQuestionnaires() {

    this.questionnaireService.getMyQuestionnaires(this.utilsService.currentUser.userId).subscribe(
      ((Questionnaires: Questionnaire[]) => {
        this.questionnaires = Questionnaires;
        console.log(this.questionnaires);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getMyQuestions() {
    console.log("getMYQUESTIONS");
    this.questionnaireService.getMyQuestions(this.utilsService.currentUser.userId).subscribe(
      ((Question: Question[]) => {
        this.question = Question;
        console.log(this.question);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

}
