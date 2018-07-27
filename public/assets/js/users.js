$(function () {

  var userID = $("#user-id").val();
  //getEvents();

  $(".setup-btn").on("click", function (event) {

    event.preventDefault();

    var id = $(this).data("id");

    console.log("User ID: " + id);

    var newAccount = {
      id: id,
      fname: $("#fname").val().trim(),
      lname: $("#lname").val().trim(),
      phone: $("#phone").val().trim(),
      email: $("#email").val().trim(),
      profilePic: $("#profilepic").val().trim(),
      twitter: $("#twitter").val().trim(),
      facebook: $("#facebook").val().trim(),
      gplus: $("#gplus").val().trim(),
      venue: $("#venue option:selected").val(),
      groupsize: $("#groupsize option:selected").val(),
      eventtype: $("#eventtype option:selected").val(),
    };

    console.log("NEW ACCOUNT CREATED FOR " + newAccount.fname + ".");

    createAccount(newAccount);
  })
});

// This function adds a selected event in our database
function addEvent(info) {
  $.post("/api/events", info, function() {
    alert("Attending Event!");
  });
};

function getEvents(user) {
    userID = user || "";
    if (userID) {
      userID = "/?id=" + userID;
    }
    $.get("/api/events" + userID, function(data) {
      console.log("Events", data);

    for (var i=0; i<data.length; i++) {
        resultPanel = $("<div>").addClass("w3-panel w3-display-container w3-card w3-white");

        resultInfo = $("<div>").addClass("w3-container").attr("id", "result-info")
        resultTitle = $("<h3>").text(data[i].eventTitle);
        resultTime = $("<h6>").text(data[i].eventTime);
        resultVenue = $("<h4>").text(data[i].eventVenue);
        resultInfo.append(resultTitle).append(resultVenue).append(resultTime);

        resultPanel.append(resultInfo);
        $(".event-table").append(resultPanel);
    }
  });
};

// This function updates a todo in our database
function createAccount(info) {
  $.ajax({
    method: "PUT",
    url: "/api/users",
    data: info
  }).then(
    console.log("Account created."),
    location.href = "profile",
  );
};

//THIS CALLS API AFTER CLICKING BUTTON ON DISCOVER PAGE

$(document).on("click", ".get-events", function (e) {

  e.preventDefault();

  document.getElementById("loading").classList.remove("w3-hide");

  EVDB.API.call( "/events/search", oArgs, function (oData) {
      document.getElementById("loading").classList.add("w3-hide");
      id = $("#user-id").val();
      data = JSON.stringify(oData);
      console.log(oData);
      // document.getElementById("results").append(picture);
      console.log("USER SEARCH:");
      // console.log(oData.events.event[0]);
      for ( var i = 0; i < 30; i++ ) {
          var eventObj = [];
          if ( oData.events.event[i].title != null ) {
              eventObj.title = oData.events.event[i].title;

          } if ( oData.events.event[i].city_name != null ) {
              eventObj.city_name = oData.events.event[i].city_name;

          } if ( oData.events.event[i].description != null ) {
              eventObj.description = oData.events.event[i].description;

          } if ( oData.events.event[i].image != null ) {
              eventObj.image = oData.events.event[i].image.medium.url;

          } if ( oData.events.event[i].start_time != null ) {
              eventObj.time = oData.events.event[i].start_time;

          } if ( oData.events.event[i].url != null ) {
              eventObj.eventfulURL = oData.events.event[i].url;

          } if ( oData.events.event[i].venue_name != null ) {
              eventObj.venue = oData.events.event[i].venue_name;

          } if ( oData.events.event[i].venue_url != null ) {
              eventObj.venueURL = oData.events.event[i].venue_url;

          }if (oData.events.event[i].id != null){
              eventObj.id = oData.events.event[i].id;
          }
          eventData.push(eventObj);
          console.log(i+". "+oData.events.event[i].title );
      }
      console.log(eventData);

      for ( var i = 0; i < 15; i++ ) {
          
          resultPanel = $("<div>").addClass("w3-panel w3-display-container w3-card w3-white").attr("onclick","document.getElementById('infoModal').style.display='block'").attr("id", "result-panel").attr("data-id",eventData[i].id).attr("title",eventData[i].title).attr("venue",eventData[i].venue).attr("venueURL",eventData[i].venueURL).attr("city",eventData[i].city_name).attr("time",eventData[i].time).attr("user-id", id);

          resultImageDiv = $("<div>").addClass("w3-container").attr("id", "result-imgDiv");

          resImg = $("<img>").attr("src", eventData[i].image).attr("id", "resImg");
          resultImageDiv.append(resImg);

          resultInfo = $("<div>").addClass("w3-container").attr("id", "result-info")
          resultTitle = $("<h3>").text(eventData[i].title);
          resultTime = $("<h6>").text(eventData[i].time);
          resultVenue = $("<h4>").text(eventData[i].venue);
          resultInfo.append(resultTitle).append(resultVenue).append(resultTime);

          //learnBtn = $("<button>").addClass("w3-btn w3-red w3-text-white w3-display-middle").attr("id", "learn-more-btn").attr("type", "button");
          //resultPanel.append(learnBtn);
          resultPanel.append(resultImageDiv).append(resultInfo);
          $(".result-row").append(resultPanel);
      }
      })     
});
  
$(document).on("click", "#result-panel", function (e) {

  e.preventDefault();

  var id = $(this).data("id");
  var user = $("#user-id").val();
  var title = $(this).attr("title");
  var venue = $(this).attr("venue");
  var city = $(this).attr("city");
  var time = $(this).attr("time");
  var venue_url = $(this).attr("venueURL");
  var img = $("#resImg").attr("src");

  console.log(img);

  console.log(id);

  $("#modalTitle").empty().text(title);
  $("#modalTime").empty().text(time);
  var venueLink = $("#modalVenue").empty().text(venue);
  $("#modalCity").empty().text(city);
  $("#modalURL").attr("href", venue_url).append(venueLink);
  $("#modalImg").attr("src", img);

  $(".attend").on("click", function (e) {
    //This function adds a selected event in our database

    e.preventDefault();
  
    // var id = $(this).data("id");
    // var user = $("#user-id").val();
    // var titleSelected =  $("#modalTitle").val();
    console.log(title);

    if (user) {
      console.log(user);

      var newEvent = {
        eventID: id,
        eventTitle: title,
        eventVenue: venue,
        eventLocation: city,
        eventTime: time,
        toAttend: true,
        attended: false,
        userID: user,
      };

    console.log("NEW EVENT ADDED.");
    $(this).empty().text("Attending");

    addEvent(newEvent);

    }

    else {
      alert("Please log in to add events to your calendar!");
      console.log("User is not logged in."); 
  }
  });

});

