$(function() {

    var data;
    var eventData = [];
    var oArgs = {
        app_key:  "7NcRZmf2tJjpdF89",
        q: "music",
        where: "Austin",
        location: "Austin Texas",
        // "date": "2013061000-2015062000",
        page_size: 35,
        sort_order: "popularity",
    };

    $(".get-events").on("click", function(e) {

        e.preventDefault();

        EVDB.API.call( "/events/search", oArgs, function (oData) {
            data = JSON.stringify(oData);
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

                image = $("<img>").attr("src", eventData[i].image).attr("style","width:100%").attr("onclick","onClick(this)").attr("alt",eventData[i].title).attr("id", "event-result");

                title = $("<span>").text(eventData[i].title).addClass("w3-display-middle w3-text-red w3-padding").attr("id", "event-title");

                attendBtn = $("<button>").text("Attend").attr("id",eventData[i].id).addClass("w3-btn w3-border attend-btn w3-display-bottom");

                $(".display"+i).append(image).append(title).append(attendBtn);
            }
        })     
    });

  
});