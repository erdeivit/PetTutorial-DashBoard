import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Login, Questionnaire, Question } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService, UtilsService, AlertService, QuestionnaireService } from '../../shared/services/index';

// tslint:disable-next-line: no-empty-interface
export interface DialogViewQuestionnaires { }
@Component({
  selector: 'app-viewquestionnairesdialog',
  templateUrl: 'viewQuestionnairesDialog.html',
  styleUrls: ['./questionnaire.scss']
})
export class ViewQuestionnairesDialogComponent {
  public Questions: Array<Question>;
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionnairesDialogComponent>,
    public questionnaireService: QuestionnaireService,
    public alertService: AlertService,
    public loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: DialogViewQuestionnaires) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public getQuestionsofQuestionnaire(idQuestionnaire: string) {
    this.questionnaireService.getQuestionsofQuestionnaire(idQuestionnaire).subscribe(
      ((Questions: Array<Question>) => {
        this.Questions = Questions;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }
}

// tslint:disable-next-line: no-empty-interface
export interface DialogViewQuestions { }
@Component({
  selector: 'app-viewquestionsdialogcomponent',
  templateUrl: 'viewQuestionsDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class ViewQuestionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogViewQuestions) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// tslint:disable-next-line: no-empty-interface
export interface DialogCreateQuestionnaires { }
@Component({
  selector: 'app-createquestionnairesdialogcomponent',
  templateUrl: 'createQuestionnairesDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class CreateQuestionnairesDialogComponent {
  public filteredquestions: Array<Question>;
  constructor(
    public dialogRef: MatDialogRef<CreateQuestionnairesDialogComponent>,
    public questionnaireService: QuestionnaireService,
    public alertService: AlertService,
    public utilsService: UtilsService,
    public loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateQuestionnaires) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public selectQuestionsfilterbycategory(category: string, questions: Array<Question>) {
    this.filteredquestions = questions.filter(item => item.category === category);
  }
}

// tslint:disable-next-line: no-empty-interface
export interface DialogCreateQuestions { }
@Component({
  selector: 'app-createquestionsdialogcomponent',
  templateUrl: 'createQuestionsDialogComponent.html',
  styleUrls: ['./questionnaire.scss']
})
export class CreateQuestionsDialogComponent {
  public respuesta1 = false;
  public respuesta2 = false;
  public respuesta3 = false;
  public respuesta4 = false;
  public respuesta5 = false;
  public respuesta6 = false;
  constructor(
    public dialogRef: MatDialogRef<CreateQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateQuestions) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public numberOfAnswers(number: number) {
    switch (number) {
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
  public questions: Array<Question>;
  public categories: Array<string> = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertService: AlertService,
    public utilsService: UtilsService,
    public loadingService: LoadingService,
    public questionnaireService: QuestionnaireService,
    public dialog: MatDialog, ) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }

  public openViewQuestionnairesDialog(): void {
    this.getTeacherQuestions();
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
    });

  }

  public openViewQuestionsDialog(): void {
    this.getTeacherQuestions();
    const dialogRef = this.dialog.open(ViewQuestionsDialogComponent,
      {
        height: '500px',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: { questionshtml: this.questions }
      });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openCreateQuestionnairesDialog(): void {
    this.getCategories();
    const dialogRef = this.dialog.open(CreateQuestionnairesDialogComponent,
      {
        height: '500px',
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
        },
        data: {
          questionshtml: this.questions,
          category: this.categories
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const idquestions = result['questionId'];
        const intidquestions = [];
        for (let i = 0; i < idquestions.length; i++) {
          intidquestions[i] = parseInt(idquestions[i], 10);
        }
        result['teacherId'] = this.utilsService.currentUser.userId;
        result['questionId'] = intidquestions;
        this.questionnaireService.saveQuestionnaire(result).subscribe(
          (() => {
            this.getTeacherQuestions();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
      }
    });

  }

  public openCreateQuestionsDialog(): void {
    const dialogRef = this.dialog.open(CreateQuestionsDialogComponent,
      {
        height: 'auto',
        width: '500px',
        position: {
          top: '70px',
          right: '400px'
        },
        data: {}
      });
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result['teacherId'] = this.utilsService.currentUser.userId;
        if (result['answer2']) {
          if (result['correctanswer'].length > 1) {
            result['type'] = 'multiAnswer';
          } else {
            result['type'] = 'classic';
          }
        } else {
          result['type'] = 'openQuestion';
          result['correctanswer'] = result['answer1'];
        }
        this.questionnaireService.saveQuestion(result).subscribe(
          (() => {
            this.getTeacherQuestions();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
      }
    });


  }

  public getCategories() {
    let categoryfind = false;
    this.categories = [];
    this.categories.push(this.questions[0].category);
    for (const question of this.questions) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i] === question.category) {
          categoryfind = true;
        }
      }
      if (!categoryfind) {
        this.categories.push(question.category);
      }
      categoryfind = false;
    }
  }

  /**
       * FIRST METHOD THAT IS FIRED WHEN ENTER TO THE COMPONENT
       */
  public ngOnInit(): void {
    this.getTeacherQuestionnaires();
    this.getTeacherQuestions();
  }

  public getTeacherQuestionnaires() {
    this.questionnaireService.getTeacherQuestionnaires(String(this.utilsService.currentUser.userId)).subscribe(
      ((Questionnaires: Questionnaire[]) => {
        this.questionnaires = Questionnaires;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getTeacherQuestions() {
    this.questionnaireService.getTeacherQuestions(String(this.utilsService.currentUser.userId)).subscribe(
      ((valueQuestion: Question[]) => {
        this.questions = valueQuestion;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

}
