(function () {

    var dataService = function (deliveriesService, clientsService) {
		this.deliveriesService=deliveriesService;
		this.clientsService=clientsService;
        return this;
    };

    dataService.$inject = ['deliveriesService','clientsService'];

    angular.module('deliveryApp').factory('dataService', dataService);

}());

