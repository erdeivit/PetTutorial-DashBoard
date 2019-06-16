import { NgModule } from '@angular/core';
import {
  MatSlideToggleModule, MatTabsModule, MatFormFieldModule,
  MatToolbarModule, MatInputModule, MatButtonModule,
  MatMenuModule, MatSelectModule, MatCardModule,
  MatGridListModule, MatProgressSpinnerModule, MatProgressBarModule,
  MatSnackBarModule, MatListModule, MatIconModule,
  MatAutocompleteModule, MatSortModule,
  MatPaginatorModule, MatDatepickerModule, MatNativeDateModule,
  MatExpansionModule, MatRadioModule, MatStepperModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatFormFieldModule,
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
    MatStepperModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  exports: [
    MatFormFieldModule,
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
    MatStepperModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
})
export class AppMaterialModule { }
