//Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe, DecimalPipe } from '@angular/common';

//Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Pipes and Directives
import { FilteringPipe } from '../directives-and-pipes/filtering.pipe';
import { HighlightDirective } from '../directives-and-pipes/highlight.directive';
import { MinuteSecondsPipe } from '../directives-and-pipes/seconds-to-time.pipe';
import { SortPipe } from '../directives-and-pipes/sort.pipe';
import { FileSizePipe } from '../directives-and-pipes/filesizeToMB.pipe';
import { BmiPipe } from '../directives-and-pipes/bmi.pipe';
import { WeightInPoundsPipe } from '../directives-and-pipes/weight-in-pounds.pipe';
import { TextAbbrPipe } from '../directives-and-pipes/text-abbr.pipe';
import { ReversePipe } from '../directives-and-pipes/reverse-array.pipe';
import { MyFilterPipe } from '../directives-and-pipes/filter-array.pipe';
import { AgePipe } from '../directives-and-pipes/age.pipe';
import { PipeFunction } from '../directives-and-pipes/pipe-function-context';
import { CtrlADetectorDirective } from '../directives-and-pipes/controlp.directive';
import { MomentPipe } from '../directives-and-pipes/moment.pipe';
import { NumberToWordsPipe } from '../directives-and-pipes/number-to-words.pipe';
import { AgeinyearsPipe } from '../directives-and-pipes/ageinyears.pipe';
import { AutofocusDirective } from '../directives-and-pipes/autofocus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AutofocusDirective,
    HighlightDirective,
    CtrlADetectorDirective,
    FilteringPipe,
    MinuteSecondsPipe,
    SortPipe,
    WeightInPoundsPipe,
    FileSizePipe,
    BmiPipe,
    TextAbbrPipe,
    ReversePipe,
    MyFilterPipe,
    AgePipe,
    PipeFunction,
    MomentPipe,
    NumberToWordsPipe,
    AgeinyearsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    CommonModule,
    MatSnackBarModule,
    AutofocusDirective,
    HighlightDirective,
    CtrlADetectorDirective,
    FilteringPipe,
    MinuteSecondsPipe,
    SortPipe,
    WeightInPoundsPipe,
    FileSizePipe,
    BmiPipe,
    TextAbbrPipe,
    ReversePipe,
    MyFilterPipe,
    AgePipe,
    PipeFunction,
    MomentPipe,
    NumberToWordsPipe,
    AgeinyearsPipe
  ],
  providers: [
    TitleCasePipe,
    AgePipe,
    DecimalPipe
  ]
})
export class AppSharedModule { }
