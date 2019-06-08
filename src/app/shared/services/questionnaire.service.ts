import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';
import { AppConfig } from '../../app.config';
import { Question } from '../models/question';
import { Questionnaire } from '../models/questionnaire';
import { QuestionnaireGame } from '../models/questionnaireGame';
import { ResultQuestionnaire } from '../models/resultQuestionnaire';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class QuestionnaireService {
  constructor(
    public http: Http,
    public translateService: TranslateService,
    public utilsService: UtilsService) {
  }

  /**
   * Returns the questionnaires of the teacher
   * @return {Array<Questionnaire>}
   */
  public getTeacherQuestionnaires(idTeacher: string): Observable<Questionnaire[]> {

    const options = this.utilsService.getOptions();
    const url: string = AppConfig.TEACHER_URL + '/' + idTeacher + AppConfig.QUESTIONNAIRES_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Questionnaire.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * Returns the questionnaire of the selected uestionnaireGame
   * @return {<Questionnaire>
   */
  public getQuestionnaireOfQUestionnaireGame(idQuestionnaire: string): Observable<Questionnaire> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.QUESTIONNAIRE_URL + '/' + idQuestionnaire;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Questionnaire.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
     * Returns all the questions of the teacher
     * @return {Array<Question>}
     */
  public getTeacherQuestions(idTeacher: string): Observable<Question[]> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.TEACHER_URL + '/' + idTeacher + AppConfig.QUESTIONS_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Question.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
   * Returns all the questions of the selected questionnaire
   * @return {Array<Question>}
   */
  public getQuestionsofQuestionnaire(idQuestionnaire: string): Observable<Array<Question>> {
    const ret: Array<Question> = new Array<Question>();
    return Observable.create(observer => {
      this.getQuestionnaire(idQuestionnaire).subscribe(
        questionnaire => {
          questionnaire.question.forEach(idQuestion => {
            this.getQuestion(idQuestion.id).subscribe(
              question => {
                ret.push(question);
                observer.next(ret);
                observer.complete();
              }, error => observer.error(error));
          });
        }, error => observer.error(error)
      );
    });
  }

  /**
   * Returns the information of the questionnaire selected
   * @return {<Questionnaire>} returns the list of questionnaires
   */
  public getQuestionnaire(idQuestionnaire: string): Observable<Questionnaire> {
    const options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    const url: string = AppConfig.QUESTIONNAIRE_URL + '/' + idQuestionnaire;
    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        const questionnaire: Questionnaire = Questionnaire.toObject(response.json());
        this.utilsService.currentQuestionnaire = questionnaire;
        return questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
  * Returns all the results of resultsQuestionnaire
  * @return {Array<ResultQuestionnaire>}
  */
  public getResults(): Observable<ResultQuestionnaire[]> {
    const options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    const url: string = AppConfig.RESULTQUESTIONNAIRE_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => ResultQuestionnaire.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
  * Returns the information of a question
  * @return {Array<Question>}
  */
  public getQuestion(idQuestion: string): Observable<Question> {
    const options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    const url: string = AppConfig.QUESTION_URL + '/' + idQuestion;
    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        const question: Question = Question.toObject(response.json());
        return question;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
  * Returns all the QuestionnairesGame of a teacher
  * @return {Array<QuestionnaireGame>}
  */
  public getTeacherQuestionnairesGame(idTeacher: string): Observable<QuestionnaireGame[]> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.TEACHER_URL + '/' + idTeacher + AppConfig.QUESTIONNAIRESGAME_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => QuestionnaireGame.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
    * Returns the questionnairesGame of a selected group
    * @return {Array<QuestionnaireGame>} returns the list of questionnaires
    */
  public getGroupQuestionnairesGame(idGroup: string): Observable<QuestionnaireGame[]> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.GROUP_URL + '/' + idGroup + AppConfig.QUESGAME_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => QuestionnaireGame.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
  * Save a Question in the BBDD
  * @return {<Question>}
  */
  public saveQuestion(questionJSON: JSON): Observable<Question> {
    const options = this.utilsService.getOptions();
    let url: string;
    url = AppConfig.QUESTION_URL;
    const postParams = questionJSON;
    return this.http.post(url, postParams, options)
      .map(response => {
        this.utilsService.currentQuestion = Question.toObject(response.json());
        return Question;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
    * Save a Questionnaire in the BBDD
    * @return {<Questionnaire>}
    */
  public saveQuestionnaire(QuestionnaireJSON: JSON): Observable<Questionnaire> {
    const options = this.utilsService.getOptions();
    delete QuestionnaireJSON['questionshtml'];
    let url: string;
    url = AppConfig.QUESTIONNAIRE_URL;
    const postParams = QuestionnaireJSON;
    return this.http.post(url, postParams, options)
      .map(response => {
        this.utilsService.currentQuestionnaire = Questionnaire.toObject(response.json());
        return Questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
  * Save a QuestionnaireGame in the BBDD
  * @return {<QuestionnaireGame>}
  */
  public saveQuestionnaireGame(questionnaireGameJSON: JSON): Observable<QuestionnaireGame> {
    const options = this.utilsService.getOptions();
    let url: string;
    url = AppConfig.QUESTIONNAIREGAME_URL;
    delete questionnaireGameJSON['questionnaireshtml'];
    const postParams = questionnaireGameJSON;
    return this.http.post(url, postParams, options)
      .map(response => {
        this.utilsService.currentQuestionnaireGame = QuestionnaireGame.toObject(response.json());
        return QuestionnaireGame;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
}
