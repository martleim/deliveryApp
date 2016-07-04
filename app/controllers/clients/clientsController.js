(function () {

    var ClientsController = function ($scope, $location, $filter, dataService, modalService) {

        $scope.clients = [];
        $scope.unFilteredClients = [];
        
        $scope.addressSearchText = null;
        $scope.nameSearchText = null;
        
        $scope.clientsGridConfig={
            data:"clients",
            columns:[{name:"name",label:"Nombre", width:"30%", sortable:true, sortFunction:function(a,b) { return a.name<b.name; }},
                    {name:"address",label:"Direccion", width:"30%"},
                    {name:"telephone",label:"Telefono", width:"30%"/*,cellRenderer:function(row){ 
                        return row.phone;
                    }*/ },
                    {name:"name",label:"", width:"10%",cellRenderer:"<button type='button' class='btn btn-danger glyphicon glyphicon-remove-sign' style='margin-right:8px;height:30px' ng-click='delete(row)'></button><button type='button' class='btn btn-primary glyphicon glyphicon-pencil' style='margin-right:8px;height:30px' ng-click='editClient(row)'></button>"}]
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
                $scope.updateClients();
            }
        };
        
        $scope.nextPage = function () {
            $scope.pageChanged($scope.currentPage+1);
        };
        
        $scope.lastPage = function () {
            $scope.pageChanged($scope.currentPage-1);
        };

        $scope.delete = function (client) {
            
            var name = client.name;

            var modalOptions = {
                closeButtonText: 'Cancelar',
                actionButtonText: 'Eliminar Cliente',
                headerText: 'Eliminar ' + name + '?',
                bodyText: 'Esta seguro que desea eliminar este Cliente?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    dataService.clientsService.deleteClient(name);
                    $scope.updateClients();
                }
            });
        };
        
        $scope.editClient=function(client){
            $location.path("/clientedit/"+client.name);
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };

        $scope.searchTextChanged = function () {
            this.filterClients($scope.nameSearchText, $scope.addressSearchText);
        };

        $scope.updateClients = function(){
            dataService.clientsService.getClients(this.currentPage,this.pageSize).then(function(res){
				res=res.data;
				$scope.clients=res.results;
				$scope.unFilteredClients=$scope.clients;

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
        
        

        $scope.filterClients=function(name,address) {
            var filteredClients = $filter("nameAddressFilter")($scope.unFilteredClients, name, address);
            $scope.clients=filteredClients;
            
        }

        function init() {
            dataService.clientsService.initialize().then(function(p) {
                $scope.updateClients();
            });
        }
            
        init();
    };

    ClientsController.$inject = ['$scope', '$location', '$filter', 'dataService', 'modalService'];

    angular.module('deliveryApp').controller('ClientsController', ClientsController);

}());
