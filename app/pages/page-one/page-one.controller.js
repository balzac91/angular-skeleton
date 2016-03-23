(function () {
  'use strict';

  angular
    .module('app')
    .controller('PageOneController', PageOneController);

  function PageOneController(log) {
    var vm = this;

    vm.text = 'page one controller';

    log.logError(vm.text);
  }

  PageOneController.$inject = ['log'];
})();