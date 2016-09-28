import { Component } from '@angular/core';
import { TesterService } from './tester/tester.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers : [ TesterService ]

})
export class AppComponent { 

  numberOfTests = 0;
  mode = "1";
  results = {
    "aliveCount": 0,
    "alivePct": 0,
    "deadCount": 0,
    "deadPct": 0
  };

  constructor(private _testerService : TesterService ){
  }

  ngOnInit() {}

  runTests(){
    this._testerService.init(+this.mode, false);
    this._testerService.run(this.numberOfTests);
    this.results = this._testerService.getResults();
  }
}