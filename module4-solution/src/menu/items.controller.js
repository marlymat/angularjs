(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);

// 'item' is injected through state's resolve
ItemsListController.$inject = ['items']
function ItemsListController(items) {
 var itemsList = this;
  itemsList.items = items;
}

})();