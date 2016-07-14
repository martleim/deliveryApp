(function () {

    var MapController = function ($scope, $location, $filter, dataService, modalService, uiGmapGoogleMapApi) {

		var scope=$scope;
		uiGmapGoogleMapApi.then(function(maps) {
    $scope.googleVersion = maps.version;
    maps.visualRefresh = true;
    $scope.map.rectangle.bounds = new maps.LatLngBounds(
      new maps.LatLng(55,-100),
      new maps.LatLng(49,-78)
    );
    $scope.map.polylines = [
    {
      id: 1,
      path: [
        {
          latitude: 45,
          longitude: -74
        },
        {
          latitude: 30,
          longitude: -89
        },
        {
          latitude: 37,
          longitude: -122
        },
        {
          latitude: 60,
          longitude: -95
        }
      ],
      stroke: {
        color: '#6060FB',
        weight: 3
      },
      editable: true,
      draggable: true,
      geodesic: true,
      visible: true,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
          },
          offset: '25px',
          repeat: '50px'
        }
      ]
    },
    {
      id: 2,
      path: [
        {
          latitude: 47,
          longitude: -74
        },
        {
          latitude: 32,
          longitude: -89
        },
        {
          latitude: 39,
          longitude: -122
        },
        {
          latitude: 62,
          longitude: -95
        }
      ],
      stroke: {
        color: '#6060FB',
        weight: 3
      },
      editable: true,
      draggable: true,
      geodesic: true,
      visible: true,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
          },
          offset: '25px',
          repeat: '50px'
        }
      ]
    }];
  });
	
	
	
	$scope.map= {
		height:'150px',
      show: true,
      control: {},
      version: "uknown",
      heatLayerCallback: function (layer) {
        //set the heat layers backend data
        var mockHeatLayer = new MockHeatLayer(layer);
      },
      showTraffic: true,
      showBicycling: false,
      showWeather: false,
      showHeat: false,
      center: {
        latitude: -34.5,
        longitude: -55
      },
      options: {
        streetViewControl: false,
        panControl: false,
        maxZoom: 20,
        minZoom: 3
      },
      zoom: 8,
      dragging: false,
      bounds: {},
      markers: [
        {
          id: 1,
          latitude: 45,
          longitude: -74,
          showWindow: false,
          options: {
            animation: 1,
            labelContent: 'Markers id 1',
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        },
        {
          id: 2,
          latitude: 15,
          longitude: 30,
          showWindow: false,
        },
        {
          id: 3,
          icon: 'assets/images/plane.png',
          latitude: 37,
          longitude: -122,
          showWindow: false,
          title: 'Plane',
          options: {
            labelContent: 'Markers id 3',
            labelAnchor: "26 0",
            labelClass: "marker-labels"
          }
        }
      ],
      markers2: [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 46,
          longitude: -77,
          showWindow: false,
          options: {
            labelContent: '[46,-77]',
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 33,
          longitude: -77,
          showWindow: false,
          options: {
            labelContent: 'DRAG ME!',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: true
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 35,
          longitude: -125,
          showWindow: false,
          options: {
            labelContent: '[35,-125]',
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        }
      ],
      mexiIdKey: 'mid',
      mexiMarkers: [
        {
          mid: 1,
          latitude: 29.302567,
          longitude: -106.248779,

        },
        {
          mid: 2,
          latitude: 30.369913,
          longitude: -109.434814,
        },
        {
          mid: 3,
          latitude: 26.739478,
          longitude: -108.61084,
        }
      ],
      clickMarkers: [
        {id: 1, "latitude": 50.948968, "longitude": 6.944781},
        {id: 2, "latitude": 50.94129, "longitude": 6.95817},
        {id: 3, "latitude": 50.9175, "longitude": 6.943611}
      ],
      dynamicMarkers: [],
      randomMarkers: [],
      doClusterRandomMarkers: true,
      currentClusterType: 'standard',
      /*clusterTypes: clusterTypes,
      selectClusterType: selectClusterType,
      selectedClusterTypes: selectedClusterTypes,
      clusterOptions: selectedClusterTypes.standard,*/
      clickedMarker: {
        id: 0,
        options:{
        },
		nulled:true
      },
      events: {
//This turns of events and hits against scope from gMap events this does speed things up
// adding a blacklist for watching your controller scope should even be better
//        blacklist: ['drag', 'dragend','dragstart','zoom_changed', 'center_changed'],
        tilesloaded: function (map, eventName, originalEventArgs) {
        },
        click: function (mapModel, eventName, originalEventArgs) {
          // 'this' is the directive's scope
          console.log("user defined event: " + eventName, mapModel, originalEventArgs);

          var e = originalEventArgs[0];
          var lat = e.latLng.lat(),
            lon = e.latLng.lng();
          $scope.map.clickedMarker = {
            id: 0,
            options: {
              labelContent: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
              labelClass: "marker-labels",
              labelAnchor:"50 0"
            },
            latitude: lat,
            longitude: lon
          };
          //scope apply required because this event handler is outside of the angular domain
          $scope.$evalAsync();
        },
        dragend: function () {
          
        }
      },
      infoWindow: {
        coords: {
          latitude: 36.270850,
          longitude: -44.296875
        },
        options: {
          disableAutoPan: true
        },
        show: false
      },
      infoWindowWithCustomClass: {
        coords: {
          latitude: 36.270850,
          longitude: -44.296875
        },
        options: {
          boxClass: 'custom-info-window',
          closeBoxDiv: '<div" class="pull-right" style="position: relative; cursor: pointer; margin: -20px -15px;">X</div>',
          disableAutoPan: true
        },
        show: true
      },
      templatedInfoWindow: {
        coords: {
          latitude: 48.654686,
          longitude: -75.937500
        },
        options: {
          disableAutoPan: true
        },
        show: true,
        //templateUrl: 'assets/templates/info.html',
        templateParameter: {
          message: 'passed in from the opener'
        }
      },
      circles: [
        {
          id: 1,
          center: {
            latitude: 44,
            longitude: -108
          },
          radius: 500000,
          stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
          },
          fill: {
            color: '#08B21F',
            opacity: 0.5
          },
          geodesic: true, // optional: defaults to false
          draggable: true, // optional: defaults to false
          clickable: true, // optional: defaults to true
          editable: true, // optional: defaults to false
          visible: true, // optional: defaults to true
          events:{
            dblclick: function(){
              window.alert("circle dblclick");
            }
          }
        }
      ],
      rectangle:{
        bounds:{},
        stroke: {
          color: '#08B21F',
          weight: 2,
          opacity: 1
        },
        fill: {
          color: 'pink',
          opacity: 0.5
        },
        events:{
          dblclick: function(){
            window.alert("rectangle dblclick");
          }
        },
        draggable: true, // optional: defaults to false
        clickable: true, // optional: defaults to true
        editable: true, // optional: defaults to false
        visible: true // optional: defaults to true
      },
      polygonEvents:{
        dblclick:function(){
          alert("Polgon Double Clicked!");
        }
      },
      polygons: [
        {
          id: 1,
          path: [
            {
              latitude: 50,
              longitude: -80
            },
            {
              latitude: 30,
              longitude: -120
            },
            {
              latitude: 20,
              longitude: -95
            }
          ],
          stroke: {
            color: '#6060FB',
            weight: 3
          },
          editable: true,
          draggable: true,
          geodesic: false,
          visible: true,
          fill: {
            color: '#ff0000',
            opacity: 0.8
          }
        }
      ],
      polygons2: [
        {
          id: 1,
          path: [
            {
              latitude: 60,
              longitude: -80
            },
            {
              latitude: 40,
              longitude: -120
            },
            {
              latitude: 45,
              longitude: -95
            }
          ],
          stroke: {
            color: '#33CDDC',
            weight: 3
          },
          editable: true,
          draggable: true,
          geodesic: false,
          visible: true,
          fill: {
            color: '#33CCCC',
            opacity: 0.8
          }
        }
      ],
      polylines: []
    };
	
	
        $scope.clients = [];
        $scope.unFilteredClients = [];
        
        $scope.addressSearchText = null;
        $scope.nameSearchText = null;
        
        $scope.clientsGridConfig={
            data:"clients",
            columns:[{name:"name",label:"Nombre", width:"30%", sortable:true, sortFunction:function(a,b) { return a.name<b.name; }},
                    {name:"address",label:"Direccion", width:"30%"},
                    {name:"phone",label:"Telefono", width:"20%" },
					{name:"gender",label:"Sexo", width:"10%" ,cellRenderer:function(row){ 
                        return (row.gender=='f')?'Mujer':'Hombre';
                    } },
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

    MapController.$inject = ['$scope', '$location', '$filter', 'dataService', 'modalService', 'uiGmapGoogleMapApi'];

    angular.module('deliveryApp').controller('MapController', MapController);

}());
