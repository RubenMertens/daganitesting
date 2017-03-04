/**
 * Created by Ravanys on 04/03/2017.
 */



export class ListItem{


  constructor(public name:string, public amount:number, public value:number){}

  getTotalValue():number{
    return this.amount*this.value;
  }
}
