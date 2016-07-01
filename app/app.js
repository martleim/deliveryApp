(function () {

	
    var app = angular.module("deliveryApp",["ngRoute"/*,"grid","ui.bootstrap"*/])
	.config( function ($routeProvider/*, grid, uiBootstrap*/){
		var viewBase = UrlConfig.views;

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

        //$rootScope.$on("$routeChangeStart", function (event, next, current) {
        //    if (next && next.$$route && next.$$route.secure) {
        //        if (!authService.user.isAuthenticated) {
        //            authService.redirectToLogin();
        //       }
        //    }
        //});
        
        $rootScope.$on("serviceError", function (event, next, current) {
            alert(next.message);
        });

    });

}());

