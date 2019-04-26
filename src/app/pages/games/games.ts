import { Component, OnInit, Inject } from '@angular/core';
import { Login, Group, Role, Student, QuestionnaireGame, Questionnaire } from '../../shared/models/index';
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
})
export class CreateNewGameComponent {
  public team: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateNewGameComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogCreateNewGame) {
    this.team = false;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public getInformation(id: String) {
    console.log(id);

  }
  public teamMode(boolean: boolean) {
    this.team = boolean;
    console.log(this.team);
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
        width: '700px',
        position: {
          top: '70px',
          right: '300px'
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
        result['teacherId'] = this.utilsService.currentUser.userId;
        result['start_date'] = new Date();
        result['groupId'] = this.groupId;

        this.questionnaireService.saveQuestionnaireGame(result).subscribe(
          (() => {
          }),
          ((error: Response) => {
            this.loadingService.hide();
            this.alertService.show(error.toString());
          }));
        console.log("DESPUES DE RELLENAR MAS CAMPOS");
        console.log(result);
        this.getMyQuestionnairesGame();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.router.navigate([this.returnUrl, this.groupId]);
      }


    });

  }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.loadingService.show();

    this.getMyQuestionnaires();
    this.getMyQuestionnairesGame();
    /*
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/groupStudents';


    if (this.utilsService.role === Role.TEACHER || this.utilsService.role === Role.STUDENT) {
      if (this.utilsService.role === Role.TEACHER) { this.isTeacher = true; }
      this.loadingService.show();
      this.groupService.getMyGroups().subscribe(
        ((groups: Array<Group>) => {
          this.groups = groups.sort((n1, n2) => +n1.id - +n2.id);
          this.loadingService.hide();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    }
    */
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

  public getMyQuestionnairesGame() {
    this.questionnaireService.getMyQuestionnairesGame(this.utilsService.currentUser.userId).subscribe(
      ((QuestionnairesGame: QuestionnaireGame[]) => {
        this.questionnaireGame = QuestionnairesGame;
        console.log(this.questionnaireGame);
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

}

