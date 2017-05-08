


function initiateLocalStorage() {
  // create the angularJS application
  var app = angular.module('Items', ['storageService']);

  // create the controller
  app.controller('ItemsController', ['$scope', 'getLocalStorage', function ($scope, getLocalStorage) {
    $scope.appTitle = "Items";
    $scope.appHeadline = "Comments";

    // read the item list from LocalStorage
    $scope.items = getLocalStorage.getItems();

    // count the item list
    $scope.count = $scope.items.length;


    // add item - using angularJS push to add Item in the Item object
    // call Update item to update the locally stored item list
    // reset the angularJS item scope
    // update the count
    $scope.addItem = function () {
      $scope.items.push({ 'itm': $scope.itm, 'comment': $scope.comment });
      console.log($scope.items);
      getLocalStorage.updateItems($scope.items);
      $scope.itm = '';
      $scope.comment = '';
      $scope.count = $scope.items.length;
    };

    // delete item - using angularJS splice to remove the emp row from the Item list
    // all the update item to update the locally stored Item list
    // update the count
    $scope.deleteItem = function (emp) {
      $scope.items.splice($scope.items.indexOf(emp), 1);
      getLocalStorage.updateItems($scope.items);
      $scope.count = $scope.items.length
    };
  }]);

  // create the storage service module
  // create getLocalStorage service to access UpdateItems and getItems method
  var storageService = angular.module('storageService', []);
  storageService.factory('getLocalStorage', function () {
    var itemList = {};
    return {
      list: itemList,
      updateItems: function(ItemsArr) {
        if (window.localStorage && ItemsArr) {
          // Local storage to add data
          localStorage.setItem("items", angular.toJson(ItemsArr));
        }
        itemList = ItemsArr;

      },
      getItems: function () {
        // get data from local storage
        itemList = angular.fromJson(localStorage.getItem("items"));
        return itemList ? itemList : [];
      }
    };

  });

}
initiateLocalStorage();











