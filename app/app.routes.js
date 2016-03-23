(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/state1');

    $stateProvider
      .state('pageOne', {
        url: '/page-one',
        templateUrl: './pages/page-one/page-one.html',
        controller: 'PageOneController',
        controllerAs: 'pageOne'
      })
      .state('pageTwo', {
        url: '/page-two',
        templateUrl: './pages/page-two/page-two.html',
        controller: 'PageTwoController',
        controllerAs: 'pageTwo'
      });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
})();
