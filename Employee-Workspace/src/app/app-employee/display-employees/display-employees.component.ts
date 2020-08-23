import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AppSnackbarService } from 'src/app/services/app-snackbar.service';
import { Subscription } from 'rxjs';

export interface employeeDetails{
  id:number,
  name:string,
  email:string,
  gender:string,
  project:string,
}

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
export class DisplayEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'project', 'name', 'email','gender','action','actions'];
    dataSource: MatTableDataSource<employeeDetails>;
    employeeData:employeeDetails[] = [];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;
    show:boolean = false;
    busy:Subscription;
    constructor(private dialog: MatDialog,private apiService: ApiService,private snackBar:AppSnackbarService,) {
    }

    ngOnInit() {
      this.getApiData();
    }

    getApiData(){
    this.busy = this.apiService.getAllEmployee().subscribe(
        (response)=>{
          if(response.statusCode == 200 && response.data.employees.length > 0){
            for(let i = 0; i < response.data.employees.length; i++){
              this.employeeData[i]={
                id:response.data.employees[i].id,
                name:response.data.employees[i].name,
                gender:response.data.employees[i].gender,
                project:response.data.employees[i].project,
                email:response.data.employees[i].email,
              };
            }
            this.dataSource = new MatTableDataSource( this.employeeData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      );
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    onShow()
    {
      this.show = !this.show;
    }

    onAddEmployee(event:employeeDetails){
      // console.warn(event);
      this.employeeData.push(event);
      this.dataSource = new MatTableDataSource( this.employeeData);
      if (this.table) {
        this.table.renderRows();
      }
      // console.warn(this.dataSource.data);
    }

    onUpdate(rowData:employeeDetails,index:string){
      console.log(rowData);
      console.log(index);
      const dialogRef = this.dialog.open(CreateEmployeeComponent, {
        width: '1000',
        height: '500',
        data: {
          value: rowData,
          index: index,
        },
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.warn(result);
        console.log(this.dataSource.data);
        if(result && result != 'closed'){
          let index = this.dataSource.data.findIndex(x=> x.id == result.id);
          console.log(index);
          if(index != -1){
            this.dataSource.data[index]["email"] = result.email;
            this.dataSource.data[index]["project"] = result.project;

          }
        }

      });
    }

    removeEmployee(rowData:employeeDetails){
      this.apiService.deleteEmployeeById(rowData.id).subscribe(
        (response)=>{
          if(response.statusCode == 201){
            this.snackBar.openSnackBar("Employee Removed Successfully!!");
            let removeIndex = this.dataSource.data.findIndex((x)=>x.id === rowData.id);
            if(removeIndex != -1){
              this.dataSource.data.splice(removeIndex,1);
              let tempData = [];
              tempData = this.dataSource.data;
              this.dataSource.data = [];
              this.dataSource.data = tempData;
            }
            if(this.table){
              this.table.renderRows();
            }
          }
          else{
            this.snackBar.openSnackBar("Employee Failed to get Removed!!");
          }
        }
      );
    }

}
