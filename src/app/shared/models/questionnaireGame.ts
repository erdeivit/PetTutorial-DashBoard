import { Questionnaire } from './questionnaire';
import { Student } from './student';
import { Teacher } from './teacher';

export class QuestionnaireGame {

  private _id: string;
  private _name: string;
  private _start_date: Date;
  private _finish_date: Date;
  private _question_time: number;
  private _questionnaire_time: number;
  private _results: [];
  private _points: [];
  private _prizes: [];
  private _student: Student[];
  private _teacher: Teacher;
  private _questionnaire: Questionnaire;


  constructor(id?: string, name?: string, start_date?: Date, finish_date?: Date, question_time?: number, questionnaire_time?: number,
    results?: [], points?: [], prizes?: []) {
    this._id = id;
    this._name = name;
    this._start_date = start_date;
    this._finish_date = finish_date;
    this._question_time = question_time;
    this._questionnaire_time = questionnaire_time;
    this._results = results;
    this._points = points;
    this._prizes = prizes;
  }

  /* tslint:disable */
  static toObject(object: any): QuestionnaireGame {
    /* tslint:enable */
    let result: QuestionnaireGame = new QuestionnaireGame();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.start_date = object.start_date;
      result.finish_date = object.finish_date;
      result.question_time = object.question_time;
      result.questionnaire_time = object.questionnaire_time;
      result.results = object.results;
      result.points = object.points;
      result.prizes = object.prizes;
      result.student = object.student;
      result.teacher = object.teacher;
      result.questionnaire = object.questionnaire;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<QuestionnaireGame> {
    /* tslint:enable */
    let resultArray: Array<QuestionnaireGame> = new Array<QuestionnaireGame>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(QuestionnaireGame.toObject(object[i]));
      }
    }
    return resultArray;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get start_date(): Date {
    return this._start_date;
  }

  public set start_date(value: Date) {
    this._start_date = value;
  }
  public get finish_date(): Date {
    return this._finish_date;
  }

  public set finish_date(value: Date) {
    this._finish_date = value;
  }
  public get question_time(): number {
    return this._question_time;
  }

  public set question_time(value: number) {
    this._question_time = value;
  }
  public get questionnaire_time(): number {
    return this._questionnaire_time;
  }

  public set questionnaire_time(value: number) {
    this._questionnaire_time = value;
  }
  public get results(): [] {
    return this._results;
  }

  public set results(value: []) {
    this._results = value;
  }
  public get points(): [] {
    return this._points;
  }

  public set points(value: []) {
    this._points = value;
  }
  public get prizes(): [] {
    return this._prizes;
  }

  public set prizes(value: []) {
    this._prizes = value;
  }
  public get student(): Student[] {
    return this._student;
  }

  public set student(value: Student[]) {
    this._student = value;
  }
  public get teacher(): Teacher {
    return this._teacher;
  }

  public set teacher(value: Teacher) {
    this._teacher = value;
  }
  public get questionnaire(): Questionnaire {
    return this._questionnaire;
  }

  public set questionnaire(value: Questionnaire) {
    this._questionnaire = value;
  }
}
