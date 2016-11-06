(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['InfoService'];
function InfoController(InfoService) {
  var infoCtrl = this;
  infoCtrl.userEmpty = true;
  
  infoCtrl.user = InfoService.getUser();
  console.log("user: ", infoCtrl.user);
  
  if (infoCtrl.user != null) {
	  var promise = InfoService.getMenuItem(infoCtrl.user.menuid);
	  
	  promise.then(function (response) {
		  infoCtrl.menuItem = response.data;
		  console.log("menuItem: ", infoCtrl.menuItem);
		  infoCtrl.userEmpty = false;
	  })
  }

}

})();
