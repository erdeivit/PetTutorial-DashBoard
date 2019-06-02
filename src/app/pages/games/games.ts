import { Component, OnInit, Inject } from '@angular/core';
import { Login, Group, Role, Student, QuestionnaireGame, Questionnaire, ResultQuestionnaire } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';

export interface DialogCreateNewGame {
  // PARA SI QUIERO LLEVARME ALGUNA INFORMACION AL DIALOG
  questionnaireshtml: Array<Questionnaire>;

}
@Component({
  selector: 'app-createnewgame',
  templateUrl: 'createNewGame.html',
  styleUrls: ['./games.scss']
})
export class CreateNewGameComponent {
  public team: boolean;
  public questiontime: boolean;
  public questionnairetime: boolean;
  public selectime: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateNewGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateNewGame) {
    this.team = false;
    this.questiontime = false;
    this.questionnairetime = false;
    this.selectime = false;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public teamModeSelect(boolean: boolean) {
    this.team = boolean;
    console.log(this.team);
  }

  public tiempo(i: number) {
    switch (i) {
      case 0:
        this.questiontime = false;
        this.questionnairetime = true;
        this.selectime = false;
        break;
      case 1:
        this.selectime = true;
        this.questionnairetime = false;
        this.questiontime = false;
        break;
      case 2:
        this.questionnairetime = false;
        this.questiontime = true;
        break;
      case 3:
        this.questionnairetime = true;
        this.questiontime = false;
        break;
      case 9:
        this.questionnairetime = false;
        this.questiontime = false;
        this.selectime = false;
        break;
    }
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.html',
  styleUrls: ['./games.scss']
})
export class GamesComponent implements OnInit {
  public returnUrl: string;
  public groupId: string;
  public students: Array<Student>;
  public sub: {};
  public questionnaireGame: Array<QuestionnaireGame>;
  public questionnaires: Array<Questionnaire>;
  public activeQuestionnaireGame: Array<QuestionnaireGame>;
  public deadQuestionnaireGame: Array<QuestionnaireGame>;
  public programmedQuestionnaireGame: Array<QuestionnaireGame>;
  public questionnaire: Questionnaire;
  public resultQuestionnaire: Array<ResultQuestionnaire>;
  public results: boolean;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertService: AlertService,
    public utilsService: UtilsService,
    public loadingService: LoadingService,
    public groupService: GroupService,
    public questionnaireService: QuestionnaireService,
    public dialog: MatDialog) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }

  public openCreateNewGameComponent(): void {
    console.log('ViewQuestionsDialogComponent');
    const dialogRef = this.dialog.open(CreateNewGameComponent,
      {
        height: 'auto',
        width: '500px',
        position: {
          top: '70px',
          right: '400px'
        },
        data: {
          questionnaireshtml: this.questionnaires
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(result);

      if (result != undefined) {
        //var obj = Object.values(result);
        console.log(result['teamMode']);
        result['teacherId'] = this.utilsService.currentUser.userId;
        result['questionnaireId'] = parseInt(result['questionnaireId'], 10);
        result['groupId'] = this.groupId;
        result['start_date'] = result['start_date'].getTime();
        result['finish_date'] = result['finish_date'].getTime();
        if (result['teamMode'] === '-1') {
          result['teamMode'] = result['teamMode2'];
        }
        this.questionnaireService.saveQuestionnaireGame(result).subscribe(
          (() => {
            this.ngOnInit();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
        console.log("DESPUES DE RELLENAR MAS CAMPOS");
        console.log(result);

      }
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.loadingService.show();
    this.questionnaireGame = [];
    this.activeQuestionnaireGame = [];
    this.programmedQuestionnaireGame = [];
    this.deadQuestionnaireGame = [];
    this.results = false;
    this.getMyQuestionnaires();
    this.getGroupQuestionnairesGame(this.groupId);
    this.getResults();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  public getResults() {
    this.questionnaireService.getResults().subscribe(
      ((resultQuestionnaire: ResultQuestionnaire[]) => {
        this.resultQuestionnaire = resultQuestionnaire;
        console.log(this.resultQuestionnaire);
        if (this.resultQuestionnaire.length > 0) {
          for (let result of this.resultQuestionnaire) {
            console.log(result.questionnaireGame.groupId);
            console.log(this.groupId);
            if (result.questionnaireGame.groupId == this.groupId) {
              this.results = true;
            }
          }
        }
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));

  }
  public getInformation(id: string) {
    this.getQuestionnaireOfQUestionnaireGame(id);
  }

  public ShowResults() {
    this.returnUrl = this.route.snapshot.url.join('/') + '/showResult';
    this.router.navigate([this.returnUrl]);
  }

  public getQuestionnaireOfQUestionnaireGame(id: string) {
    this.questionnaireService.getQuestionnaireOfQUestionnaireGame(id).subscribe(
      ((Questionnaire: Questionnaire) => {
        this.questionnaire = Questionnaire;
        console.log(Questionnaire);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getMyQuestionnaires() {
    this.questionnaireService.getMyQuestionnaires(String(this.utilsService.currentUser.userId)).subscribe(
      ((Questionnaires: Questionnaire[]) => {
        this.questionnaires = Questionnaires;
        console.log(this.questionnaires);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getGroupQuestionnairesGame(id: string) {
    this.questionnaireService.getGroupQuestionnairesGame(id).subscribe(
      ((QuestionnairesGame: QuestionnaireGame[]) => {
        this.questionnaireGame = QuestionnairesGame;
        console.log(this.questionnaireGame);
        this.getActivos();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getActivos() {
    const date = new Date();
    this.activeQuestionnaireGame = [];
    this.deadQuestionnaireGame = [];
    this.programmedQuestionnaireGame = [];
    for (let QuestionarioGame of this.questionnaireGame) {
      var diff = new Date(QuestionarioGame.finish_date).getTime() - date.getTime();
      var diff2 = new Date(QuestionarioGame.start_date).getTime() - date.getTime();
      // tslint:disable-next-line: max-line-length
      QuestionarioGame['str_date'] = new Date(QuestionarioGame.start_date).getDate() + '/' + (new Date(QuestionarioGame.start_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.start_date).getFullYear();
      QuestionarioGame['fnsh_date'] = new Date(QuestionarioGame.finish_date).getDate() + '/' + (new Date(QuestionarioGame.finish_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.finish_date).getFullYear();
      if (diff >= 0) {
        if (diff2 >= 0) {
          this.programmedQuestionnaireGame.push(QuestionarioGame);
        }
        else {
          this.activeQuestionnaireGame.push(QuestionarioGame);
        }
      }
      else {
        this.deadQuestionnaireGame.push(QuestionarioGame);
      }
    }
  }

}

