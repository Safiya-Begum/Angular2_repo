import {Component,OnInit} from '@angular/core';
import {IEmployee} from './employee';
import {EmployeeService} from './employee.service'

@Component({
selector:"employee-details",
templateUrl:'./employee.component.html',
providers:[EmployeeService],
styleUrls:['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
    selectedRadioButton:string="all";
    header:string="Employee Details";
    statusMessage:string="Loading. Please wait...";
    employees:IEmployee[]; //This can be directly passed to constructor.
    constructor(private employeeService: EmployeeService){}
    ngOnInit():void{
        this.getEmployeeDetails();
    }
    getEmployeeDetails():void{
        this.employeeService.getEmployeesDetails().subscribe((response)=>this.employees=response, (error) => {this.statusMessage="Problem with service. Please try again later."} );
    }
    getTotalEmployees():number{
        return this.employees.length;
    }
    getMaleEmployees():number{
        return this.employees.filter(e=>e.gender==='male').length;
    }
    getFemaleEmployees():number{
        return this.employees.filter(e=>e.gender==='female').length;
    }
    updateSelectedGender(selectedValue:string):void{
        //console.log(selectedValue);
        this.selectedRadioButton=selectedValue;
    }
}