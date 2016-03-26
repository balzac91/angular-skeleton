(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/page-one');

    $stateProvider
      .state('pageOne', {
        url: '/page-one',
        templateUrl: './pages/page-one/page-one.html',
        controller: 'PageOneController',
        controllerAs: 'vm'
      })
      .state('pageTwo', {
        url: '/page-two',
        templateUrl: './pages/page-two/page-two.html',
        controller: 'PageTwoController',
        controllerAs: 'vm'
      });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
})();
