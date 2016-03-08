(function () {

    var dataService = function (deliveriesService) {
        return deliveriesService;
    };

    dataService.$inject = ['deliveriesService'];

    angular.module('deliveryApp').factory('dataService', dataService);

}());

