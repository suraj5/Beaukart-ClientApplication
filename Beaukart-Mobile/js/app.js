angular.module('ionicApp', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'MenuCtrl'
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "tabs.html"
        }
      }
    })
    .state('menu.tabs.buttons', {
      url: "/buttons",
      views: {
        'buttons-tab': {
          templateUrl: "buttons.html",
          controller: 'ButtonsTabCtrl'
        }
      }
    })
    .state('menu.tabs.list', {
      url: "/list",
      views: {
        'list-tab': {
          templateUrl: "list.html",
          controller: 'ListCtrl'
        }
      }
    })
    .state('menu.tabs.item', {
      url: "/item",
      views: {
          'item-tab': {
          templateUrl: "item.html"
        }
      }
    })
   .state('menu.tabs.exedash', {
       url: "/exedash",
       views: {
           'exedash-tab': {
               templateUrl: "exedash.html"
           }
       }
   })
    .state('menu.tabs.prodlis', {
        url: "/prodlis",
      views: {
          'list-tab': {
            templateUrl: "prodlis.html",
			controller: 'dataCtrl'
        }
      }
    })
	.state('menu.tabs.prodlis1', {
        url: "/prodlis1",
      views: {
          'list-tab': {
            templateUrl: "prodlis1.html"
        }
      }
    })
	.state('menu.tabs.prod1', {
        url: "/prod1",
      views: {
          'list-tab': {
            templateUrl: "prod1.html"
			
        }
      }
    })
	.state('menu.tabs.prod2', {
        url: "/prod2",
      views: {
          'list-tab': {
            templateUrl: "prod2.html"
        }
      }
    })
    .state('menu.keyboard', {
      url: "/keyboard",
      views: {
        'menuContent': {
          templateUrl: "keyboard.html"
        }
      }
    })
    .state('menu.slidebox', {
      url: "/slidebox",
      views: {
        'menuContent': {
          templateUrl: "slidebox.html",
          controller: 'SlideboxCtrl'
        }
      }
    })
    .state('menu.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "about.html"
        }
      }
    });

  $urlRouterProvider.otherwise("menu/tab/buttons");

})
.controller('ListCtrl', function ($scope) {

  $scope.data = {
    showDelete: false
  };

  $scope.itemButtons = [
    {
      text: 'Delete',
      type: 'button-assertive',
      onTap: function (item) {
        alert('Delete Item: ' + item.id + ' ?');
      }
    }
  ];

  $scope.onItemDelete = function (item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.items = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    }
  ];

})

.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
    $scope.showPopup = function () {
     $ionicPopup.alert({
       title: 'Popup',
       content: 'This is ionic popup alert!'
     });
    };
    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
          titleText: 'Ionic ActionSheet',
          buttons: [
            {
              text: 'Facebook'
            },
            {
              text: 'Twitter'
            },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index) {
            console.log('BUTTON CLICKED', index);
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
    };
    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
        $scope.modal = modal;
      }, {
        animation: 'slide-in-up'
      });
})

.controller('SlideboxCtrl', function($scope, $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }             
}) 

.controller('dataCtrl', function($scope) {
  
  Parse.initialize("xXXXXXXXXXXXXXXXXXXXXXXXXXXX", "kIR9rHnAHkgfL1jJhozNpQSoPH8xD4wY3LVcUI0k");
  var User = Parse.Object.extend("beaukart");

  function getTodos() {
	  //alert("ss");
    var query = new Parse.Query(User);
    query.find({
      success: function(results) {
        $scope.$apply(function() {
          $scope.users = results.map(function(obj) {
            return {username: obj.get("prod_name"), email: obj.get("prod_category"), parseObject: obj};
          });
        });
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

  getTodos();
  
})
.service('SplitArrayService', function () {
 return {
    SplitArray: function (array, columns) {
        if (array.length <= columns) {
            return [array];          }

        var rowsNum = Math.ceil(array.length / columns);

        var rowsArray = new Array(rowsNum);

        for (var i = 0; i < rowsNum; i++) {
            var columnsArray = new Array(columns);
            for (j = 0; j < columns; j++) {
                var index = i * columns + j;

                if (index < array.length) {
                    columnsArray[j] = array[index];
                } else {
                    break;
                }
            }
            rowsArray[i] = columnsArray;
        }
        return rowsArray;
    }
 }
})
.controller('imageRetrieval',function($scope,SplitArrayService,productService) {
  
  Parse.initialize("xXXXXXXXXXXXXXXXXXXXXXXXXXXX", "kIR9rHnAHkgfL1jJhozNpQSoPH8xD4wY3LVcUI0k");

 
  var User = Parse.Object.extend("beaukart");
var query = new Parse.Query(User);
query.equalTo("prod_category","Sarees");
query.find({
  success: function(gameScore) {

     $scope.$apply(function() {
          $scope.images= gameScore.map(function(obj) {
        
           return{ path: obj.get("img1"),id: obj.get("prod_id")};

          });

   $scope.rows=SplitArrayService.SplitArray($scope.images, 3); } );
    
    // The object was retrieved successfully.
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
}); 

$scope.broadcast1= function(prod_id){
        productService.addProduct(prod_id);
    };
})
.service('productService', function() {
  var productList;

  var addProduct = function(newObj) {
      productList=newObj;
  }

  var getProducts = function(){
      return productList;
  }

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

})

.controller('imageDescryption',function($scope,productService){

var prod_id = productService.getProducts();
		alert(prod_id);
		Parse.initialize("xXXXXXXXXXXXXXXXXXXXXXXXXXXX", "kIR9rHnAHkgfL1jJhozNpQSoPH8xD4wY3LVcUI0k");
  var User = Parse.Object.extend("beaukart");
var query = new Parse.Query(User);
query.equalTo("prod_id",""+prod_id);
query.find({
              success: function(gameScore) {
               
                 $scope.$apply(function() {
                 $scope.data= gameScore.map(function(obj) {
                 	alert(obj.get("description"));

                         return{ path1: obj.get("img1"),path2: obj.get("img2"),path3: obj.get("img3"),descryption: obj.get("description")};

                     });
                   });
                 },
               error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
              }

})

})


.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
              
  $ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up'
  });
 })

  
 .controller('AppCtrl', function() {

  ionic.Platform.ready(function() {

  });

 })


              
              