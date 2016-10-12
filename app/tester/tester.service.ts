import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { Jellybean } from '../models/jellybean.model';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TesterService
{
  private _aliveCount : number = 0;
  private _deadCount : number = 0;
  private _verbose : boolean = false;
  private _mode : number = 0;
  private _results : any = {};
  private _logger : LoggerService;
  //_mode:
  //0 = No swtich
  //1 = Always switch
  //2 = Randowm switch

  constructor(){}

  init(mode : number, verbose : boolean, logger: LoggerService){
    this._mode = mode;
    this._verbose = verbose;
    this._logger = logger;
  }

  run(n : number)
  {

    this._logger.log("Start Tests");

    for(let i = 0; i < n; i++)
    {
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

    let alivePct : number = (this._aliveCount/n) * 100;
    let deadPct : number = (this._deadCount/n) * 100;

    //Move to own method
    let resultSummary = `Final Results: Alive: ${this._aliveCount} Dead: ${this._deadCount}`;
    let percentages = `Percentages: Alive: ${alivePct}% Dead: ${deadPct}%`;
    console.log(resultSummary);
    console.log(percentages);

    this._results = {
      "aliveCount": this._aliveCount,
      "alivePct": isNaN(alivePct) ? 0 : Math.round(alivePct * 100) / 100,
      "deadCount": this._deadCount,
      "deadPct": isNaN(deadPct) ? 0 : Math.round(deadPct * 100) / 100
    };

    this._aliveCount = 0;
    this._deadCount = 0;
  }

  getResults()
  {
    return this._results;
  }
}