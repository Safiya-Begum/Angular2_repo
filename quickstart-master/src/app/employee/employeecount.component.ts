import {Component, Input, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from './employee.service';

@Component({
selector:'employeeCount',
templateUrl:'./employeeCount.component.html',
providers:[EmployeeService]
})

export class EmployeeCount {
    selectedGender:string='all';

    constructor(private data:EmployeeService){
       // console.log(data);
        //this.data.getEmployeeDetails().subscribe((data)=>console.log(data,'from here'));
    }

    @Input()
    all:string;
    
    @Input()
    male:string;

    @Input()
    female:string;

    @Output()
    radioButtonBasedCustomEvent: EventEmitter<string>=new EventEmitter<string>();

    raiseCustomEvent(){
        //console.log(this.selectedGender,'from custom');
        this.radioButtonBasedCustomEvent.emit(this.selectedGender);
    }

}