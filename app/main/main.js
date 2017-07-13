'use strict';

angular.module('main', ['ui.router', "pubnub.angular.service"])

.config(['$stateProvider', function($stateProvider) {

  var mainState = {
    name: 'main',
    url: '/main',
    templateUrl: 'main/main.html',
    controller: 'MainController'
  }

  $stateProvider.state(mainState);
}]);
