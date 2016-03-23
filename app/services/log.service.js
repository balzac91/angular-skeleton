(function () {
  'use strict';

  angular
    .module('app')
    .factory('logService', logService);

  logService.$inject = ['$log'];

  function logService($log) {
    return {
      logError: logError
    };

    function logError(message) {
      $log.log(message);
    }
  }
})();
