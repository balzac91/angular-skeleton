(function () {
  'use strict';

  angular
    .module('app')
    .controller('PageTwoController', PageTwoController);

  function PageTwoController() {
    var vm = this;

    vm.text = 'page two controller';
  }
})();
