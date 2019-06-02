import { QuestionnaireGame } from './questionnaireGame';

export class ResultQuestionnaire {

  private _questionnaireGame: QuestionnaireGame;
  private _numAnswerCorrect: string;
  private _numAnswerNoCorrect: string;
  private _finalNote: string;
  private _userAnswers: Array<string>;
  private _studentId: string;
  private _numTotalOfQuestions: number;


  constructor(questionnaireGame?: QuestionnaireGame, numAnswerCorrect?: string, numAnswerNoCorrect?:
    string, finalNote?: string, userAnswers?: Array<string>, studentId?: string, numTotalOfQuestions?: number) {
    this._questionnaireGame = questionnaireGame;
    this._numAnswerCorrect = numAnswerCorrect;
    this._numAnswerNoCorrect = numAnswerNoCorrect;
    this._finalNote = finalNote;
    this._userAnswers = userAnswers;
    this._studentId = studentId;
    this._numTotalOfQuestions = numTotalOfQuestions;
  }

  /* tslint:disable */
  static toObject(object: any): ResultQuestionnaire {
    /* tslint:enable */
    let result: ResultQuestionnaire = new ResultQuestionnaire();
    if (object != null) {
      result.questionnaireGame = object.questionnaireGame;
      result.numAnswerCorrect = object.numAnswerCorrect;
      result.numAnswerNoCorrect = object.numAnswerNoCorrect;
      result.finalNote = object.finalNote;
      result.userAnswers = object.userAnswers;
      result.studentId = object.studentId;
      result.numTotalOfQuestions = object.numTotalOfQuestions;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<ResultQuestionnaire> {
    /* tslint:enable */
    let resultArray: Array<ResultQuestionnaire> = new Array<ResultQuestionnaire>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(ResultQuestionnaire.toObject(object[i]));
      }
    }
    return resultArray;
  }

  public get questionnaireGame(): QuestionnaireGame {
    return this._questionnaireGame;
  }

  public set questionnaireGame(value: QuestionnaireGame) {
    this._questionnaireGame = value;
  }
  public get numAnswerCorrect(): string {
    return this._numAnswerCorrect;
  }

  public set numAnswerCorrect(value: string) {
    this._numAnswerCorrect = value;
  }
  public get numAnswerNoCorrect(): string {
    return this._numAnswerNoCorrect;
  }

  public set numAnswerNoCorrect(value: string) {
    this._numAnswerNoCorrect = value;
  }
  public get finalNote(): string {
    return this._finalNote;
  }

  public set finalNote(value: string) {
    this._finalNote = value;
  }
  public get studentId(): string {
    return this._studentId;
  }

  public set studentId(value: string) {
    this._studentId = value;
  }

  public get userAnswers(): Array<string> {
    return this._userAnswers;
  }

  public set userAnswers(value: Array<string>) {
    this._userAnswers = value;
  }
  public get numTotalOfQuestions(): number {
    return this._numTotalOfQuestions;
  }

  public set numTotalOfQuestions(value: number) {
    this._numTotalOfQuestions = value;
  }


}
