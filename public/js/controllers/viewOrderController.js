app.controller('ViewOrderController', function($scope, $timeout, Order, ngDialog){
    
    /*
    $scope.burgers = [];
    $scope.hotdogs = [];
    $scope.chickens = [];
    $scope.errors = "";
    
    var orders = Order.query();
    for(order in orders) {
        if(order.type == 'burger') {
            $scope.burgers.push(order);
        }
        else if(order.type == 'hotdog') {
            $scope.hotdogs.push(order);
        }
        else if(order.type == 'chicken') {
            $scope.chickens.push(order);
        }
        else {
            $scope.errors += "\nUnknown type + " order.type;
        }
    }*/
    
    $scope.delete = function(orderId) {
        Order.remove({id : orderId}, function(data){
            if(data.success) {
                $scope.reload();
            }
            else {
                ngDialog.open({
                    template: '<h4>' + data.message + '</h4>',
                    plain: true
                });
            }
        });
    };
    
    $scope.reload = function() {
        Order.query(function(data) {
            $scope.orders = data;
            $scope.time = new Date();
        });

        //refresh itself every 2 seconds
        $timeout(function(){
            $scope.reload();
        },2000)
    };
    $scope.reload();
});