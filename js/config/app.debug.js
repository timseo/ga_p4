(function() {
  "use strict";

  angular
    .module("Brewsker")
    .config(debug);

  debug.$inject = ["$logProvider"];

  function debug($logProvider) {
    // Set this to true to print $log.debug statements to the
    // console.
    $logProvider.debugEnabled(false);
  }
})();
