(function () {

	
    var app = angular.module("deliveryApp",["ngRoute", "ui.bootstrap", 'uiGmapgoogle-maps'])
	.config( function ($routeProvider, uiGmapGoogleMapApiProvider){
		var viewBase = appConfig.views;
		
		uiGmapGoogleMapApiProvider.configure({
			    key: appConfig.googleMapKey,
			v: '3.20', //defaults to latest 3.X anyhow
			libraries: 'weather,geometry,visualization'
		});/*.then(function(maps) {
				console.log('Google Maps loaded');
				 vm.map = {
				 center: {
					latitude: -23.598763,
					longitude: -46.676547
				  },
				  zoom: 13
			};
		});*/

        $routeProvider
			.when("/deliveries", {
                controller: "DeliveriesController",
                templateUrl: viewBase + "deliveries/deliveries.html"
            })
			.when("/deliveryedit/:deliveryName", {
                controller: "DeliveryEditController",
                templateUrl: viewBase + "deliveries/deliveryEdit.html"
            })
            .when("/deliveryadd", {
                controller: "DeliveryEditController",
                templateUrl: viewBase + "deliveries/deliveryEdit.html"
            })
			.when("/clients", {
                controller: "ClientsController",
                templateUrl: viewBase + "clients/clients.html"
            })
			.when("/clientedit/:clientName", {
                controller: "ClientEditController",
                templateUrl: viewBase + "clients/clientEdit.html"
            })
            .when("/clientadd", {
                controller: "ClientEditController",
                templateUrl: viewBase + "clients/clientEdit.html"
            })
			.when("/map", {
                controller: "MapController",
                templateUrl: viewBase + "map/map.html"
            })
            .otherwise({ redirectTo: "/deliveries" });

    })
	.controller("navBarController", function($scope, $location){
		$scope.isActive = function (viewLocation) { 
			return viewLocation === $location.path();
		};
	})
	.run(
    function ($rootScope, $location) {

        $rootScope.$on("serviceError", function (event, next, current) {
            alert(next.message);
        });

    });

}());

