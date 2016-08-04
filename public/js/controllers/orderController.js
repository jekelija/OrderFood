app.controller('OrderController', function($scope, $http, ngDialog){
    
    //hamburgers
    function resetBurger() {
        $scope.burgerChecked = false;
        $scope.americanCheese = 0;
        $scope.swissCheese = 0;
        $scope.cheddarCheese = 0;
        $scope.numBurger = 1;
    }
    
    $scope.addBurger = function() {
        var burger = {
                type:"Burger",
                num:$scope.numBurger,
                americanCheese:$scope.americanCheese,
                swissCheese:$scope.swissCheese,
                cheddarCheese:$scope.cheddarCheese
        };
        $scope.currentOrder.push(burger);
        $scope.currentOrderStr += burger.num + " burger(s)";
        if(burger.americanCheese > 0 || burger.swissCheese > 0 || burger.cheddarCheese > 0) {
                $scope.currentOrderStr += " with:";
                if(burger.americanCheese > 0 ) {
                    $scope.currentOrderStr += "\n\t" + burger.americanCheese + " slices of american cheese";
                }
                if(burger.swissCheese > 0 ) {
                    $scope.currentOrderStr += "\n\t" + burger.swissCheese + " slices of swiss cheese";
                }
                if(burger.cheddarCheese > 0 ) {
                    $scope.currentOrderStr += "\n\t" + burger.cheddarCheese + " slices of cheddar cheese";
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
        $scope.dogType = "burntDog";
        $scope.numDogs = 1;
    }
    
    $scope.addHotDogs = function() {
        var hotDog = {
                type:"Hot Dog",
                num:$scope.numDogs,
                type:$scope.dogType
        };
        $scope.currentOrder.push(hotDog);
        $scope.currentOrderStr += hotDog.num + " hot dog(s) cooked " + $scope.dogType;
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
        var chicken = {
                type:"Chicken",
                num:$scope.numChicken,
                type:$scope.chickenType
        };
        $scope.currentOrder.push(chicken);
        if($scope.chickenType == "plain") {
            $scope.currentOrderStr += chicken.num + " grilled chicken thigh(s)";
        }
        else {
            $scope.currentOrderStr += chicken.num + " chicken thigh(s) with " + $scope.chickenType;
        }
        $scope.currentOrderStr += "\n\n";
        resetChicken();
    }
    
    //order
    function resetOrder() {
        $scope.currentOrderStr = "";
        $scope.currentOrder = [];
    }
    

    function resetAll() {
        resetBurger();
        resetHotDogs();
        resetChicken();
        resetOrder();  
    }
    
    //to start, reset all
    resetAll();
});