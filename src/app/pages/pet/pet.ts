import { Component, OnInit } from '@angular/core';
import { Pet } from '../../shared/models/index';
import { UtilsService, AlertService, PetService } from '../../shared/services/index';
import { LoadingService } from '../../shared/services/index';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.html',
  styleUrls: ['./pet.scss']
})
export class PetComponent implements OnInit {
  public mascotas: Array<Pet>;
  public mascota: Pet;
  constructor(
    public alertService: AlertService,
    public utilsService: UtilsService,
    public petService: PetService,
    public loadingService: LoadingService, ) {
  }
  /**
       * FIRST METHOD THAT IS FIRED WHEN ENTER TO THE COMPONENT
       */
  ngOnInit(): void {
    console.log("ENTRA");
    this.loadingService.show();
    this.petService.getPets(this.utilsService.currentUser.userId).subscribe(
      ((pet: Pet) => {
        this.mascota = pet;
        this.loadingService.hide();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));

  }
}
