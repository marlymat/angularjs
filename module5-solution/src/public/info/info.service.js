(function () {
'use strict';

angular.module('public')
.service('InfoService', InfoService);

InfoService.$inject = ['$http', 'ApiPath'];
function InfoService($http, ApiPath) {
  var service = this;

  var user = null;

  service.setUser = function (newUser) {
    user = newUser;
  };
  
  service.getUser = function () {
    return user;
  };
  
  service.getMenuItem = function (menuid) {
    return $http.get(ApiPath + '/menu_items/' + menuid + '.json');
  };
}

})();