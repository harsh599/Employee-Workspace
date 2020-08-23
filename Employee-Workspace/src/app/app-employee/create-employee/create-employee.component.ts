import { Component, OnInit, Optional, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AppSnackbarService } from 'src/app/services/app-snackbar.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  // @Input() showLinktoSettings: boolean = true;
  disableSubmit: boolean = true;
  @Output() addedEmployeeInfo: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private apiService: ApiService,
    private snackBar: AppSnackbarService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.initializeForm();
    if (this.data && this.data.value) {
      this.disableSubmit = true;
      this.employeeForm.get('name').disable();
      this.employeeForm.get('gender').disable();
      this.employeeForm.patchValue({ name: this.data.value.name, gender: this.data.value.gender, email: this.data.value.email, project: this.data.value.project });
    }
    this.registerValueChanges();
  }

  registerValueChanges() {
    this.employeeForm.valueChanges.subscribe(
      (response) => {
        if (response) {
          this.disableSubmit = false;
        }
      }
    );
  }

  initializeForm() {
    this.employeeForm = new FormGroup({
      "name": new FormControl(null, [Validators.required]),
      "email": new FormControl(null, [Validators.email]),
      "project": new FormControl(null),
      "gender": new FormControl(null, [Validators.required]),
    });
  }

  submitForm(formDirective: FormGroupDirective) {
    const name = this.employeeForm.get('name').value;
    const email = this.employeeForm.get('email').value;
    const project = this.employeeForm.get('project').value;
    const gender = this.employeeForm.get('gender').value;
    const BODY =
    {
      name: name,
      gender: gender,
      email: email,
      project: project,
    }
    if (this.data && this.data.value) {//executed when same component is reused as an update employee
      const UPDATED_EMPLOYEE = {
        id: this.data.value.id,
        name: name,
        gender: gender,
        email: email,
        project: project,
      };
      this.apiService.updateEmployee(this.data.value.id, BODY).subscribe(
        (response) => {
          if (response && response.statusCode == 201) {
            this.snackBar.openSnackBar("Employee Details updated Successfully!!");
            this.dialogRef.close(UPDATED_EMPLOYEE);
          } else {
            this.snackBar.openSnackBar("Employee Details failed to get Updated!!");
          }
        }
      );
    } else {//executed when component is used as an add new employee

      this.apiService.saveEmployee(BODY).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            const EMIT_DATA = {
              id: response.data.id,
              name: name,
              gender: gender,
              email: email,
              project: project,
            }
            this.addedEmployeeInfo.emit(EMIT_DATA);
            this.snackBar.openSnackBar("Employee Added Successfully!!");
            formDirective.resetForm();
            this.employeeForm.reset();
            this.disableSubmit = true;
          }
          else {
            this.disableSubmit = false;

            this.snackBar.openSnackBar("Employee Failed to get added!!");
          }
        }
      );
    }

  }

  onClose() {
    this.dialogRef.close('closed');
  }

}
