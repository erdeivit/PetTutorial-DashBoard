import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Login, Group, Role, Questionnaire, Question, QuestionnaireGame } from '../../../shared/models/index';
import { AppConfig } from '../../../app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService, UtilsService, GroupService, AlertService, QuestionnaireService } from '../../../shared/services/index';
//import { DeleteQuestionnaireComponent } from '../../pages/deleteQuestionnaire/deleteQuestionnaire';
//import { CreateQuestionnaireComponent } from '../../pages/createQuestionnaire/createQuestionnaire';


@Component({
  selector: 'app-create_questionnaire',
  templateUrl: './create_questionnaire.html',
  styleUrls: ['./create_questionnaire.scss']
})
export class CreateQuestionnaireComponent implements OnInit {

  public questionnaireGame: Array<QuestionnaireGame>;
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

  public ngOnInit(): void {


  }
}
