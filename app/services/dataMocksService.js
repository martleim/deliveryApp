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
			url = url.split(baseUrl)[1];
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
			var model=models[urlobj.route[0]];
			var rets;
			if(urlobj.params.limit){
				var from=parseInt(urlobj.params.limit)*parseInt(urlobj.params.start);
				rets=model.slice(from, from+parseInt(urlobj.params.limit));
				return [200, {results:rets, totalRecords:model.length }];
			}else{
				var name=urlobj.route[1];
				if(name && name!=""){
					for(var i=0;i<model.length;i++){
						if(name==model[i].name){
							rets = model[i];
							return [200, {result:rets }];
						}
					}
				}else{
					return [200, {results:model}];
				}
			}
			
        };
        
        factory.post = function (method,url,data,header) {
			var urlobj=decodeUrl(url);
			var model=models[urlobj.route[0]];
            model.push(data);
			return [200, {results:rets, totalRecords:model.length }];
        };

        factory.put = function (method,url,data,header) {
            var urlobj=decodeUrl(url);
			var model=models[urlobj.route[0]];
			var oldName=urlobj.route[1];
            for(var i=0;i<model.length;i++){
                if(oldName==model[i].name)
                    return model[i]=data;
            }
        };

        factory.delete = function (method,url,data,header) {
            var urlobj=decodeUrl(url);
			var model=models[urlobj.route[0]];
			var oldName=urlobj.route[1];
            for(var i=0;i<model.length;i++){
                if(oldName==model[i].name)
                    return model.splice(i,1);
            }
        };
		
		factory.getPagedDeliveries = function(pageIndex, pageSize) {
            var deliveries=(this.filteredDeliveries&&this.filteredDeliveries.length>0)?this.filteredDeliveries:this.deliveries;
            return { totalRecords:deliveries.length , results:deliveries.slice((pageIndex * pageSize), ((pageIndex+1) * pageSize)) }
        }
		
		
		for(var modelUrl in appConfig.models){
			var loadingModel=modelUrl;
			var loadModel=function(loadingModel,models){
				$http.get(baseUrl+"app/services/"+loadingModel+".json").then(
					function(result){
						models[loadingModel]=result.data;
					}
				);
			}
			loadModel(loadingModel,models);
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