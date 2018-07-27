var data;
var modalShow = false;
var eventData = [];
var oArgsSearch = function(name) {
  this.name = name;
  this.app_key = "7NcRZmf2tJjpdF89";
  page_size = 30;
  //   sort_order: "popularity";
};


function getEventsFoo(location = "Austin", category = "music") {
  var oArgs = {
    app_key: "7NcRZmf2tJjpdF89",
    q: category,
    // where: "Austin",
    location: location,
    page_size: 16,
    sort_order: "popularity"
  };

  EVDB.API.call("/events/search", oArgs, function(oData) {
    data = JSON.stringify(oData);
    console.log(oData);
    // document.getElementById("results").append(picture);
    console.log("test:");
    // console.log(oData.events.event[0]);
    for (var i = 0; i < 16; i++) {
      var eventObj = {};
      if (oData.events.event[i].title != null) {
        eventObj.title = oData.events.event[i].title;
      }
      if (oData.events.event[i].city_name != null) {
        eventObj.city_name = oData.events.event[i].city_name;
      }
      if (oData.events.event[i].description != null) {
        eventObj.description = oData.events.event[i].description;
      }
      if (oData.events.event[i].image != null) {
        eventObj.image = oData.events.event[i].image.medium.url;
      }
      if (oData.events.event[i].start_time != null) {
        var dateTime = new Date(oData.events.event[i].start_time);
        dateTime = moment(dateTime).format("YYYY MM Do hh:mm:ss a");
        eventObj.time = dateTime;
      }
      if (oData.events.event[i].url != null) {
        eventObj.eventfulURL = oData.events.event[i].url;
      }
      if (oData.events.event[i].venue_name != null) {
        eventObj.venue = oData.events.event[i].venue_name;
      }
      if (oData.events.event[i].venue_url != null) {
        eventObj.venueURL = oData.events.event[i].venue_url;
      }
      if (oData.events.event[i].id != null) {
        eventObj.id = oData.events.event[i].id;
      }

      eventData.push(eventObj);
      console.log(i + oData.events.event[i].title);
      $(`#image${i}`).attr("src", eventObj.image);
      var event = "#event" + i;
      $(event).html(eventObj.title);
      $(event).attr("style", "color: gray;");
      $(event).attr(
        "style",
        "text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0px -1px 0 #000,0px 1px 0 #000;"
      );
    }
    console.log(eventData);

    attendBtn = $("<button>")
    .addClass("w3-btn w3-text-red")
    .text("Attend")
    .attr("data-id", eventData[i].id)
    .attr("title", eventData[i].title)
    .attr("venue", eventData[i].venue)
    .attr("city", eventData[i].city_name)
    .attr("time", eventData[i].time)
    .addClass("attend w3-btn w3-border");
  attendCol.append(attendBtn);

  tr.append(titleCol)
    .append(venueCol)
    .append(attendCol);
  $(".results-table").append(tr);

    // for ( var i = 0; i < 16; i++ ) {
    //     var image = "#image" + i;
    //     // $( image ).attr( "src", eventData[i].image );

    // }
    // for ( var i = 0; i < 16; i++ ) {
    //     $( event ).html( eventData[i].title );
    //     $( event ).attr( "style", "color: gray;" );
    //     $( event ).attr( "style", "text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0px -1px 0 #000,0px 1px 0 #000;" );

    // }
  });



// tr=$("<tr>");
// titleCol=$("<td>").text(eventData[i].title).addClass("w3-display-top w3-text-red w3-padding").attr("id", "event-title");
// venueCol=$("<td>").text(eventData[i].venue);
// cityCol=$("<td>").text(eventData[i].city_name);
// timeCol=$("<td>").text(eventData[i].time);
// attendCol=$("<td>");

// eventData.push( eventObj );

//CHECK I'm not sure what this following stuff does or quite where it should be
// console.log(i + oData.events.event[i].title);

// console.log(eventData);

// for (var i = 0; i < 16; i++) {
//   var image = "#image" + i;
//   $(image).attr("src", eventData[i].image);
// }
// for (var i = 0; i < 16; i++) {
//   var event = "#event" + i;
//   $(event).html(eventData[i].title);
//   $(event).attr("style", "color: gray;");
//   $(event).attr(
//     "style",
//     "text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0px -1px 0 #000,0px 1px 0 #000;"
//   );

// }

$(document).ready(function() {
  console.log("ready!");

  $(".w3-margin-bottom").click(function() {
    var idNum = parseInt(this.id);
    console.log(typeof idNum);

    if (modalShow == true) {
      $(".modal").hide(); //hide modal
      console.log("hide Modal");

      modalShow = false;
      console.log("modal false");
      return;
    }
    //build the modal
    else {
      $("#modal-title").html(eventData[idNum].title);
      console.log("idNum: " + idNum);
      $("#modal-image").attr("src", eventData[idNum].image);
      $("#modalLocation").html(eventData[idNum].city_name);

      $("#modalLocation").html(eventData[idNum].location);
      $("#modalTime").html(eventData[idNum].time);
      $("#modalVenue").html(eventData[idNum].venue);
      $("#modalVenueUrl").attr("href", eventData[idNum].venueURL);

      $(".modal").show();
      modalShow = true;
      console.log("modal true");

      return;
    }
    return;
  });
});
// API CALL as soon as page loads to display scrolling events nearby.
EVDB.API.call( "/events/search", oArgs, function ( oData ) {
    data = JSON.stringify(oData);
    console.log(oData);
    console.log( "Test:" );
    for (var i = 0; i < 30; i++) {
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
            var dateTime = new Date(oData.events.event[i].start_time );
            dateTime = moment(dateTime).format( "MMMM Do YYYY h:mm a" );
            eventObj.time = dateTime;

        } if ( oData.events.event[i].url != null ) {
            eventObj.eventfulURL = oData.events.event[i].url;

        } if ( oData.events.event[i].venue_name != null ) {
            eventObj.venue = oData.events.event[i].venue_name;

        } if ( oData.events.event[i].venue_url != null ) {
            eventObj.venueURL = oData.events.event[i].venue_url;

        } if ( oData.events.event[i].id != null ) {
            eventObj.id = oData.events.event[i].id;
        }
        eventData.push(eventObj);
    }
    console.log(eventData);
    document.getElementById("loading").classList.add("w3-hide");


    for ( var i = 0; i < 30; i++ ) {

        tr=$("<tr>").addClass("w3-card w3-padding w3-white").attr("id", "scroll-row");
        titleCol=$("<td>").text(eventData[i].title).addClass("w3-text-red w3-padding").attr("id", "event-title");
        venueCol=$("<td>").text(eventData[i].venue);
        // cityCol=$("<td>").text(eventData[i].city_name);
        timeCol=$("<td>").text(eventData[i].time);
        attendCol=$("<td>");
        image = $("<img>").attr("src", eventData[i].image).attr("style","width:100%").attr("onclick","onClick(this)").attr("alt",eventData[i].title).attr("id", "event-result");
       
        imgCol=$("<td>").append(image);

        attendBtn = $("<button>").text("Get Info").attr("data-id",eventData[i].id).attr("title",eventData[i].title).attr("venue",eventData[i].venue).attr("venue",eventData[i].venue).attr("time",eventData[i].time).addClass("w3-btn w3-text-white w3-border w3-bottom").attr("user-id", "1").attr("id","learn-more");

        attendCol.append(attendBtn);

        tr.append(titleCol).append(venueCol).append(timeCol).append(attendCol);
        $("#table_scroll").append(tr);
    }
});

$(document).ready( function () {
    console.log("Page ready!");
    document.getElementById("loading").classList.remove("w3-hide");

    $(".event-info").click( function () {
        var idNum = parseInt( this.id );
        console.log( typeof idNum );

        if ( modalShow == true ) {
            $( '.modal' ).hide(); //hide modal
            console.log( 'hide Modal' );

            modalShow = false;
            console.log( "modal false" );
            return;
        }
        //build the modal
        else {
            $( '#modal-title' ).html( eventData[idNum].title );
            console.log( "idNum: " + idNum );
            $( "#modal-image" ).attr( "src", eventData[idNum].image );
            $( "#modalLocation" ).html( eventData[idNum].city_name );

            $( "#modalLocation" ).html( eventData[idNum].location );
            $( "#modalTime" ).html( eventData[idNum].time );
            $( "#modalVenue" ).html( eventData[idNum].venue );
            $( "#modalVenueUrl" ).attr( "href", eventData[idNum].venueURL );;

            $( '.modal' ).show();
            modalShow = true;
            console.log( "modal true" );

            return;
        }
        return;

    } )

});

// attendBtn = $("<button>").addClass("w3-btn w3-text-red").text("Attend").attr("data-id",eventData[i].id).attr("title",eventData[i].title).attr("venue",eventData[i].venue).attr("city",eventData[i].city_name).attr("time",eventData[i].time).addClass("attend w3-btn w3-border");
// attendCol.append(attendBtn);

// tr.append(titleCol).append(venueCol).append(attendCol);
// $(".results-table").append(tr);

// tr=$("<tr>");
// titleCol=$("<td>").text(eventData[i].title).addClass("w3-display-top w3-text-red w3-padding").attr("id", "event-title");
// venueCol=$("<td>").text(eventData[i].venue);
// cityCol=$("<td>").text(eventData[i].city_name);
// timeCol=$("<td>").text(eventData[i].time);
// attendCol=$("<td>");


