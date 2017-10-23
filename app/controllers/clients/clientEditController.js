(function () {

    var ClientEditController = function ($rootScope, $scope, $location, $routeParams, $timeout, dataService, modalService) {

        var clientName = ($routeParams.clientName) ? $routeParams.clientName : "",
            timer,
            onRouteChangeOff;

        $scope.client={openTime:"09:00",closeTime:"18:00"};
        $scope.states = [];
        $scope.edit=(clientName && clientName!="");
        $scope.title = ($scope.edit) ? "Editar" : "Agregar";
        $scope.buttonText = ($scope.edit) ? "Guardar" : "Agregar";
        $scope.updateStatus = false;
        $scope.errorMessage = "";
        $scope.sameAsAdministrative = false;

        init();

        $scope.save = function () {
            if ($scope.editForm.$valid) {
                var clientToSave = angular.copy($scope.client);
                
                processSuccess();
            }
        };

        $scope.delete = function () {
            var name = $scope.client.name;

            var modalOptions = {
                closeButtonText: 'Cancelar',
                actionButtonText: 'Eliminar Client',
                headerText: 'Eliminar ' + name + '?',
                bodyText: 'Esta seguro que desea eliminar este Client?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    dataService.clientsService.deleteClient(name);
                    $scope.updateClients();
                }
            });
        };
        
        function parseTimeToDate(time){
            var splited=time.split(":");
            var d=new Date();
            d.setHours(splited[0]);
            d.setMinutes(splited[1]);
            return d;
        }
        
        function parseDateToTime(d){
            var addZero=function(number){
                var str=number+"";
                if(str.length==1){
                    str="0"+str;
                }
                return str;
            }
            return (addZero(d.getHours())+":"+addZero(d.getMinutes()));
        }

        function init() {
			dataService.clientsService.getClient(clientName).then(function(ret){
				
				if (clientName != "") {
					$scope.client = angular.copy(ret.data.result);
				}
				onRouteChangeOff = $rootScope.$on('$locationChangeStart', routeChange);
				
			})
            
        }
        
        $scope.navigate = function (url) {
            $location.path(url);
        };

        function routeChange(event, newUrl) {
            //Navigate to newUrl if the form isn"t dirty
            if (!$scope.editForm.$dirty) return;

            var modalOptions = {
                closeButtonText: "Cancelar",
                actionButtonText: "Ignorar Cambios",
                headerText: "Cambios sin guardar",
                bodyText: "Tiene cambios sin guardar. Quiere abandonar la pagina?"
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === "ok") {
                    onRouteChangeOff(); //Stop listening for location changes
                    $location.path(newUrl); //Go to page they"re interested in
                }
            });

            //prevent navigation by default since we"ll handle it
            //once the user selects a dialog option
            event.preventDefault();
            return;
        }

        function processSuccess() {
            $scope.editForm.$dirty = false;
            $scope.updateStatus = true;
            $scope.title = "Editar";
            $scope.buttonText = "Guardar";
            $scope.edit=true;
            startTimer();
        }

        function startTimer() {
            timer = $timeout(function () {
                $timeout.cancel(timer);
                $scope.errorMessage = '';
                $scope.updateStatus = false;
                $scope.navigate('/clients');
            }, 1000);
        }

    };

    ClientEditController.$inject = ["$rootScope", "$scope", "$location", "$routeParams",
                                      "$timeout", "dataService", "modalService"];

    angular.module("deliveryApp").controller("ClientEditController", ClientEditController);

}());