(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['$scope','InfoService'];
function RegistrationController($scope,InfoService) {
  var regCtrl = this;

  regCtrl.submit = function () {
	InfoService.setUser(regCtrl.user);
	
	regCtrl.validated = false;
	regCtrl.validMenuId = false;
	regCtrl.user = null;
	$scope.regForm.$setPristine(); 
	$scope.regForm.$setUntouched(); 
	
	regCtrl.completed = true;
  };
  
  regCtrl.validateMenuId = function () {
	  regCtrl.completed = false;
	  regCtrl.validated = false;
	  
	  var promise = InfoService.getMenuItem(regCtrl.user.menuid);

	  promise.then(function (response) {
		  regCtrl.validMenuId = true;
		  regCtrl.validated = true;
	  })
      .catch(function (error) {
		  regCtrl.validMenuId = false;
		  regCtrl.validated = true;
	  })
  };
}

})();
