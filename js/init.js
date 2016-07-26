(function($){

  $(function(){
    $('.button-collapse').sideNav();
  }); // end of document ready
  
  var groceries = 5;
  var groceryorder = 10;
  var customers = 1;
  var groceryvalue = 5;
  var money = 0;
  var grocerybuytime = 5000;
  var newcustomertime = 5000;
  var size = 1000;
  var maxcustomers = 10;
  

  var newcust = setInterval(newcustomer, newcustomertime); 
    function newcustomer() { 
      clearInterval(newcust);
    if (groceries > 0 && customers < maxcustomers) {
        console.log(newcustomertime + " New Customer");  
        customers = customers + 1;
        newcustomertime = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000 - size;
        $("#customers").text(customers);
        newcust = setInterval(newcustomer, newcustomertime);
      } else if (groceries == 0 && customers > 0){
          console.log(newcustomertime + " Loss Customer");
          customers = customers - 1;
          newcustomertime = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000 - size;
          $("#customers").text(customers);
          newcust = setInterval(newcustomer, newcustomertime);
      }            
    }
    newcustomer();
    

    
  var grocerbuy = setInterval(boughtgrocery, grocerybuytime); 
    function boughtgrocery() { 
      clearInterval(grocerbuy);

      if (groceries > 0 && customers > 0){
        var cust = setInterval(customer, 50);
        function customer() {
          clearInterval(cust);
          groceries = groceries - 1;
          console.log(grocerybuytime + " Bought Groceries");          
          money = money + groceryvalue;
          $("#money").text(money);
          $("#grocer-text p").text(groceries);
          customers = customers - 1;
          $("#customers").text(customers);
        }
      } 

      grocerybuytime = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000;
      grocerbuy = setInterval(boughtgrocery, grocerybuytime);
    }
    boughtgrocery();

  
  $("#order-groceries-b").click(function() {
    var width = 0;
    if ( $(this).is(".disabled") ) {
    } else {
      var id = setInterval(frame, 50);
      $("#order-groceries-b").addClass("disabled");
      function frame() {
          if (width >= 100) {
              clearInterval(id);
              $("#order-groceries-p").css("width", '0%');
              groceries = groceries + groceryorder;
              $("#grocer-text p").text(groceries);
              $( "#order-groceries-b" ).removeClass("disabled");
          } else {
              width++; 
              $("#order-groceries-p").css("width", width + '%'); 
          }
      }
    }
  });

  $( "#stock-groceries-b" ).click(function() {
    groceryorder = groceryorder + 10;
  });
})(jQuery); // end of jQuery name space