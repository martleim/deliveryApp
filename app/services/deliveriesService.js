(function () {

    var deliveriesService = function ($http) {
        var modelUrl = appConfig.baseUrl+appConfig.models.deliveries,
			pageSize= appConfig.pageSize,
            factory = {};
			
		factory.deliveries=[];
        
        factory.getDeliveries = function (pageIndex) {
            return $http.get(modelUrl+"/page?limit="+pageSize+"&start="+pageIndex);
        };
        
        factory.insertDelivery = function (delivery) {
            return $http.post(modelUrl, delivery);
        };

        factory.updateDelivery = function (name,delivery) {
            return $http.put(modelUrl+"/"+name, delivery);
        };

        factory.deleteDelivery = function (name) {
            return $http.delete(modelUrl+"/"+name);
        };

        factory.getDelivery = function (name) {
            return $http.get(modelUrl+"/"+name);
        };
        
        factory.initialize = function(){
        	return this.getDeliveries(0);
        }
		
		factory.getPagedDeliveries = function(pageIndex, pageSize) {
            var deliveries=(this.filteredDeliveries&&this.filteredDeliveries.length>0)?this.filteredDeliveries:this.deliveries;
            return { totalRecords:deliveries.length , results:deliveries.slice((pageIndex * pageSize), ((pageIndex+1) * pageSize)) }
        }

        return factory;
    };

    deliveriesService.$inject = ["$http"];

    angular.module("deliveryApp").factory("deliveriesService", deliveriesService);

}());