angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('lOGIN', {
    url: '/login',
    templateUrl: 'templates/lOGIN.html',
    controller: 'lOGINCtrl'
  })

  .state('nEWACCOUNT', {
    url: '/signup',
    templateUrl: 'templates/nEWACCOUNT.html',
    controller: 'nEWACCOUNTCtrl'
  })

  .state('bLKBRD', {
    url: '/channels',
    templateUrl: 'templates/bLKBRD.html',
    controller: 'bLKBRDCtrl'
  })

  .state('aDDCHANNEL', {
    url: '/add',
    templateUrl: 'templates/aDDCHANNEL.html',
    controller: 'aDDCHANNELCtrl'
  })

  .state('sETTINGS', {
    url: '/settings',
    templateUrl: 'templates/sETTINGS.html',
    controller: 'sETTINGSCtrl'
  })

  .state('cHANNEL', {
    url: '/channel',
    templateUrl: 'templates/cHANNEL.html',
    controller: 'cHANNELCtrl'
  })

  .state('aDDNEWPOST', {
    url: '/newpost',
    templateUrl: 'templates/aDDNEWPOST.html',
    controller: 'aDDNEWPOSTCtrl'
  })

  .state('pREVIOUS', {
    url: '/previous',
    templateUrl: 'templates/pREVIOUS.html',
    controller: 'pREVIOUSCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});