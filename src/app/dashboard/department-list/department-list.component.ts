import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/shared/models/department.model';
import { DepartmentService } from 'src/app/shared/services/department-service.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'edit'];
  dataSource : MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  constructor(private departmentService: DepartmentService) {}
  departMentName : string = '';
  ngOnInit(): void {
    this.loadDepartments();
    this.editForm = new FormGroup({
      edit : new FormControl('')
    })
  }
  ngAfterViewInit() { }
   loadDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(
        (resp : any) => {
          this.dataSource = new MatTableDataSource<any>(resp);
          this.dataSource.paginator = this.paginator;
        }),
        (err : any) => {console.log(err)};
  }
  addDept(){
    if(this.departMentName){
      this.departmentService.addDepartments(this.departMentName).subscribe(
        (res)=>{alert(res.msg)},
        (err)=>{alert(err)}  
      )
      this.departMentName = '';
      this.loadDepartments();
    }
  }
  editForm : FormGroup | any;
  editData(id : any){
    // console.log(id)
    localStorage.setItem('nameId', id)
    this.departmentService.getDepartments().subscribe((arr)=>{
      arr.forEach((ele : any)=>{
        if(ele.id == id){
          this.editForm.setValue({
            edit : ele.name
          })
        }
      })
    })
  }
  updateName(){
    let getId = localStorage.getItem('nameId')
    // console.log(getId)
    const updatedData = {dId : getId, name : this.editForm.value.edit}
    this.departmentService.updateDepartmentName(updatedData).subscribe((data : any)=>{
      console.log(data)
      alert(data.msg)
    })
    this.loadDepartments()
  }
  importCSV(fileInput: any) {
    const file = fileInput.target.files[0];

    if (file) {
      this.departmentService.importDepartmentsFromCSV(file)
        .subscribe(
          response => {
            console.table('CSV imported:', response);
            this.loadDepartments(); 
          },
          error => {
            console.error('CSV import error:', error);
          }
        );
    }
  }
}


















