(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService){
  var list = this;

  list.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  list.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
  var list = this;

  list.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItems = [{name: "cookies", quantity: 10}, 
                    {name: "chips", quantity: 5}, 
                    {name: "ice cream", quantity: 2}, 
                    {name: "cake", quantity: 20}, 
                    {name: "candy", quantity: 12}];
  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
