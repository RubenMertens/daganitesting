import {LocationMessage} from "./LocationMessage";
/**
 * Created by RubenMertens on 09/03/2017.
 */


export class BulkLocation{


  constructor(public locations: [{[clientId:string] : LocationMessage}]){

  }
}
