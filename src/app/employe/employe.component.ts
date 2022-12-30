import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeModule } from './employe.module';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  
  formValue ! :FormGroup;
  employeModuleObj : EmployeModule = new EmployeModule();
  employeData !:any;
  showAdd!:boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
  private api : ApiService ){ }

  ngOnInit(): void {
    this.formValue =this.formbuilder.group({
      firstname :[''],
      lastname :[''],
      email :[''],
      mobile :[''],
      salary :['']
    })
    
    this.getAllEmploye();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeDetails(){
    this.employeModuleObj.firstname = this.formValue.value.firstname;
    this.employeModuleObj.lastname = this.formValue.value.lastname;
    this.employeModuleObj.email = this.formValue.value.email;
    this.employeModuleObj.mobile = this.formValue.value.mobile;
    this.employeModuleObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeModuleObj)
    .subscribe(res=>{
      console.log(res);
      alert("employes added successfully")
      let ref = document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();
    },
    _err=>{
      alert("something went wrong")
    })
  }
 getAllEmploye(){
  this.api.getEmploye(data)
  .subscribe(res=>{
   this.employeData = res;
  })
 }
 deleteEmploye(row: any){
 this.api.deleteEmploye(row.id)
 .subscribe(res=>{
  alert("Employe deleted")
  this.getAllEmploye();
 })
 }
 onEdit(row :any){
  this.showAdd=false;
  this.showUpdate=true;
  this.employeModuleObj.id=row.id
  this.formValue.controls['firstname'].setValue(row.firstname);
  this.formValue.controls['lastname'].setValue(row.lastname);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary)
 }
 updateEmployeDetails(){
  console.log(this.employeModuleObj.id)
  this.employeModuleObj.firstname = this.formValue.value.firstname;
  this.employeModuleObj.lastname = this.formValue.value.lastname;
  this.employeModuleObj.email = this.formValue.value.email;
  this.employeModuleObj.mobile = this.formValue.value.mobile;
  this.employeModuleObj.salary = this.formValue.value.salary;

  this.api.updateEmploye(this.employeModuleObj,this.employeModuleObj.id) 
  .subscribe(_res=>{
    alert("update successfully");
    let ref = document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();
  })
 }
}

function data(_data: any) {
  throw new Error('Function not implemented.');
}

