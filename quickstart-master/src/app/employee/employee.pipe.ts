import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name:'squareIt'
})
export class CustomPipe implements PipeTransform{
    transform(value:number):number{
        return value*value;
    }
}