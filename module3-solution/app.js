(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.searchTermInMenuItems = function () {
    console.log("list.items: " + list.items);
      
    if (!list.items || list.items.length > 0) {
        return true;
    }

    return false;
  };
}
    
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;
    
  list.found = null;
    
  list.narrowMenuItems = function () {
    if (list.searchTerm && list.searchTerm.trim().length > 0) {
        var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

        promise.then(function (foundItems) {
          list.found = foundItems;
          console.log("list.found : " + list.found );
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
    } else {
        list.found = [];
    }
  }
    
  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  };
    
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath){
  var service = this;
    
  service.getMatchedMenuItems = function(searchTerm) {
    console.log("ApiBasePath: " + ApiBasePath);
    return $http({
                  method: "GET",
                  url: (ApiBasePath + "/menu_items.json")
                }).then(function (result) {
                    var menuItems = result.data.menu_items;
                    var foundItems = [];

                    for (var i = 0; i < menuItems.length; i++) {  
                        if (menuItems[i].description.includes(searchTerm)) {
                            console.log("description: " + menuItems[i].description);
                            foundItems.push(menuItems[i]);
                        }
                    }
                    return foundItems;
                });

  }

}
    
})();
