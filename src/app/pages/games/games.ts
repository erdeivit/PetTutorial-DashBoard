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
  public team = false;
  public questiontime = false;
  public questionnairetime = false;
  public selectime = false;
  constructor(
    public dialogRef: MatDialogRef<CreateNewGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateNewGame) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public teamModeSelect(boolean: boolean) {
    this.team = boolean;
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
  public returnUrl: string = this.route.snapshot.queryParams['returnUrl'];
  public groupId: string;
  public students: Array<Student>;
  public sub: {};
  public questionnaireGame: Array<QuestionnaireGame> = [];
  public questionnaires: Array<Questionnaire>;
  public activeQuestionnaireGame: Array<QuestionnaireGame> = [];
  public deadQuestionnaireGame: Array<QuestionnaireGame> = [];
  public programmedQuestionnaireGame: Array<QuestionnaireGame> = [];
  public questionnaire: Questionnaire;
  public resultQuestionnaire: Array<ResultQuestionnaire>;
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

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
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
        this.questionnaireService.saveQuestionnaireGame(result).subscribe(
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
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.loadingService.show();
    this.getMyQuestionnaires();
    this.getGroupQuestionnairesGame(this.groupId);
    this.getResults();
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getResults() {
    this.questionnaireService.getResults().subscribe(
      ((resultQuestionnaire: ResultQuestionnaire[]) => {
        this.resultQuestionnaire = resultQuestionnaire;
        if (this.resultQuestionnaire.length > 0) {
          for (const result of this.resultQuestionnaire) {
            if (result.questionnaireGame.groupId === this.groupId) {
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

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getInformation(id: string) {
    this.getQuestionnaireOfQUestionnaireGame(id);
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public ShowResults() {
    this.returnUrl = this.route.snapshot.url.join('/') + '/showResult';
    this.router.navigate([this.returnUrl]);
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getQuestionnaireOfQUestionnaireGame(id: string) {
    this.questionnaireService.getQuestionnaireOfQUestionnaireGame(id).subscribe(
      ((valueQuestionnaire: Questionnaire) => {
        this.questionnaire = valueQuestionnaire;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getMyQuestionnaires() {
    this.questionnaireService.getMyQuestionnaires(String(this.utilsService.currentUser.userId)).subscribe(
      ((Questionnaires: Questionnaire[]) => {
        this.questionnaires = Questionnaires;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  /**
     * Returns the questionnaires with the one level information of the current
     * logged in user into the application
     * @return {Array<Questionnaire>} returns the list of questionnaires
     */
  public getGroupQuestionnairesGame(id: string) {
    this.questionnaireService.getGroupQuestionnairesGame(id).subscribe(
      ((QuestionnairesGame: QuestionnaireGame[]) => {
        this.questionnaireGame = QuestionnairesGame;
        this.getActivos();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getActivos() {
    const date = new Date();
    this.activeQuestionnaireGame = [];
    this.deadQuestionnaireGame = [];
    this.programmedQuestionnaireGame = [];
    for (const QuestionarioGame of this.questionnaireGame) {
      const diff = new Date(QuestionarioGame.finish_date).getTime() - date.getTime();
      const diff2 = new Date(QuestionarioGame.start_date).getTime() - date.getTime();
      // tslint:disable-next-line: max-line-length
      QuestionarioGame['str_date'] = new Date(QuestionarioGame.start_date).getDate() + '/' + (new Date(QuestionarioGame.start_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.start_date).getFullYear();
      QuestionarioGame['fnsh_date'] = new Date(QuestionarioGame.finish_date).getDate() + '/' + (new Date(QuestionarioGame.finish_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.finish_date).getFullYear();
      if (diff >= 0) {
        if (diff2 >= 0) {
          this.programmedQuestionnaireGame.push(QuestionarioGame);
        } else {
          this.activeQuestionnaireGame.push(QuestionarioGame);
        }
      } else {
        this.deadQuestionnaireGame.push(QuestionarioGame);
      }
    }
  }
}

