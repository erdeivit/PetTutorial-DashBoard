import { Component, OnInit, Inject } from '@angular/core';
import { Login, Group, Role, Student, QuestionnaireGame, Questionnaire, ResultQuestionnaire } from '../../shared/models/index';
import { AppConfig } from '../../app.config';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../shared/services/index';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-gamesresult',
  templateUrl: './gamesResult.html',
  styleUrls: ['./gamesResult.scss']
})
export class GamesResultComponent implements OnInit {
  public returnUrl: string;
  public groupId: string;
  public questionnaireGame: Array<QuestionnaireGame>
  public sub: {};
  public resultQuestionnaire: Array<ResultQuestionnaire>;
  public teacherResults: Array<ResultQuestionnaire>;
  public selectedQuestionnaire: Array<ResultQuestionnaire>;

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

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.teacherResults = [];
    this.selectedQuestionnaire = [];
    this.getGroupQuestionnairesGame(this.groupId);
    this.getResults();
  }

  public getResults() {
    this.questionnaireService.getResults().subscribe(
      ((resultQuestionnaire: ResultQuestionnaire[]) => {
        this.resultQuestionnaire = resultQuestionnaire;
        for (let result of this.resultQuestionnaire) {
          if (parseInt(result.questionnaireGame.teacherId, 10) === this.utilsService.currentUser.userId) {
            console.log(result);
            this.teacherResults.push(result);
          }
        }
        console.log(this.teacherResults);
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
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }
  public seleccionarcuestionario(name: string) {
    this.selectedQuestionnaire = [];
    for (let quest of this.teacherResults) {
      if (quest.questionnaireGame.name === name) {
        this.selectedQuestionnaire.push(quest);
      }
    }
    console.log(this.selectedQuestionnaire);
  }
}

