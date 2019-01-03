import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {MatSlideToggleModule, MatTabsModule,
  MatToolbarModule, MatInputModule, MatButtonModule, MatMenuModule,
  MatSelectModule, MatCardModule, MatGridListModule, MatProgressSpinnerModule,
  MatProgressBarModule, MatSnackBarModule, MatListModule, MatIconModule, MatAutocompleteModule,MatDatepickerModule,
  MatNativeDateModule, MatExpansionModule,
  MatRadioModule, MatStepperModule
=======
import {
  MatSlideToggleModule, MatTabsModule,
  MatFormFieldModule, MatToolbarModule, MatInputModule, MatButtonModule, MatMenuModule,
  MatSelectModule, MatCardModule, MatGridListModule, MatProgressSpinnerModule,
  MatProgressBarModule, MatSnackBarModule, MatListModule, MatIconModule, MatAutocompleteModule, MatTableModule
>>>>>>> f691e2abc3c6555394436b2cc444995653e1f1b8
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    RouterModule,
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatRadioModule,
    MatStepperModule
  ],
  exports: [
    MatTabsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    RouterModule,
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    MatStepperModule
  ],
})
export class AppMaterialModule { }
