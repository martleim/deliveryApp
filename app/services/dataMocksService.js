(function () {
    //var appConfig=angular.module("gridApp").constant("appConfig");
    var mocks=angular.module("e2eMocks", ["ngMockE2E"]);


    mocks.run(function($httpBackend, $http	) {
        var baseUrl = appConfig.baseUrl,
        modelUrl = appConfig.deliveries,
        checkForChanges = appConfig.checkForChanges,
        mockModelUrl='',
		factory={},
		models={};
		
		
		var decodeUrl=function(url){
			var urlObj={
				params:{}
			};
			urlObj.base=url;
			urlObj.route=urlObj.base.split("/");
			if(url.indexOf("?")>0){
				urlObj.base=urlObj.base.split("?")[0];
				var vars=url.split("?")[1];
				urlObj.route=urlObj.base.split("/");
				vars=vars.split("&");
				angular.forEach(vars, function(value, key) {
					var param=value.split("=");
				  urlObj.params[param[0]]=param[1];
				});
			}
			return urlObj;
			
		}
		
		factory.get = function (method,url,data,header) {
            var urlobj=decodeUrl(url);
			var model=models[urlobj.route[urlobj.route.length-2]];
			var from=parseInt(urlobj.params.limit)*parseInt(urlobj.params.start);
			var rets=model.slice(from, from+parseInt(urlobj.params.limit));
			return [200, {results:rets, totalRecords:model.length }];

        };
        
        factory.post = function (method,url,data,header) {
			var urlobj=decodeUrl(url);
			var model=models[urlobj.route[urlobj.route.length-1]];
            model.push(data);
			return [200, {results:rets, totalRecords:model.length }];
        };

        factory.put = function (method,url,data,header) {
            var urlobj=decodeUrl(url);
			var model=models[urlobj.route[urlobj.route.length-2]];
            for(var i=0;i<model.length;i++){
                if(oldName==model[i].name)
                    return model[i]=delivery;
            }
        };

        factory.delete = function (method,url,data,header) {
            var urlobj=decodeUrl(url);
			var model=models[urlobj.model];
            for(var i=0;i<model.length;i++){
                if(name==model[i].name)
                    return model.splice(i,1);
            }
        };
		
		factory.getPagedDeliveries = function(pageIndex, pageSize) {
            var deliveries=(this.filteredDeliveries&&this.filteredDeliveries.length>0)?this.filteredDeliveries:this.deliveries;
            return { totalRecords:deliveries.length , results:deliveries.slice((pageIndex * pageSize), ((pageIndex+1) * pageSize)) }
        }
		
		
		for(var modelUrl in appConfig.models){
			$http.get(baseUrl+"app/services/"+modelUrl+".json").then(
				function(result){
					models[modelUrl]=result.data;
				}
			);
			
			var url=new RegExp(baseUrl + modelUrl + "+.*");

			$httpBackend.whenGET(url).respond(factory.get);
			$httpBackend.whenPOST(url).respond(factory.post);
			$httpBackend.whenPUT(url).respond(factory.put);
			$httpBackend.whenDELETE(url).respond(factory.delete);
			
			
		}

        $httpBackend.whenGET(/views\/\w+.*/).passThrough();

        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
		return factory;
    });
    
	
    angular.module("deliveryApp").requires.push("e2eMocks");
    
    
}())