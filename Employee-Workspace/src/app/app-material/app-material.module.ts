import { NgModule } from '@angular/core';

// Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatChipsModule,
    MatListModule,
    MatStepperModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSlideToggleModule,
    DragDropModule
    // MatBadgeModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatToolbarModule,
  ],
  exports: [
    MatDatepickerModule,
    MatChipsModule,
    MatListModule,
    MatStepperModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatSlideToggleModule,
    DragDropModule
    // MatBadgeModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatToolbarModule,
  ]
})

export class AppMaterialModule { }
