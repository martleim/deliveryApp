(function () {

    var nameAddressFilter = function () {

        return function (deliveries, name, address) {
            if (!name && !address && name!="" && address!="") return deliveries;

            var matches = [];
            name = (name)?name.toLowerCase():"";
            address = (address)?address.toLowerCase():"";
            for (var i = 0; i < deliveries.length; i++) {
                var delivery = deliveries[i];
                if ((delivery.name.toLowerCase().indexOf(name) > -1 || name=="") &&
                    (delivery.address.toLowerCase().indexOf(address) > -1 || address=="")) {

                    matches.push(delivery);
                }
            }
            return matches;
        };
    };

    angular.module('deliveryApp').filter('nameAddressFilter', nameAddressFilter);

}());