(function () {
  'use strict';

  angular
    .module('app')
    .controller('PageOneController', PageOneController);

  function PageOneController() {
    var vm = this;

    vm.text = 'page one controller';
  }
})();