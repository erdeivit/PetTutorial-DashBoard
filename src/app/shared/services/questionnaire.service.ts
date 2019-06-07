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
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getMyQuestionnaires(id: string): Observable<Questionnaire[]> {

    const options = this.utilsService.getOptions();
    const url: string = AppConfig.TEACHER_URL + '/' + id + AppConfig.QUESTIONNAIRES_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Questionnaire.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getQuestionnaireOfQUestionnaireGame(id: string): Observable<Questionnaire> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.QUESTIONNAIRE_URL + '/' + id;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Questionnaire.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
     * Returns the questionnaires with the one level information of the current
     * logged in user into the application
     * @return {Array<Questionnaire>} returns the list of questionnaires
     */
  public getMyQuestions(id: string): Observable<Question[]> {

    const options = this.utilsService.getOptions();
    const url: string = AppConfig.TEACHER_URL + '/' + id + AppConfig.QUESTIONS_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Question.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getQuestionsofQuestionnaire(id: string): Observable<Array<Question>> {
    const ret: Array<Question> = new Array<Question>();
    return Observable.create(observer => {
      this.getQuestionnaire(id).subscribe(
        questionnaire => {
          questionnaire.question.forEach(valueID => {
            this.getQuestion(valueID).subscribe(
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
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getQuestionnaire(id: string): Observable<Questionnaire> {
    const options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    const url: string = AppConfig.QUESTIONNAIRE_URL + '/' + id;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        const questionnaire: Questionnaire = Questionnaire.toObject(response.json());
        this.utilsService.currentQuestionnaire = questionnaire;
        return questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
  * Returns the questionnaires with the one level information of the current
  * logged in user into the application
  * @return {Array<Questionnaire>} returns the list of questionnaires
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
  * Returns the questionnaires with the one level information of the current
  * logged in user into the application
  * @return {Array<Questionnaire>} returns the list of questionnaires
  */
  public getQuestion(id: Question): Observable<Question> {
    const options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    const url: string = AppConfig.QUESTION_URL + '/' + id;
    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        const question: Question = Question.toObject(response.json());
        return question;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
  * Returns the questionnaires with the one level information of the current
  * logged in user into the application
  * @return {Array<Questionnaire>} returns the list of questionnaires
  */
  public getMyQuestionnairesGame(id: string): Observable<QuestionnaireGame[]> {

    const options = this.utilsService.getOptions();
    const url: string = AppConfig.TEACHER_URL + '/' + id + AppConfig.QUESTIONNAIRESGAME_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => QuestionnaireGame.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
    * Returns the questionnaires with the one level information of the current
    * logged in user into the application
    * @return {Array<Questionnaire>} returns the list of questionnaires
    */
  public getGroupQuestionnairesGame(id: string): Observable<QuestionnaireGame[]> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.GROUP_URL + '/' + id + AppConfig.QUESGAME_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => QuestionnaireGame.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * Returns the questionnaires with the one level information of the current
   * logged in user into the application
   * @return {Array<Questionnaire>} returns the list of questionnaires
   */
  public getAllQuestionnaires(): Observable<Array<Questionnaire>> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.QUESTIONNAIRE_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Questionnaire.toObjectArray(response.json()));
  }

  /**
  * Returns the questionnaires with the one level information of the current
  * logged in user into the application
  * @return {Array<Questionnaire>} returns the list of questionnaires
  */

  public saveQuestion(stringData: JSON): Observable<Question> {
    const options = this.utilsService.getOptions();
    let url: string;
    url = AppConfig.QUESTION_URL;
    const postParams = stringData;
    return this.http.post(url, postParams, options)
      .map(response => {
        this.utilsService.currentQuestion = Question.toObject(response.json());
        return Question;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
    * Returns the questionnaires with the one level information of the current
    * logged in user into the application
    * @return {Array<Questionnaire>} returns the list of questionnaires
    */
  public saveQuestionnaire(stringData: JSON): Observable<Questionnaire> {
    const options = this.utilsService.getOptions();
    delete stringData['questionshtml'];
    let url: string;
    url = AppConfig.QUESTIONNAIRE_URL;
    const postParams = stringData;
    return this.http.post(url, postParams, options)
      .map(response => {
        this.utilsService.currentQuestionnaire = Questionnaire.toObject(response.json());
        return Questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
  * Returns the questionnaires with the one level information of the current
  * logged in user into the application
  * @return {Array<Questionnaire>} returns the list of questionnaires
  */
  public saveQuestionnaireGame(stringData: JSON): Observable<QuestionnaireGame> {
    const options = this.utilsService.getOptions();
    let url: string;
    url = AppConfig.QUESTIONNAIREGAME_URL;
    delete stringData['questionnaireshtml'];
    const postParams = stringData;
    return this.http.post(url, postParams, options)
      .map(response => {
        this.utilsService.currentQuestionnaireGame = QuestionnaireGame.toObject(response.json());
        return QuestionnaireGame;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }
}
