(function () {

    var DeliveryEditController = function ($rootScope, $scope, $location, $routeParams, $timeout, dataService, modalService) {

        var deliveryName = ($routeParams.deliveryName) ? $routeParams.deliveryName : "",
            timer,
            onRouteChangeOff;

        $scope.delivery={openTime:"09:00",closeTime:"18:00"};
        $scope.states = [];
        $scope.edit=(deliveryName && deliveryName!="");
        $scope.title = ($scope.edit) ? "Editar" : "Agregar";
        $scope.buttonText = ($scope.edit) ? "Guardar" : "Agregar";
        $scope.updateStatus = false;
        $scope.errorMessage = "";
        $scope.sameAsAdministrative = false;

        init();

        $scope.save = function () {
            if ($scope.editForm.$valid) {
                var deliveryToSave = angular.copy($scope.delivery);
                deliveryToSave.openTime=parseDateToTime($scope.delivery.openTime);
                deliveryToSave.closeTime=parseDateToTime($scope.delivery.closeTime);
                if (!this.edit) {
                    dataService.insertDelivery(deliveryToSave);
                }
                else {
                    dataService.updateDelivery(deliveryName,deliveryToSave);
                }
                processSuccess();
            }
        };

        $scope.delete = function () {
            var name = $scope.delivery.name;

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
			dataService.getDelivery(deliveryName).then(function(ret){
				
				if (deliveryName != "") {
					$scope.delivery = angular.copy(ret.data.result);
				}
				if($scope.delivery){
					$scope.delivery.openTime=parseTimeToDate($scope.delivery.openTime);
					$scope.delivery.closeTime=parseTimeToDate($scope.delivery.closeTime);
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
                $scope.navigate('/deliveries');
            }, 1000);
        }

    };

    DeliveryEditController.$inject = ["$rootScope", "$scope", "$location", "$routeParams",
                                      "$timeout", "dataService", "modalService"];

    angular.module("deliveryApp").controller("DeliveryEditController", DeliveryEditController);

}());