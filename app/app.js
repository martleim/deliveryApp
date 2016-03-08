(function () {

    var app = angular.module("deliveryApp",["ngRoute","ml-grid","ui.bootstrap"]);

    app.config(["$routeProvider", function ($routeProvider) {
        //var viewBase = "/app/views/";
		var viewBase = "app/views/";

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

    }]);

    app.run();

}());

