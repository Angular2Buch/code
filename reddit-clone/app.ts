/// <reference path="./typings/angular2/angular2"/>

import {
  Component,
  View,
  bootstrap
} from 'angular2/angular2';

@Component({
  // Telling angular resolve this component via <hello-world></hello-world>
  selector: 'hello-world'
})
@View({
  template: `<div>Hello {{ name }}!</div>`
})
class HelloWorld {
  name: string;

  constructor() {
    name = 'Summer Event';
  }
}

bootstrap(HelloWorld);
