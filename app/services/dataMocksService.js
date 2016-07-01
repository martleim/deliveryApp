(function () {
    //var urlConfig=angular.module("gridApp").constant("urlConfig");
    var mocks=angular.module("e2eMocks", ["ngMockE2E"]);

    mocks.run(function($httpBackend) {
        var baseUrl = UrlConfig.baseUrl,
        modelUrl = UrlConfig.deliveries,
        checkForChanges = UrlConfig.checkForChanges;
        var mockModelUrl='';
		var models={};
		
		
		
		factory.get = function (pageIndex, pageSize) {
            return $http.get(modelUrl).then(function (results) {
                if(scope.deliveries.length==0){
                    scope.deliveries = results.data;
                }
                return scope.deliveries;
            });
        };
        
        factory.post = function (delivery) {
            factory.deliveries.push(delivery);
        };

        factory.put = function (oldName,delivery) {
            for(var i=0;i<this.deliveries.length;i++){
                if(oldName==this.deliveries[i].name)
                    return this.deliveries[i]=delivery;
            }
        };

        factory.delete = function (name) {
            for(var i=0;i<this.deliveries.length;i++){
                if(name==this.deliveries[i].name)
                    return this.deliveries.splice(i,1);
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
		
		
		
        $httpBackend.whenGET(baseUrl + modelUrl).respond(factory.get);
		$httpBackend.whenPOST(baseUrl + modelUrl).respond(factory.post);
		$httpBackend.whenPUT(baseUrl + modelUrl).respond(factory.put);
		$httpBackend.whenDELETE(baseUrl + modelUrl).respond(factory.delete);

        $httpBackend.whenGET(/views\/\w+.*/).passThrough();

        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
    });
    
    angular.module("deliveryApp").requires.push("e2eMocks");
    
    
}())