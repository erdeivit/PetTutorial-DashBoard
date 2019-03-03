
export class Question {

  private _statement: string;
  private _id: string;
  private _answer: (string | boolean); // DEFINIR UN ARRAY DE DOS TIPOS DE DATOS.
  private _image: string;
  private _difficulty: string;
  private _category: string;
  private _explanation: string;

  constructor(id?: string, statement?: string, answer?: (string | boolean), image?: string, difficulty?: string, category?: string,
    explanation?: string) {
    this._id = id;
    this._statement = statement;
    this._answer = answer;
    this._image = image;
    this._difficulty = difficulty;
    this._category = category;
    this._explanation = explanation;
  }

  /* tslint:disable */
  static toObject(object: any): Question {
    /* tslint:enable */
    let result: Question = new Question();
    if (object != null) {
      result.id = object.id;
      result.statement = object.statement;
      result.answer = object.name;
      result.image = object.image;
      result.difficulty = object.difficulty;
      result.category = object.category;
      result.explanation = object.explanation;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Question> {
    /* tslint:enable */
    let resultArray: Array<Question> = new Array<Question>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Question.toObject(object[i]));
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

  public get statement(): string {
    return this._statement;
  }

  public set statement(value: string) {
    this._statement = value;
  }

  public get answer(): (string | boolean) {
    return this._answer;
  }

  public set answer(value: (string | boolean)) {
    this._answer = value;
  }

  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }
  public get difficulty(): string {
    return this._difficulty;
  }

  public set difficulty(value: string) {
    this._difficulty = value;
  }
  public get category(): string {
    return this._category;
  }

  public set category(value: string) {
    this._category = value;
  }
  public get explanation(): string {
    return this._explanation;
  }

  public set explanation(value: string) {
    this._explanation = value;
  }
}
