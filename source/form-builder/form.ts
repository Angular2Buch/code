/// <reference path="../../lib/angular-latest-typings/angular2/angular2"/>

import {bootstrap, Component, View} from "angular2/angular2";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup} from 'angular2/angular2';

@Component({
  selector: 'demo-form-sku-builder',
  viewBindings: [FormBuilder]
})
@View({
  directives: [FORM_DIRECTIVES],
  template: `
    <div>
    <h2>Form</h2>
    <form ng-form-model="myForm"
          (submit)="onSubmit(myForm.value)">
      <div class="form-group">
        <label for="skuInput">SKU</label>
        <input type="text"
               class="form-control"
               id="skuInput"
               placeholder="SKU"
               [ng-form-control]="myForm.controls['sku']" />

        <button type="submit" class="btn btn-default">Submit</button>
      </div>
    </form>
    </div>
  `
})
export class DemoForSku {

  myForm: ControlGroup;

  constructor(form: FormBuilder) {
    this.myForm = form.group({
      'sku': ['ABCD']
    });
  }

  onSubmit(value) {
    console.log('You submitted value: ', value);
  }
}

bootstrap(DemoForSku);
// var nameControl = new Control();
// var name = nameControl.value;
//
// nameControl.errors;
// nameControl.dirty;
// nameControl.valid;
//
// var personInfo = new ControlGroup({
//   firstName: new Control("Nate"),
//   lastName: new Control("Murray"),
//   zip: new Control(90210)
// });
//
// personInfo.errors;
// personInfo.dirty;
// personInfo.valid;
