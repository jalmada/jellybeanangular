import { Component } from '@angular/core';
import { TesterService } from './tester/tester.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers : [ TesterService ]

})
export class AppComponent { 

  constructor(private _testerService : TesterService ){
    
  }

  ngOnInit() {
    this._testerService.init(1, false);
    this._testerService.run(1000);
  }

}