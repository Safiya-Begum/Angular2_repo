import {Component, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector:'test-hook',
    template:`<input type="text" [(ngModel)]="inputValue"/>{{inputValue}}`
})
export class LifeCycleHooks implements OnChanges {
    inputValue:string='test';
    ngOnChanges(change:SimpleChanges){
        console.log(change);
    }
}