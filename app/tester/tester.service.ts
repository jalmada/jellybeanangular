import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { Jellybean } from '../models/jellybean.model';

@Injectable()
export class TesterService
{
  private _aliveCount : number = 0;
  private _deadCount : number = 0;
  private _verbose : boolean = false;
  private _mode : number = 0;
  
  //_mode:
  //0 = No swtich
  //1 = Always switch
  //2 = Randowm switch

  constructor(){}

  init(mode : number, verbose : boolean){
    this._mode = mode;
    this._verbose = verbose;
  }

  run(n : number)
  {
    for(let i = 0; i < n; i++)
    {
      //if(this._verbose)console.log("=============== Run " + (i + 1) + "===============================");

      let jellybeans : Jellybean[] = [];
      jellybeans[0] = new Jellybean((Math.floor(Math.random() * 10) % 2) == 1);
      jellybeans[1] = new Jellybean(!jellybeans[0].isPoisonous ? true : (Math.floor(Math.random() * 10) % 2) == 1);
      jellybeans[2] = new Jellybean(jellybeans[0].isPoisonous &&  jellybeans[1].isPoisonous ? false : true);

      let test = new Test(jellybeans, this._mode);

      test.run();
      
      if( test.result == false ){
        this._aliveCount++;
      } else {
        this._deadCount++;
      }
    }

    let alivePerc : number = (this._aliveCount/n) * 100;
    let deadPerc : number = (this._deadCount/n) * 100;

    //Move to own method
    let resultSummary = `Final Results: Alive: ${this._aliveCount} Dead: ${this._deadCount}`;
    let percentages = `Percentages: Alive: ${alivePerc}% Dead: ${deadPerc}%`;
    console.log(resultSummary);
    console.log(percentages);
  }
}