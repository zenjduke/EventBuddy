// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function () {

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

// This function gets selected events from our database by userID
function getEvents(user) {
  userID = user || "";
  if (userID) {
    userID = "/?id=" + userID;
  }
  $.get("/api/events" + userID, function(data) {
    console.log("Events", data);
    events = data;
    // if (!events || !events.length) {
    //   displayEmpty(user);
    // }
    // else {
    //   initializeRows();
    // }
  });
}

// The code below handles the case where we want to get blog posts for a specific author
// Looks for a query param in the url for author_id
var url = window.location.search;
var userID;
if (url.indexOf("?id=") !== -1) {
  userID = url.split("=")[1];
  getEvents(userID);
}
// If there's no authorId we just get all posts as usual
else {
  getEvents();
};

// This function adds a selected event in our database
$(document).on("click", ".attend", function (e) {

      e.preventDefault();
    //   var eventData = $(this).attr('data-id');
    // var eventObject = JSON.parse(eventData);

      var id = $(this).data("id");
      var user = $("#user-id").val();
      var title = $(this).attr("title");
      var venue = $(this).attr("venue");
      var city = $(this).attr("city");
      var time = $(this).attr("time");

      console.log(id);
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
    });


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
  