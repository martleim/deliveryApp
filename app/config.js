//App server url configuration
var appConfig= {
    baseUrl: "http://localhost:8080/deliveryApp/",
	views: "app/views/",
    models: {
		deliveries:'deliveries',
		clients:'clients',
	},
    checkForChanges: "checkForChanges",
	pageSize:10
}
