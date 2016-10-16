(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);
    
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/menu/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menu/templates/main-categories.template.html',
      controller: 'CategoriesListController as categoriesList',
      resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
      }
    })
    
    .state('items', {
      url: '/items/:category',
      templateUrl: 'src/menu/templates/main-items.template.html',
      controller: 'ItemsListController as itemsList',
      resolve: {
          items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.category);
          }]
      }
    });
}

    
})();
