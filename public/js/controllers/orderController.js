app.controller('OrderController', function($scope, Order, ngDialog){
    
    //hamburgers
    function resetBurger() {
        $scope.burgerChecked = false;
        $scope.americanCheese = 0;
        $scope.swissCheese = 0;
        $scope.cheddarCheese = 0;
        $scope.numBurger = 1;
    }
    
    $scope.addBurger = function() {
        $scope.currentOrder.push({
            type:                   "burger",
            americanCheese:   $scope.americanCheese,
            swissCheese:   $scope.swissCheese,
            cheddarCheese:   $scope.cheddarCheese,
            num:                    $scope.numBurger
        });
        $scope.currentOrderStr += $scope.numBurger + " burger(s)";
        if($scope.americanCheese > 0 || $scope.swissCheese > 0 || $scope.cheddarCheese > 0) {
                $scope.currentOrderStr += " with:";
                if($scope.americanCheese > 0 ) {
                    $scope.currentOrderStr += "\n\t" + $scope.americanCheese + " slices of american cheese";
                }
                if($scope.swissCheese > 0 ) {
                    $scope.currentOrderStr += "\n\t" + $scope.swissCheese + " slices of swiss cheese";
                }
                if($scope.cheddarCheese > 0 ) {
                    $scope.currentOrderStr += "\n\t" + $scope.cheddarCheese + " slices of cheddar cheese";
                }
        }
        else {
            $scope.currentOrderStr += " with no cheese";
        }
        
        $scope.currentOrderStr += "\n\n";
        resetBurger();
    }
        
    //hot dogs
    function resetHotDogs() {
        $scope.hotDogChecked = false;
        $scope.dogType = "burnt";
        $scope.numDogs = 1;
    }
    
    $scope.addHotDogs = function() {
        $scope.currentOrder.push({
            type:                   "hotdog",
            cooked:                 $scope.dogType,
            num:                    $scope.numDogs
        });
        $scope.currentOrderStr += $scope.numDogs + " hot dog(s) cooked " + $scope.dogType;
        $scope.currentOrderStr += "\n\n";
        resetHotDogs();
    }
    
        
    //chicken
    function resetChicken() {
        $scope.chickenChecked = false;
        $scope.chickenType = "plain";
        $scope.numChicken = 1;
    }
    
    $scope.addChicken = function() {
        $scope.currentOrder.push({
            type:                   "chicken",
            sauce:                  $scope.chickenType,
            num:                    $scope.numChicken
        });
        if($scope.chickenType == "plain") {
            $scope.currentOrderStr += $scope.numChicken + " grilled chicken thigh(s)";
        }
        else {
            $scope.currentOrderStr += $scope.numChicken + " chicken thigh(s) with " + $scope.chickenType;
        }
        $scope.currentOrderStr += "\n\n";
        resetChicken();
    }
    
    //expose reset order to web page for clear order button
    $scope.resetOrder = function() {
        $scope.currentOrderStr = "";
        $scope.currentOrder = [];
        $scope.name = "";
        $scope.notes = "";
    }
    

    function resetAll() {
        resetBurger();
        resetHotDogs();
        resetChicken();
        $scope.resetOrder();  
    }

    //expose send order to web page for send order button
    $scope.sendOrder = function() {
        if(!$scope.name) {
            ngDialog.open({
                template: '<h4>Please enter your name in form before submitting order</h4>',
                plain: true
            });
        }
        else {
            //post to database
            var order = new Order();
            order.name = $scope.name;
            order.notes = $scope.notes;
            order.orders = $scope.currentOrderStr;
            
            Order.save(order, function(resp, headers){
                //success callback
                ngDialog.open({
                    template: '<h4>' + resp.message + '</h4>',
                    plain: true
                });
                resetAll();
            },
            function(err){
                // error callback
                ngDialog.open({
                    template: '<h4>ERROR: ' + resp.message + '</h4>',
                    plain: true
                });
                resetAll();
            });
        }
    }
    
    //to start, reset all
    resetAll();
});