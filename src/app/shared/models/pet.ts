export class Pet {

  private _id: string;
  private _name: string;
  private _image: string;
  private _studentId: number;

  constructor(id?: string, name?: string, image?: string, studentId?: number) {
    this._id = id;
    this._name = name;
    this._image = image;
    this._studentId = studentId;
  }

  /* tslint:disable */
  static toObject(object: any): Pet {
    /* tslint:enable */
    const result: Pet = new Pet();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.image = object.image;
      result.studentId = object.studentId;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Pet> {
    /* tslint:enable */
    const resultArray: Array<Pet> = new Array<Pet>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Pet.toObject(object[i]));
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

  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }

  public get studentId(): number {
    return this._studentId;
  }

  public set studentId(value: number) {
    this._studentId = value;
  }

}
