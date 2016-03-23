(function () {
  'use strict';

  angular
    .module('app')
    .controller('PageOneController', PageOneController);

  PageOneController.$inject = ['log'];

  function PageOneController(log) {
    var vm = this;

    vm.text = 'page one controller';

    log.logError(vm.text);
  }
})();
