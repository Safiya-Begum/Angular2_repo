import {Injectable,Component} from '@angular/core';
import {IEmployee} from './employee';
import {EMPLOYEES} from './employee-mock';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService{
    constructor(private _http:Http){}

    getEmployeesDetails():Observable<IEmployee[]>{
         return this._http.get('http://localhost:3002/employees')
        .map((response:Response) => <IEmployee[]>response.json())
        .catch(this.handleError);
    }

    // Using Promises in angular
    /*getEmployeeDetails(empcode:string):Promise<IEmployee>{
        return this._http.get('http://localhost:3002/employees/' + empcode)
       .map((response:Response) => <IEmployee>response.json())
       .toPromise()
       .catch(this.handlePromiseError);
   }*/

   //Using Observables in angular
   getEmployeeDetails(empcode:string):Observable<IEmployee>{
        return this._http.get('http://localhost:3002/employees/' + empcode)
        .map((response:Response) => <IEmployee>response.json())
        .catch(this.handleError);
    }

   handlePromiseError(error:Response):Promise<IEmployee>{
        //console.error(error);
        throw(error);
    }

    handleError(error:Response){
        //console.error(error);
        return Observable.throw(error);
    }
}