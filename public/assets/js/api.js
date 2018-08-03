var latitude;
var longitude;
var currentLocation;

$(function() {
        
    var startPos;
    var nudge = document.getElementById("nudge");

    var showNudgeBanner = function() {
        nudge.style.display = "block";
    };

    var hideNudgeBanner = function() {
        nudge.style.display = "none";
    };

    var nudgeTimeoutId = setTimeout(showNudgeBanner, 2000);


    var geoSuccess = function(position) {
        hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId);

        // Do magic with location
        startPos = position;

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        console.log(latitude,longitude);
        var currentLocation = latitude+","+longitude;
        console.log("Current location: "+currentLocation);

    };

    var geoError = function(error) {
        switch(error.code) {
        case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
        }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    setTimeout(loadScrollTable,4000);
});

function loadScrollTable() {

    var data;

    //const googleAPIKey = "AIzaSyCBuDVv2cDdn68f2kmr6Q0sEldwPxjBRTw";

    var eventData = [];

    var oArgs = {

        app_key: "7NcRZmf2tJjpdF89",

        q: "music",

        within: 20,

        location: "Austin, TX",

        page_size: 35,

        sort_order: "popularity",

    };

    // API CALL as soon as page loads to display scrolling events nearby.
    EVDB.API.call( "/events/search", oArgs, function (oData) {
        data = JSON.stringify(oData);
        console.log(oData);
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

                var dateTime = new Date(oData.events.event[i].start_time);

                dateTime = moment(dateTime).format( "MMMM Do, YYYY" );
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
            timeCol=$("<td>").text(eventData[i].time);

            learnCol=$("<td>");

            learnBtn = $("<button>").text("Get Info").attr("title",eventData[i].title).attr("venue",eventData[i].venue).attr("time",eventData[i].time).attr("time",eventData[i].time).addClass("w3-btn w3-red w3-border learn-more").attr("onclick","document.getElementById('infoModal').style.display='block'");

            learnCol.append(learnBtn);

            tr.append(titleCol).append(venueCol).append(timeCol).append(learnCol);
            $("#table_scroll").append(tr);
        }
    });
};

function pageScroll() {  
    var objDiv = document.getElementById("contain");
    objDiv.scrollTop = objDiv.scrollTop + 1;  
    $('p:nth-of-type(1)').html('scrollTop : '+ objDiv.scrollTop);
    $('p:nth-of-type(2)').html('scrollHeight : ' + objDiv.scrollHeight);
    if (objDiv.scrollTop == (objDiv.scrollHeight - 380)) {
      objDiv.scrollTop = 0;
    }
    my_time = setTimeout('pageScroll()', 25);
};