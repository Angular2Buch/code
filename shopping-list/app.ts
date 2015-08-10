/// <reference path="./typings/angular2/angular2"/>

import {Component, View, For, bootstrap} from 'angular2/angular2';

/**
* Item class - data holder for shopping list items
*/
class Item {
  name : string;
  quantity  : string;
  checked  : boolean;

  constructor(name, quantity, checked) {
    this.name = name;
    this.quantity  = quantity;
    this.checked  = checked;
  }
}



/**
* Component for shopping list items
*/
@Component({
  selector: 'tbody',
  properties: {'item' : 'item'}
})
@View({
  templateUrl: 'templates/item.html'
})
class ShoppingItem {
  item: Item;

  toggleChecked(thisItem: Item) {
    thisItem.checked = !thisItem.checked;
  }
}



/**
* Component for shopping list
*/
@Component({
  selector: 'shopping'
})
@View({
  directives: [ShoppingItem, For],
  templateUrl: 'templates/main.html'
})
class ShoppingApp {
  items: Array<Item>;

  constructor() {
    this.items = [
      new Item('Beer','3', true),
      new Item('Water','3 Bottles', false),
      new Item('Apple','20', false),
      new Item('Milk','2', true),
      new Item('Coffee','1', false),
      new Item('Sausage','', false),
    ]
  }

  /** add a new item to shopping list */
  addItem(name: String, quantity: String) {
    console.log(name, quantity);
    this.items.push(new Item(name, quantity, false));
    name = null;
    quantity  = null;
  }

  /** check all items in list */
  checkAll() {
    for (var i=0; i<this.items.length; i++){
      this.items[i].checked = true;
    }
  }

  /** uncheck all items in list */
  uncheckAll() {
    for (var i=0; i<this.items.length; i++){
      this.items[i].checked = false;
    }
  }

  /** delete all checked items in list */
  deleteChecked() {
    for (var i=this.items.length-1; i>=0; i--){
      if (this.items[i].checked)
        this.items.splice(i, 1);
    }
  }

}



bootstrap(ShoppingApp);
