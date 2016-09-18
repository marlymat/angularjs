(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.message = "";
  $scope.lunchItems = "";
  $scope.messageStyle = "";
  $scope.textBoxStyle = "";

  $scope.showMessage = function () {
    if ($scope.lunchItems === "") {
      $scope.messageStyle = "message-no-data";
      $scope.textBoxStyle = "textbox-no-data";
      $scope.message = "Please enter data first";
      
    } else {
      $scope.messageStyle = "message-valid-data";
      $scope.textBoxStyle = "textbox-valid-data";

      var countOfLunchItems = countLunchItems($scope.lunchItems, ',');
      if (countOfLunchItems > 3) {
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
  };

}

function countLunchItems(text, separator) {
  var lunchItemsArray = text.split(separator);
  var noEmptylunchItemsArray = lunchItemsArray.filter(isNotEmptyItem);

  return noEmptylunchItemsArray.length;
};

function isNotEmptyItem(item){
  return item.trim() !== "";
}

})();
