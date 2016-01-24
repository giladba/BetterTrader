// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('instruments', ['ionic'])

.controller('instrumentsCtrl',function($scope, $ionicModal, $http) {
  $http.get('/instruments').success(function(response) {
    console.log("I got the instruments I requested");
    // $scope.contactlist = response;
    //$scope.contact = "";
    $scope.instruments = response;
    console.log(response);
  })

  $http.get('/prices').success(function(response) {
    console.log("I got the prices I requested");
    // $scope.contactlist = response;
    //$scope.contact = "";
    $scope.prices = response;
    console.log(response);
  })
  //$scope.instruments = [
    //{title : 'Collect coins'},
    //{title : 'Eat mushrooms'},
    //{title : 'Get high enough to grab the flag'},
    //{title : 'Find the princess'}


 // ];

  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  } , {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.createTask = function(task) {
    $scope.instruments.push({
      displayName: instruments.displayName
    });
    $scope.taskModal.hide();
    task.displayName="";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  }

  $scope.closeNewTask = function () {
    $scope.taskModal.hide();
  }
});
