(function($){

  $(function(){
    $('.button-collapse').sideNav();
  }); // end of document ready
  
  var stocked = 5;
  var groceries = 0;
  var customers = 3;
  var checkoutcustomers = 0;
  var grocerycost = 2;
  var groceryvalue = 5;
  var maxorder = 20;
  var maxstock = 50;
  var money = 200;
  var grocerybuytime = 5000;
  var newcustomertime = 5000;
  var customercheckouttime = 8000;
  var size = 1000;
  var maxcustomers = 10;
  var newcust = setInterval(newcustomer, newcustomertime);
  var grocerbuy = setInterval(boughtgrocery, grocerybuytime);
  var checktimer = setInterval(tocheckout, customercheckouttime);



    function tocheckout() { 
      clearInterval(checktimer);
      if (stocked > 0 && customers > 0) {
        console.log(customercheckouttime + " Checkout Customer");  
        customers = customers - 1;
        checkoutcustomers = checkoutcustomers + 1;
      } else if (stocked == 0 && checkoutcustomers > 0){
          console.log(customercheckouttime + " Loss Checkout Customer");
          checkoutcustomers = checkoutcustomers - 1;
      }
      
      customercheckouttime = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000 - size;
      $("#checkout").text(checkoutcustomers);
      checktimer = setInterval(tocheckout, customercheckouttime);
    }
  
    function newcustomer() { 
      clearInterval(newcust);
      if (stocked > 0 && (customers + checkoutcustomers) < maxcustomers) {
        console.log(newcustomertime + " New Customer");  
        customers = customers + 1;
      } else if (stocked == 0 && customers > 0){
          console.log(newcustomertime + " Loss Customer");
          customers = customers - 1;
      }
      newcustomertime = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000 - size;
      $("#customers").text(customers);
      newcust = setInterval(newcustomer, newcustomertime);
    }
    



    function boughtgrocery() { 
      clearInterval(grocerbuy);
      if (stocked > 0 && checkoutcustomers > 0){
        var cust = setInterval(customer, 50);
        function customer() {
          clearInterval(cust);
          stocked = stocked - 1;
          console.log(grocerybuytime + " Bought Groceries");          
          money = money + groceryvalue;
          $("#money").text(money);
          $("#stocked").text(stocked);
          checkoutcustomers = checkoutcustomers - 1;
          $("#checkout").text(checkoutcustomers);
        }
      } 
      grocerybuytime = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000;
      grocerbuy = setInterval(boughtgrocery, grocerybuytime);
    }
    
  
  $("#order-groceries-b").click(function() {
    var width = 0;
    var grocerdiff = maxstock - (groceries + stocked);
    if ( $(this).is(".disabled") ) {
    } else {
      var id = setInterval(frame, 50);
      $("#order-groceries-b").addClass("disabled");
      function frame() {
          if (width >= 100) {
              clearInterval(id);
              $("#order-groceries-p").css("width", '0%');
      if (grocerdiff < maxorder){
              groceries = groceries + grocerdiff;
              money = money - (grocerdiff * grocerycost);
              $("#money").text(money);
        } else {
              groceries = groceries + maxorder;
              money = money - (maxorder * grocerycost);
              $("#money").text(money);
      }
              $("#warehouse").text(groceries);
              $( "#order-groceries-b" ).removeClass("disabled");
          } else {
              width++; 
              $("#order-groceries-p").css("width", width + '%'); 
          }
      }
    }
  });


  $("#stock-groceries-b").click(function() {
    var width = 0;
    if ( $(this).is(".disabled") ) {
    } else if (groceries > 0 ) {
      var id = setInterval(frame, 50);
      $("#stock-groceries-b").addClass("disabled");
      function frame() {
          if (width >= 100) {
              clearInterval(id);
              $("#stock-groceries-p").css("width", '0%');
              groceries = groceries - 1;
              stocked = stocked + 1;
              $("#warehouse").text(groceries);
              $("#stocked").text(stocked);
              $( "#stock-groceries-b" ).removeClass("disabled");
          } else {
              width = width + 3; 
              $("#stock-groceries-p").css("width", width + '%'); 
          }
      }
    }
  });

    $("#checkout-groceries-b").click(function() {
    var width = 0;
    var grocerdiff = maxstock - groceries;
    if ( $(this).is(".disabled") ) {
    } else {
      var id = setInterval(frame, 50);
      $("#checkout-groceries-b").addClass("disabled");
      function frame() {
          if (width >= 100) {
              clearInterval(id);
              $("#checkout-groceries-p").css("width", '0%');
      if (grocerdiff < maxorder){
              groceries = groceries + grocerdiff;
              money = money - (grocerdiff * grocerycost);
              $("#money").text(money);
        } else {
              groceries = groceries + maxorder;
              money = money - (maxorder * grocerycost);
              $("#money").text(money);
      }
              $("#stocked").text(groceries);
              $( "#checkout-groceries-b" ).removeClass("disabled");
          } else {
              width++; 
              $("#checkout-groceries-p").css("width", width + '%'); 
          }
      }
    }
  });
  
})(jQuery); // end of jQuery name space