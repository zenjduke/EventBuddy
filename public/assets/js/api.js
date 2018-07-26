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

EVDB.API.call( "/events/search", oArgs, function ( oData ) {
    data = JSON.stringify( oData );
    console.log( oData );
    // document.getElementById("results").append(picture);
    console.log( "test:" );
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
            var dateTime = new Date(oData.events.event[i].start_time );
            dateTime = moment( dateTime ).format( "YYYY MM Do hh:mm:ss a" );
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

        eventData.push( eventObj );
        console.log( i + oData.events.event[i].title );
    }
    console.log( eventData );


    for ( var i = 0; i < 16; i++ ) {
        var image = "#image" + i;
        $( image ).attr( "src", eventData[i].image );


    }
    for ( var i = 0; i < 16; i++ ) {
        var event = "#event" + i;
        $( event ).html( eventData[i].title );
        $( event ).attr( "style", "color: gray;" );
        $( event ).attr( "style", "text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000,0px -1px 0 #000,0px 1px 0 #000;" );

    }
} );

$( document ).ready( function () {
    console.log( "ready!" );

    $( ".w3-margin-bottom" ).click( function () {
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

