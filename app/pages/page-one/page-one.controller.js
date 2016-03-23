(function () {
  'use strict';

  angular
    .module('app')
    .controller('PageOneController', PageOneController);

  PageOneController.$inject = ['logService'];

  function PageOneController(logService) {
    var vm = this;

    vm.text = 'page one controller';

    logService.logError(vm.text);
  }
})();
