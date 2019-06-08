import { Component, OnInit } from '@angular/core';
import { Login, QuestionnaireGame, ResultQuestionnaire } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { LoadingService, UtilsService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gamesresult',
  templateUrl: './gamesResult.html',
  styleUrls: ['./gamesResult.scss']
})
export class GamesResultComponent implements OnInit {
  public groupId: string;
  public questionnairesGame: Array<QuestionnaireGame> = [];
  public sub: {};
  public resultQuestionnaires: Array<ResultQuestionnaire> = [];
  public teacherResults: Array<ResultQuestionnaire> = [];
  public selectQuestionnaires: Array<ResultQuestionnaire> = [];
  constructor(
    public route: ActivatedRoute,
    public alertService: AlertService,
    public utilsService: UtilsService,
    public loadingService: LoadingService,
    public questionnaireService: QuestionnaireService) {
    this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
    this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
  }

  /**
     * FIRST METHOD THAT IS FIRED WHEN ENTER TO THE COMPONENT
     */
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.getGroupQuestionnairesGame(this.groupId);
    this.getResultsOfQuestionnaires();
  }

  public getResultsOfQuestionnaires() {
    this.questionnaireService.getResults().subscribe(
      ((resultQuestionnaire: ResultQuestionnaire[]) => {
        this.resultQuestionnaires = resultQuestionnaire;
        for (const result of this.resultQuestionnaires) {
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

  public getGroupQuestionnairesGame(idGroup: string) {
    this.questionnaireService.getGroupQuestionnairesGame(idGroup).subscribe(
      ((QuestionnairesGame: QuestionnaireGame[]) => {
        this.questionnairesGame = QuestionnairesGame;
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  public selectQuestionnaire(nameOfQuestionnaire: string) {
    this.selectQuestionnaires = [];
    for (const quest of this.teacherResults) {
      if (quest.questionnaireGame.name === nameOfQuestionnaire) {
        this.selectQuestionnaires.push(quest);
      }
    }
  }
}

