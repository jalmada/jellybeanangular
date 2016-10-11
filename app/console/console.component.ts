import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app-console',
  templateUrl: 'console.component.html',
  providers : [  ]

})
export class ConsoleComponent { 

  textLines : string[] = ['Linea1','Linea2','Linea3'];
  text : string = "";

  constructor(){
  }

  ngOnInit( ) {
      this.print();
  }


  append(message : string)
  {
      this.textLines.push(message);
      if(this.textLines.length > 10){
          this.textLines.shift();
      }
      this.print();

  }

  print(){
    this.text = this.textLines.join("\n");
  }
}