(function () {

    var clientsService = function ($http) {
        var modelUrl = appConfig.baseUrl+appConfig.models.clients,
			pageSize= appConfig.pageSize,
            factory = {};
			
		factory.clients=[];
        
        factory.getClients = function (pageIndex) {
            return $http.get(modelUrl+"/page?limit="+pageSize+"&start="+pageIndex);
        };
        
        factory.insertClient = function (delivery) {
            return $http.post(modelUrl, delivery);
        };

        factory.updateClient = function (name,delivery) {
            return $http.put(modelUrl+"/"+name, delivery);
        };

        factory.deleteClient = function (name) {
            return $http.delete(modelUrl+"/"+name);
        };

        factory.getClient = function (name) {
            return $http.get(modelUrl+"/"+name);
        };
        
        factory.initialize = function(){
        	return this.getClients(0);
        }
		
		factory.getPagedClients = function(pageIndex, pageSize) {
            var clients=(this.filteredClients&&this.filteredClients.length>0)?this.filteredClients:this.clients;
            return { totalRecords:clients.length , results:clients.slice((pageIndex * pageSize), ((pageIndex+1) * pageSize)) }
        }

        return factory;
    };

    clientsService.$inject = ["$http"];

    angular.module("deliveryApp").factory("clientsService", clientsService);

}());