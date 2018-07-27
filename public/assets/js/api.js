var data;
var modalShow = false;
var eventData = [];
var oArgsSearch = function ( name ) {
    this.name = name;
    this.app_key = "7NcRZmf2tJjpdF89";
    page_size = 30;
    sort_order: "popularity";
};

var oArgs = {

    app_key: "7NcRZmf2tJjpdF89",

    q: "music",

    where: "Austin",

    location: "Austin Texas",

    // "date": "2013061000-2015062000",

    page_size: 35,

    sort_order: "popularity",

};

// API CALL as soon as page loads to display scrolling events nearby.
EVDB.API.call( "/events/search", oArgs, function ( oData ) {
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
        //image = $("<img>").attr("src", eventData[i].image).attr("style","width:100%").attr("onclick","onClick(this)").attr("alt",eventData[i].title).attr("id", "event-result");
        
        //imgCol=$("<td>").append(image);

        attendBtn = $("<button>").text("Get Info").attr("data-id",eventData[i].id).attr("title",eventData[i].title).attr("venue",eventData[i].venue).attr("venue",eventData[i].venue).attr("time",eventData[i].time).addClass("w3-btn w3-text-white w3-border w3-bottom").attr("user-id", "1").attr("id","learn-more");

        attendCol.append(attendBtn);

        tr.append(titleCol).append(venueCol).append(timeCol).append(attendCol);
        $("#table_scroll").append(tr);
    }
});