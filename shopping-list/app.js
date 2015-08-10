/// <reference path="./typings/angular2/angular2"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var Item = (function () {
    function Item(name, quantity, checked) {
        this.name = name;
        this.quantity = quantity;
        this.checked = checked;
    }
    return Item;
})();
var ShoppingItem = (function () {
    function ShoppingItem() {
    }
    ShoppingItem.prototype.toggleChecked = function (thisItem) {
        thisItem.checked = !thisItem.checked;
    };
    ShoppingItem = __decorate([
        angular2_1.Component({
            selector: 'shopping-item',
            properties: { 'item': 'item' }
        }),
        angular2_1.View({
            templateUrl: 'templates/item.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ShoppingItem);
    return ShoppingItem;
})();
var ShoppingApp = (function () {
    function ShoppingApp() {
        this.items = [
            new Item('Beer', '3', true),
            new Item('Water', '3 Bottles', false),
            new Item('Apple', '20', false),
            new Item('Milk', '2', true),
            new Item('Coffee', '1', false),
            new Item('Sausage', '', false),
        ];
    }
    ShoppingApp.prototype.addItem = function (name, quantity) {
        console.log(name, quantity);
        this.items.push(new Item(name.value, quantity.value, false));
        name.value = '';
        quantity.value = '';
    };
    ShoppingApp.prototype.checkAll = function () {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].checked = true;
        }
    };
    ShoppingApp.prototype.uncheckAll = function () {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].checked = false;
        }
    };
    ShoppingApp.prototype.deleteChecked = function () {
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].checked)
                this.items.splice(i, 1);
        }
    };
    ShoppingApp = __decorate([
        angular2_1.Component({
            selector: 'shopping'
        }),
        angular2_1.View({
            directives: [ShoppingItem, angular2_1.For],
            templateUrl: 'templates/main.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ShoppingApp);
    return ShoppingApp;
})();
angular2_1.bootstrap(ShoppingApp);
