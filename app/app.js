(function () {

	
    var app = angular.module("deliveryApp",["ngRoute","ui.bootstrap"])
	.config( function ($routeProvider){
		var viewBase = appConfig.views;

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

