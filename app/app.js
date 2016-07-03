(function () {

	
    var app = angular.module("deliveryApp",["ngRoute","ui.bootstrap", "e2eMocks"])
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
            .otherwise({ redirectTo: "/deliveries" });

    })
	.run(
    function ($rootScope, $location) {

        $rootScope.$on("serviceError", function (event, next, current) {
            alert(next.message);
        });

    });

}());

