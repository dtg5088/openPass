$(document).ready(function(){
  //firebase
  var config = {
    apiKey: "AIzaSyCQWVdvWZy4M8RnmhKxgZzPfkBkrFjc_PM",
    authDomain: "openpassproject.firebaseapp.com",
    databaseURL: "https://openpassproject.firebaseio.com",
    projectId: "openpassproject",
    storageBucket: "openpassproject.appspot.com",
    messagingSenderId: "724908116860"
  };
  firebase.initializeApp(config);
  $("#sign-up").click(function(){
    userScript();
  });
  function userScript() {
    var userArray = firebase.database().ref("messages");
    $("#newUser").submit(function(config) {
      var name = $("#name").val(),
      email = $("#email").val(),
      user = { name: name, email: email };
      return (
        userArray.push(user).then(function(config) {
          $(".sucess").css("display", "block");
          $(".sucess-none").css("display", "none");
        }),
        !1
      );
    });
  }


  ///////// Ticket Mater API code\\\\\\\\\
  // function to search input on enter button 
  $("#searchAnswer").keypress(function(e){
    var key = e.which;
    if(key===13){
      $('#button-addon1').click();
    }
  });


  //button to call search input
  $(".bttn").on("click", function() {

  $("thead").show();
  $("tbody").empty();

  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";

  var queryParams = {
    apikey: "5nZJDSauBALuj0OgmSYzyoIc2avzLxba",
    keyword: " ",
    size: 200,
  };

  var genre = $(".search-input").val().trim();
    
  queryParams.keyword = genre;
  var restofQuery = $.param(queryParams);
  queryURL += restofQuery;
  console.log(queryURL);

  //AJAX call to the Ticketmaster API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data){
      //console.log(data);
      getEvents(data);
  });

  function getEvents(data){
      console.log(data);

      var results = data._embedded.events;

      for (var i = 1; i < results.length; i++){
      //location information
      var eventName = data._embedded.events[i].name;
      var dataDate = moment(data._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MMM-D-YYYY");
      var venue = data._embedded.events[i]._embedded.venues[0].name;
      var address;
      var city = data._embedded.events[i]._embedded.venues[0].city.name;
      var zip = data._embedded.events[i]._embedded.venues[0].postalCode;
      var state;
      //var latitude = data._embedded.events[i]._embedded.venues[0].location.latitude;
      //var longitude = data._embedded.events[i]._embedded.venues[0].location.longitude;
      var time = moment(data._embedded.events[i].dates.start.localTime, "HH:mm:ss").format("hh:mm A");
      var eventURL = data._embedded.events[i].url;

      // ---Comparrision on state Code for availability and accurate data 
      if (data._embedded.events[i]._embedded.venues[0].address.line1 != null) {
        address = data._embedded.events[i]._embedded.venues[0].address.line1;
      } 
      else {
        address = "Address not found";
      }
      
      // price range variables--Comparrision for accurate date 
      var priceRange;
      if (data._embedded.events[1].priceRanges != null) {
        priceRange = "$"+data._embedded.events[1].priceRanges[0].min+" - $"+data._embedded.events[1].priceRanges[0].max+" "+data._embedded.events[1].priceRanges[0].currency;
      }
      else {
        priceRange = "Not-Avaiable";
      }
      
    // ---Comparrision on state Code for availability and accurate data 
      // if (data._embedded.events[i]._embedded.venues[0].state.stateCode != null) {
      //   state = data._embedded.events[i]._embedded.venues[0].state.stateCode;
      // } 
      // else {
      //   state = " ";
      // }

      // address full 
      var addressFull = address +" "+city+", "/*+state*/+ " "+zip;
      //console.log(addressFull);


    var tr = $("<tr>");

    //appending everything into the html body
      var newRow = tr.append(
        $("<td>").text(eventName),
        $("<td>").text(venue),
        $("<td>").text(addressFull),
        $("<td>").text(dataDate),
        $("<td>").text(time),
        $("<td>").text(priceRange),
        $("<button>").text("Get Tix").addClass("clickable").attr("data-url",eventURL),
        $("<button>").text("Get attractions").addClass("yelpclick").attr("data-url","yelpinterface.html").attr("data-city", city),
      );
    
    
      // Append the new row to the table
      $("#event-table > tbody").append(newRow);

    }// end of for loop
  }// end of getEvents Function
  });// end of search button click function 


  //function that redirects the event click to the ticket master application
  $("body").on("click", ".clickable", function() {
      var url = $(this).attr("data-url");
    window.open(url,'_blank');
    });



  // ------------- Catagory button to get events for trending sections------------------\\

  //button to call search input
  $(".catagories").on("click", function() {

    var cataName = $(this).attr("data-genre");
    $("thead").show();
    $("tbody").empty();

  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";

  var queryParams = {
    apikey: "5nZJDSauBALuj0OgmSYzyoIc2avzLxba",
    keyword: " ",
    size: 200,
  };

  var genre = cataName;

  queryParams.keyword = genre;
  var restofQuery = $.param(queryParams);
  queryURL += restofQuery;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data){
      //console.log(data);
      getEvents(data);
  });

  function getEvents(data){
      console.log(data);

      var results = data._embedded.events;

      for (var i = 1; i < results.length; i++){
      //location information
      var eventName = data._embedded.events[i].name;
      var dataDate = moment(data._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MMM-D-YYYY");
      var venue = data._embedded.events[i]._embedded.venues[0].name;
      var address;
      var city = data._embedded.events[i]._embedded.venues[0].city.name;
      var zip = data._embedded.events[i]._embedded.venues[0].postalCode;
      var state;
      //var latitude = data._embedded.events[i]._embedded.venues[0].location.latitude;
      //var longitude = data._embedded.events[i]._embedded.venues[0].location.longitude;
      var time = moment(data._embedded.events[i].dates.start.localTime, "HH:mm:ss").format("hh:mm A");
      var eventURL = data._embedded.events[i].url;
      
      // ---Comparrision on state Code for availability and accurate data 
      if (data._embedded.events[i]._embedded.venues[0].address.line1 != null) {
        address = data._embedded.events[i]._embedded.venues[0].address.line1;
      } 
      else {
        address = "Address not found";
      }
      
      // price range variables--Comparrision for accurate date 
      var priceRange;
      if (data._embedded.events[1].priceRanges != null) {
        priceRange = "$"+data._embedded.events[1].priceRanges[0].min+" - $"+data._embedded.events[1].priceRanges[0].max+" "+data._embedded.events[1].priceRanges[0].currency;
      }
      else {
        priceRange = "Not-Avaiable";
      }
      
    // ---Comparrision on state Code for availability and accurate data 
      // if (data._embedded.events[i]._embedded.venues[0].state.stateCode != null) {
      //   state = data._embedded.events[i]._embedded.venues[0].state.stateCode;
      // } 
      // else {
      //   state = " ";
      // }

      // address full 
      var addressFull = address +" "+city+", "/*+state*/+ " "+zip;
      //console.log(addressFull);


    var tr = $("<tr>");

    //appending everything into the html body
      var newRow = tr.append(
        $("<td>").text(eventName),
        $("<td>").text(venue),
        $("<td>").text(addressFull),
        $("<td>").text(dataDate),
        $("<td>").text(time),
        $("<td>").text(priceRange),
        $("<button>").text("Get Tix").addClass("clickable").attr("data-url",eventURL),
        $("<button>").text("Get attractions").addClass("yelpclick").attr("data-url","yelpinterface.html").attr("data-city", city).attr("data-venue",venue)
      );
    
    
      // Append the new row to the table
      $("#event-table > tbody").append(newRow);

    }// end of for loop
  }// end of getEvents Function
  });// end of search button click function 




  //function that redirects the event click to the ticket master application
  // $("body").on("click", ".yelpclick", function() {
  //   var url = $(this).attr("data-url");
  // window.open(url,'_blank');
  // });

  //on click attraction button - activates yelp api

  $("body").on("click",".yelpclick", function() { 

    $("thead").hide();

    var city= $(this).attr("data-city");
    var venue= $(this).attr("data-venue");
    var cityName = $("<h5>").text("City of - "+city).addClass("cityClass").addClass("yelpClass");
    var venueName = $("<h5>").text("Attractions around - "+venue).addClass("venueClass").addClass("yelpClass");
  

      var category = "american";
      var key =
        "CCqam6P48aTcR7ZlcouEZvO9ibZrlVcnY73Fkx2eCoEZbyKweGuzQW2RNP5OxHR9Xhdpbi2CAYybGFxuPk1RGniw4fGpRrktdGE-MXJzWI5voJRoMH7L-KriU5sVXHYx";
      queryURL =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?category=" +
        category +
        "&location=" +
        city +
        "&size="+
        40;
    
        console.log(city);
      $.ajax({
        url: queryURL,
        headers: {
          Authorization: "Bearer " + key
        },
        method: "GET"
      }).then(function(response) {
        // console.log(response);
        getRestaurants(response);
      });

      function getRestaurants(response){
        console.log(response);
    
        var results = response.businesses;

        $("tbody").empty();
        $("tbody").append(cityName, venueName);
    
        for (var i = 1; i < results.length; i++){
        //location information
      var businessName = results[i].name;
      console.log(businessName);
        var businessAddress = results[i].location.address1;
        console.log(businessAddress);
      var businessPhone = results[i].phone;
      var businessPrice = results[i].price;
      var businessRating = results[i].rating;
      var businessImage = results[i].image_url;

    //   // Append the new row to the table
    //   $("#event-table > tbody").append(newRow);

    var newDivrow = $("<div></div>").addClass("row").addClass("mainrowDiv");
    var newDiv1 = $("<div></div>").addClass("restaurantOptions").addClass("col-md-5");
    var newDiv2 = $("<div></div>").addClass("restaurantImage").addClass("col-md-5");
    // var img = $("<img />",{
    //    src: "businessImage",
  

    newDiv1.append(
      // $("<img />",{src: "businessImage",
      $("<p></p>").text(businessName).addClass("businessName"),
      $("<p></p>").text("Address: "+businessAddress).addClass("yelpPopulate"),
      $("<p></p>").text("Phone number:"+businessPhone).addClass("yelpPopulate"),
      $("<p></p>").text("Price: "+businessPrice).addClass("yelpPopulate"),
      $("<p></p>").text("Stars: "+businessRating).addClass("yelpPopulate"),
    );

    newDiv2.append(
      $("<img></img>").attr("src",businessImage).addClass("restaurantImage"),

    );


  $(newDivrow).append(newDiv1);
    $(newDivrow).append(newDiv2);
    $("tbody").append(newDivrow);

  }

  }

  });

  $('.catagoriesCSS').on("click", function() {
    var url = $(this).attr("data-url");
    var windowName = "popUp";
  window.open(url,windowName);
  });
























  ////////////Google Image Search API\\\\\\\\\\\\\\
  $(".catagories").on("click", function() {
    event.preventDefault();
    var cataName = $(this).attr("data-genre");


    window.onload = function start() {
    // Initializes the client with the API key and the Translate API.
    gapi.client.init({
      'apiKey': "AIzaSyAJfZq_TaqMFU1NBAR8CpRXMauCYI1eb9E",
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
    }).then(function() {
      // Executes an API request, and returns a Promise.
      // The method name `language.translations.list` comes from the API discovery.
      return gapi.client.language.translations.list({
        q: cataName,
        source: 'en',
        target: 'de',
      });
    }).then(function(response) {
      console.log(response.result.data.translations[0].translatedText);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  };

  // Loads the JavaScript client library and invokes `start` afterwards.
  //gapi.load('client', start);
  });


  /*$('<iframe />', {
    src: url,
    id:  'receiver',
    frameborder: 1,
    load:function(){
      //put your code here, so that those code can be make sure to be run after the frame loaded
    }
    }).appendTo('body');

  ///////BING IMAGE SEARCH API\\\\\\\\\
  $(".catagories").on("click", function() {

    var cataName = $(this).attr("data-genre");

    $(".container3").empty();

  var queryURL = "https://www.googleapis.com/customsearch/v1?";

  var queryParams = {
    q: " ",
    apikey: "AIzaSyAJfZq_TaqMFU1NBAR8CpRXMauCYI1eb9E", //google image search apikey AIzaSyAJfZq_TaqMFU1NBAR8CpRXMauCYI1eb9E
    cx: "012130171383477906146:q4jdnajlrds",
    count: 3,
    offset: 2,
    safeSearch: "Moderate",
  };

  var genre = cataName;

  queryParams.q = genre;
  var restofQuery = $.param(queryParams);
  queryURL += restofQuery;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      //console.log(data);
      var data = response.data;
      getImages(data);
  });

  function getImages(data){
    console.log(data);
  }

  });*/


});