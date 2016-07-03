(function () {

    var DeliveriesController = function ($scope, $location, $filter, dataService, modalService) {

        $scope.deliveries = [];
        $scope.unFilteredDeliveries = [];
        
        $scope.addressSearchText = null;
        $scope.nameSearchText = null;
        
        $scope.deliveriesGridConfig={
            data:"deliveries",
            columns:[{name:"name",label:"Nombre", width:"30%", sortable:true, sortFunction:function(a,b) { return a.name<b.name; }},
                    {name:"address",label:"Direccion", width:"30%"},
                    {name:"telephone",label:"Telefono", width:"30%",cellRenderer:function(row){ 
                        return row.telephone;
                    } },
                    {name:"name",label:"", width:"10%",cellRenderer:"<button type='button' class='btn btn-danger glyphicon glyphicon-remove-sign' style='margin-right:8px;height:30px' ng-click='delete(row)'></button><button type='button' class='btn btn-primary glyphicon glyphicon-pencil' style='margin-right:8px;height:30px' ng-click='editDelivery(row)'></button>"}]
        };
		

        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;
        $scope.navigatablePages=[];
        $scope.totalShownPages=6;
        $scope.totalPages=0;

        $scope.pageChanged = function (page) {
            if(page>=1 && page<=$scope.totalPages){
                $scope.currentPage = page;
                $scope.updateDeliveries();
            }
        };
        
        $scope.nextPage = function () {
            $scope.pageChanged($scope.currentPage+1);
        };
        
        $scope.lastPage = function () {
            $scope.pageChanged($scope.currentPage-1);
        };

        $scope.delete = function (delivery) {
            
            var name = delivery.name;

            var modalOptions = {
                closeButtonText: 'Cancelar',
                actionButtonText: 'Eliminar Delivery',
                headerText: 'Eliminar ' + name + '?',
                bodyText: 'Esta seguro que desea eliminar este Delivery?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    dataService.deleteDelivery(name);
                    $scope.updateDeliveries();
                }
            });
        };
        
        $scope.editDelivery=function(delivery){
            $location.path("/deliveryedit/"+delivery.name);
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };

        $scope.searchTextChanged = function () {
            this.filterDeliveries($scope.nameSearchText, $scope.addressSearchText);
        };

        $scope.updateDeliveries = function(){
            dataService.getDeliveries(this.currentPage,this.pageSize).then(function(res){
				res=res.data;
				$scope.deliveries=res.results;
				$scope.unFilteredDeliveries=$scope.deliveries;

				$scope.totalRecords=res.totalRecords;
				$scope.setNavigatablePages();	
			});
        }
        
        $scope.setNavigatablePages = function(){
            $scope.totalPages=Math.ceil(this.totalRecords/this.pageSize)-1;
            var start=this.currentPage-($scope.totalShownPages/2);
            start=(start<1)?1:start;
            var end=start+($scope.totalShownPages-1);
            if(end>$scope.totalPages){
                start-=(end-$scope.totalPages);
            }
            var pages=[];
            for(var i=0;i<$scope.totalShownPages;i++){
                pages.push(start+i);
            }
            $scope.navigatablePages=pages;
        }
        
        

        $scope.filterDeliveries=function(name,address) {
            var filteredDeliveries = $filter("nameAddressFilter")($scope.unFilteredDeliveries, name, address);
            $scope.deliveries=filteredDeliveries;
            
        }

        function init() {
            dataService.initialize().then(function(p) {
                $scope.updateDeliveries();
            });
        }
            
        init();
    };

    DeliveriesController.$inject = ['$scope', '$location', '$filter', 'dataService', 'modalService'];

    angular.module('deliveryApp').controller('DeliveriesController', DeliveriesController);

}());
