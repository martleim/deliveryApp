(function () {

    var deliveriesService = function ($http) {
        var modelUrl = "app/services/deliveries.json",
            factory = {};
			
		factory.deliveries=[];
        
        factory.getDeliveries = function (pageIndex, pageSize) {
            return this.getPagedDeliveries(pageIndex, pageSize);
        };
        
        factory.insertDelivery = function (delivery) {
            factory.deliveries.push(delivery);
        };

        factory.updateDelivery = function (oldName,delivery) {
            for(var i=0;i<this.deliveries.length;i++){
                if(oldName==this.deliveries[i].name)
                    return this.deliveries[i]=delivery;
            }
        };

        factory.deleteDelivery = function (name) {
            for(var i=0;i<this.deliveries.length;i++){
                if(name==this.deliveries[i].name)
                    return this.deliveries.splice(i,1);
            }
        };

        factory.getDelivery = function (name) {
            for(var i=0;i<this.deliveries.length;i++){
                if(name==this.deliveries[i].name)
                    return this.deliveries[i];
            }
        };
        
        factory.initialize = function(){
            var scope = this;
            return $http.get(modelUrl).then(function (results) {
                if(scope.deliveries.length==0){
                    scope.deliveries = results.data;
                }
                return scope.deliveries;
            });
                       
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