import { Component, OnInit, Inject } from '@angular/core';
import { Login, Student, QuestionnaireGame, Questionnaire, ResultQuestionnaire } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// tslint:disable-next-line: no-empty-interface
export interface DialogCreateNewGame { }
@Component({
  selector: 'app-createnewgame',
  templateUrl: 'createNewGame.html',
  styleUrls: ['./games.scss']
})
export class CreateNewGameComponent {
  public findTeam = false;
  public findQuestiontime = false;
  public findQuestionnairetime = false;
  public findSelectime = false;
  constructor(
    public dialogRef: MatDialogRef<CreateNewGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateNewGame) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public teamModeSelect(findTeam: boolean) {
    this.findTeam = findTeam;
  }

  public timeSelect(numSelect: number) {
    switch (numSelect) {
      case 0:
        this.findQuestiontime = false;
        this.findQuestionnairetime = true;
        this.findSelectime = false;
        break;
      case 1:
        this.findSelectime = true;
        this.findQuestionnairetime = false;
        this.findQuestiontime = false;
        break;
      case 2:
        this.findQuestionnairetime = false;
        this.findQuestiontime = true;
        break;
      case 3:
        this.findQuestionnairetime = true;
        this.findQuestiontime = false;
        break;
      case 9:
        this.findQuestionnairetime = false;
        this.findQuestiontime = false;
        this.findSelectime = false;
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
  public returnUrl: string = this.route.snapshot.queryParams['returnUrl'];
  public groupId: string;
  public sub: {};
  public questionnaireGame: Array<QuestionnaireGame> = [];
  public questionnaires: Array<Questionnaire>;
  public activeQuestionnairesGame: Array<QuestionnaireGame>;
  public deadQuestionnairesGame: Array<QuestionnaireGame>;
  public programmedQuestionnairesGame: Array<QuestionnaireGame>;
  public questionnaire: Questionnaire;
  public resultsQuestionnaire: Array<ResultQuestionnaire>;
  public results = false;
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
      if (result !== undefined) {
        result['teacherId'] = this.utilsService.currentUser.userId;
        result['questionnaireId'] = parseInt(result['questionnaireId'], 10);
        result['groupId'] = this.groupId;
        result['start_date'] = result['start_date'].getTime();
        result['finish_date'] = result['finish_date'].getTime();
        if (result['teamMode'] === '-1') {
          result['teamMode'] = result['teamMode2'];
        }
        this.questionnaireService.postQuestionnaireGame(result).subscribe(
          (() => {
            this.ngOnInit();
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
      }
    });
  }

  /**
   * FIRST METHOD THAT IS FIRED WHEN ENTER TO THE COMPONENT
   */
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.loadingService.hide();
    this.getTeacherQuestionnaires();
    this.getGroupQuestionnairesGame(this.groupId);
    this.getResults();
  }

  /**
     * TO ACTIVE THE RESULTS BUTTON, IF THERE ARE RESULTS
     */
  public getResults() {
    this.questionnaireService.getResults().subscribe(
      ((resultQuestionnaire: ResultQuestionnaire[]) => {
        this.resultsQuestionnaire = resultQuestionnaire;
        if (this.resultsQuestionnaire.length > 0) {
          for (const result of this.resultsQuestionnaire) {
            // tslint:disable-next-line: triple-equals  (this.groupId is number, result. is string)
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

  public getQuestionnaireOfQuestionnaireGame(id_questionnaireGame: string) {
    this.questionnaireService.getQuestionnaireOfQUestionnaireGame(id_questionnaireGame).subscribe(
      ((valueQuestionnaire: Questionnaire) => {
        this.questionnaire = valueQuestionnaire;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  /**
     * TO GO TO RESULTS PAGE
     */
  public ShowResults() {
    this.returnUrl = this.route.snapshot.url.join('/') + '/showResult';
    this.router.navigate([this.returnUrl]);
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

  public getGroupQuestionnairesGame(id_Group: string) {
    this.questionnaireService.getGroupQuestionnairesGame(id_Group).subscribe(
      ((QuestionnairesGame: QuestionnaireGame[]) => {
        this.questionnaireGame = QuestionnairesGame;
        this.getStateOfQuestionnaires();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public getStateOfQuestionnaires() {
    const date = new Date();
    this.activeQuestionnairesGame = [];
    this.deadQuestionnairesGame = [];
    this.programmedQuestionnairesGame = [];
    for (const QuestionarioGame of this.questionnaireGame) {
      const diff = new Date(QuestionarioGame.finish_date).getTime() - date.getTime();
      const diff2 = new Date(QuestionarioGame.start_date).getTime() - date.getTime();
      // tslint:disable-next-line: max-line-length
      QuestionarioGame['str_date'] = new Date(QuestionarioGame.start_date).getDate() + '/' + (new Date(QuestionarioGame.start_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.start_date).getFullYear();
      QuestionarioGame['fnsh_date'] = new Date(QuestionarioGame.finish_date).getDate() + '/' + (new Date(QuestionarioGame.finish_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.finish_date).getFullYear();
      if (diff >= 0) {
        if (diff2 >= 0) {
          this.programmedQuestionnairesGame.push(QuestionarioGame);
        } else {
          this.activeQuestionnairesGame.push(QuestionarioGame);
        }
      } else {
        this.deadQuestionnairesGame.push(QuestionarioGame);
      }
    }
  }
}

