var app = angular.module('app', ['ui.bootstrap', 'ngDialog', 'ngResource']).value('duScrollOffset', 30);

angular.module('app').factory('Order', function($resource) {
  return $resource('/orders/:id'); // Note the full endpoint address
});