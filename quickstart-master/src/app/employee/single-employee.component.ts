import {Component, OnInit} from '@angular/core';
import {IEmployee} from './employee';
import {EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import {ISubscription} from 'rxjs/Subscription';


@Component({
    selector:'employee-container',
    templateUrl:'./single-employee.component.html'
})
export class SingleEmployee{
    employee:IEmployee;
    subscription:ISubscription
    empcode:string;
    statusMessage:string="Loading. Please wait...";
    constructor(private _employeeService: EmployeeService, private _activatedRoute:ActivatedRoute, private _router:Router){}
    ngOnInit(){
        this.empcode=this._activatedRoute.snapshot.params['code'];
        this.getEmployeeDetails(this.empcode);
    }
    cancelRequest(){
        this.statusMessage="Request Cancelled";
        this.subscription.unsubscribe();
        this.subscription.closed=true;
    }
    getEmployeeDetails(empCode:string){
        /*this._employeeService.getEmployeeDetails(empCode).then((employeeData:IEmployee)=> {
          // console.log(employeeData);
            if(!employeeData){
                this.statusMessage="Employee Doesnot exist's";
            }
            else {
                this.employee=employeeData;
            }
        })
        .catch((error) => {this.statusMessage="Problem with service. Please try again later."});*/
        this.subscription=this._employeeService.getEmployeeDetails(empCode)
        .retryWhen((err)=>
            {
               return err.scan((retryCount)=>{
                retryCount+=1;
                if(retryCount<6){
                    this.statusMessage="Retrying Attempt #"+retryCount;
                    return retryCount;
                }
                else
                    throw(err);
               },0).delay(1000)
            }
        )
        .subscribe((employeeData:IEmployee)=> {
            // console.log(employeeData);
              if(!employeeData){
                  this.statusMessage="Employee Doesnot exist's";
              }
              else {
                  this.employee=employeeData;
              }
          }, (error) => {this.statusMessage="Problem with service. Please try again later."});
    }
    backToEmployeesList(){
        this._router.navigate(['/employees']);
    }
}