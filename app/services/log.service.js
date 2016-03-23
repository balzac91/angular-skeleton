(function () {
  'use strict';

  angular
    .module('app')
    .service('log', log);

  function log() {
    this.logError = function (message) {
      console.log(message);
    };
  }
})();