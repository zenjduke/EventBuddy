//THIS CALLS API AFTER CLICKING BUTTON ON DISCOVER PAGE
$(document).on("click", ".get-events", function (e) {

  e.preventDefault();

  document.getElementById("table_scroll").classList.add("w3-hide");
  document.getElementById("loading").classList.remove("w3-hide");

  var oArgs = {
    app_key: "7NcRZmf2tJjpdF89",
    q: $("#cat").val(),
    location: $("#location").val(),
    page_size: 35
  };

  EVDB.API.call( "/events/search", oArgs, function (oData) {
    document.getElementById("loading").classList.add("w3-hide");
    id = $("#user-id").val();
    data = JSON.stringify(oData);
    console.log(oData);
    $(".result-row").empty(); 
    console.log("USER SEARCH:");
    for ( var i = 0; i < 30; i++ ) {
        var eventObj = {};
        if ( oData.events.event[i].title != null ) {
            eventObj.title = oData.events.event[i].title;
        } if ( oData.events.event[i].city_name != null ) {
            eventObj.city_name = oData.events.event[i].city_name;
        } if ( oData.events.event[i].description != null ) {
            eventObj.description = oData.events.event[i].description;
        } if ( oData.events.event[i].image != null ) {
            eventObj.image = oData.events.event[i].image.medium.url;

        } if ( oData.events.event[i].start_time != null ) {

            var dateTime = new Date();
            dateTime = moment(oData.events.event[i].start_time).format( "MMMM Do, YYYY h:mm a" );
            eventObj.time = dateTime;

        } if ( oData.events.event[i].url != null ) {
            eventObj.eventfulURL = oData.events.event[i].url;
        } if ( oData.events.event[i].venue_name != null ) {
            eventObj.venue = oData.events.event[i].venue_name;
        } if ( oData.events.event[i].venue_url != null ) {
            eventObj.venueURL = oData.events.event[i].venue_url;
        }if (oData.events.event[i].id != null){
            eventObj.id = oData.events.event[i].id;
        }

        resultPanel = $(

        `<div class="w3-panel w3-display-container w3-card w3-white" id="result-panel" 
          onclick ="document.getElementById('infoModal').style.display='block'"
          id=result-panel" title="${eventObj.title}"
          venue="${eventObj.venue}" venueURL="${eventObj.venueURL}"
          city="${eventObj.city_name}" time=${eventObj.time} user-id=${id}>
          <div>
            <div id="result-info">
              <h3>${eventObj.title}</h3>
              <h4>${eventObj.venue}</h4>
              <h6>${eventObj.time}</h6>
            </div>
            <img class="w3-display-right" id="resImg" src="${eventObj.image}">
          </div>
        </div>`)

        $(".result-row").prepend(resultPanel); 
    }
    })     
});  
  
$(document).on("click", "#result-panel", function (e) {

  e.preventDefault();

  var user = $("#user-id").val();
  var title = $(this).attr("title");
  var venue = $(this).attr("venue");
  var city = $(this).attr("city");
  var time = $(this).attr("time");
  console.log(time);
  var venue_url = $(this).attr("venueURL");
  var img = $("#resImg").attr("src");

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

$(document).on("click", ".learn-more", function (e) {

  e.preventDefault();

  var user = $("#user-id").val();
  var title = $(this).attr("title");
  var venue = $(this).attr("venue");
  var city = $(this).attr("city");
  var time = $(this).attr("time");
  var venue_url = $(this).attr("venueURL");
  var img = $("#resImg").attr("src");

  $("#modalTitle").empty().text(title);
  $("#modalTime").empty().text(time);
  var venueLink = $("#modalVenue").empty().text(venue);
  $("#modalCity").empty().text(city);
  $("#modalURL").attr("href", venue_url).append(venueLink);
  $("#modalImg").attr("src", img);

  $(".attend").on("click", function (e) {
    //This function adds a selected event in our database

    e.preventDefault();

    console.log(title);

    if (user) {
      console.log(user);

      var newEvent = {
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


// UPDATES user account to include personal details.
$(document).on("click", ".update-btn", function (e) {
    e.preventDefault();

    var id = $(this).data("id");
    console.log("User ID: " + id);

    updateAccount(id);

});

// This function updates a user account in our database.
function updateAccount(id) {

  var userInfo = {
    id: id,
    phone: $("#phone").val().trim(),
    email: $("#email").val().trim(),
    profilePic: $("#profilepic").val().trim(),
    twitter: $("#twitter").val().trim(),
    facebook: $("#facebook").val().trim(),
    gplus: $("#gplus").val().trim(),
    venue: $("#venue option:selected").val(),
    eventtype: $("#eventtype option:selected").val(),
  };

  $.ajax({
    method: "PUT",
    url: "/api/users",
    data: userInfo
  }).then(
    location.href = "profile",
  )};


function getUserEvents(user) {
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

// Adds a user-selected event to our database.
function addEvent(info) {
  $.post("/api/events", info, function() {
    alert("Attending Event!");
  });
};



