angular.module('starter')
.controller('AppCtrl', function($scope, $ionicPlatform, $timeout, $cordovaOauth, $twitterApi) {
  var twitterKey = 'STORAGE.TWITTER.KEY';
  var api_key = 'Wl7iig7Hs6Ch9zmGolIjzxVHK';
  var api_secret = 'noBsAtJzvqjAK3ywuttMJlJKCjMETt0FRNxNkQ3N9zbo33DEYI';
  var myToken = '';
  // var myToken = '{"oauth_token":"11922322-8qydwNH92JKbk9CAP1vVzDKqNAr4QvWkUr7S8M7ae","oauth_token_secret":"ENRfjbrMkS4qYHugSmlTHUJU0n0vMlFDLOcJIEfhHzcWG","user_id":"11922322","screen_name":"GianPaJ","x_auth_expires":"0"}';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('views/profile/profile.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.userDetails = {};

  // Open the login modal
  $scope.login = function() {
    // $scope.modal.show();
    myToken = JSON.parse(window.localStorage.getItem(twitterKey));
    if (myToken === '' || myToken === null) {
      $cordovaOauth.twitter(api_key, api_secret).then(function (succ) {
        myToken = succ;
        window.localStorage.setItem(twitterKey, JSON.stringify(succ));
        $twitterApi.configure(api_key, api_secret, succ);
        $scope.userDetails = $twitterApi.getUserDetails('gianpaj').then(function(data) {
          console.log(data);
        }, function(error) {
          console.log('err: ' + error);
        });
        console.log('succ');
      }, function(error) {
        console.log('Response error -> ' + JSON.stringify(error));
        console.log(error);
      });
    } else {
      $twitterApi.configure(api_key, api_secret, myToken);
      $scope.userDetails = $twitterApi.getUserDetails('gianpaj').then(function(data) {
        console.log(data);
        // welcome data.name
      }, function(error) {
        console.log('err: ' + error);
      });
      // TODO implement pagination
      $twitterApi.getUserFollowers('gianpaj', { count: 200 }).then(function(data) {
        console.log(data);
        // data.users[]
        // screen_name (@blah), name, followers_count, profile_image_url, status.text, status.create_at, verified (true/fase)
      }, function(error) {
        console.log('err: ' + JSON.stringify(error));
      });
    }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
