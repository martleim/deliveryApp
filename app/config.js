//App server url configuration
var appConfig= {
    baseUrl: "http://localhost:8080/deliveryApp/",
	views: "app/views/",
    models: {
		deliveries:'deliveries',
		clients:'clients',
		mapElements:'mapElements'
	},
    checkForChanges: "checkForChanges",
	pageSize:10,
	googleMapKey: 'AIzaSyDU6M_rItUjf0BuTi-x63SeqpxAanfH5Rg'
}
