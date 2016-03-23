(function () {
  'use strict';

  angular
    .module('app')
    .factory('log', log);

  log.$inject = ['$log'];

  function log($log) {
    return {
      logError: logError
    };

    function logError(message) {
      $log.log(message);
    }
  }
})();
