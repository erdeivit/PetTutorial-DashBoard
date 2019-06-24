import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';
import { AppConfig } from '../../app.config';
import { Pet } from '../models/pet';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class PetService {
  constructor(
    public http: Http,
    public translateService: TranslateService,
    public utilsService: UtilsService) {
  }

  /**
   * Returns the pet of the student
   * @return {Pet}
   */
  public getPets(idStudent: number): Observable<Pet> {
    const options = this.utilsService.getOptions();
    const url: string = AppConfig.STUDENT_URL + '/' + idStudent + AppConfig.PET_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Pet.toObject(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
}
