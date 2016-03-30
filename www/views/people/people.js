angular.module('starter')
.controller('CardsCtrl', function ($scope, $http, $ionicLoading, $ionicSideMenuDelegate, TDCardDelegate) {
  // console.log('CARDS CTRL');
  $ionicSideMenuDelegate.canDragContent(false);

  var cardTypes = [];

  $scope.refresh = function() {
    $ionicLoading.show();
    $http.get('https://randomuser.me/api/?results=5').success(function (response) {
      angular.forEach(response.results, function (famous) {
        famous.followers = Math.floor(Math.random() * 1000);
        cardTypes.push(famous);
        // console.log(JSON.stringify(famous));
      });
      cardTypes[cardTypes.length - 1].visible = true;
      $ionicLoading.hide();
    }).error(function (err) {
      console.log(err);
    });

    // $scope.cards = Array.prototype.slice.call(cardTypes, 0);
    $scope.cards = cardTypes;
  };

  $scope.refresh();

  $scope.cardDestroyed = function(index) {
    console.log(index, 'destroyed');
    $scope.cards.splice(index, 1);
    if ($scope.cards.length) {
      $scope.cards[$scope.cards.length - 1].visible = true;
    }
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    // newCard.id = Math.random();
    console.log('addcard');
    $scope.cards.push(angular.extend({}, newCard));
  };

  $scope.yesCard = function(index) {
    console.log('YES');
    // $scope.cards.splice(index, 1);
    // $scope.addCard();
  };

  $scope.noCard = function() {
    console.log('NO');
    // $scope.cards.splice(index, 1);
    // $scope.addCard();
  };

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    // $scope.addCard();
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    // $scope.addCard();
  };

  $scope.onDragToggle = function(trueOrFalse) {
    console.log('onDragToggle', trueOrFalse);
    $scope.cards[cardTypes.length - 2].visible = trueOrFalse;
  };

  $scope.onPartialSwipe = function (argument) {
    // console.log(argument);
    if (argument > 0.15) {
      $scope.cards[cardTypes.length - 2].visible = true;
    } else {
      $scope.cards[cardTypes.length - 2].visible = false;
    }
  };
});
