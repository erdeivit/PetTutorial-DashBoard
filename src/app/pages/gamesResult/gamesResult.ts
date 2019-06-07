import { Component, OnInit } from '@angular/core';
import { Login, QuestionnaireGame, ResultQuestionnaire } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-gamesresult',
  templateUrl: './gamesResult.html',
  styleUrls: ['./gamesResult.scss']
})
export class GamesResultComponent implements OnInit {
  public returnUrl: string;
  public groupId: string;
  public questionnaireGame: Array<QuestionnaireGame> = [];
  public sub: {};
  public resultQuestionnaire: Array<ResultQuestionnaire> = [];
  public teacherResults: Array<ResultQuestionnaire> = [];
  public selectedQuestionnaire: Array<ResultQuestionnaire> = [];
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
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
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
        for (const result of this.resultQuestionnaire) {
          if (parseInt(result.questionnaireGame.teacherId, 10) === this.utilsService.currentUser.userId) {
            this.teacherResults.push(result);
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
  public getGroupQuestionnairesGame(id: string) {
    this.questionnaireService.getGroupQuestionnairesGame(id).subscribe(
      ((QuestionnairesGame: QuestionnaireGame[]) => {
        this.questionnaireGame = QuestionnairesGame;
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
  public seleccionarcuestionario(name: string) {
    this.selectedQuestionnaire = [];
    for (const quest of this.teacherResults) {
      if (quest.questionnaireGame.name === name) {
        this.selectedQuestionnaire.push(quest);
      }
    }
  }
}

