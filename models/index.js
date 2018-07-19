
event = {
    selectAll: function (location, category) {
        $.ajax({
            url: `http://api.eventful.com/json/events/search?app_key=${process.env.apikey}&location=${location}&category=${category}`,
            method: GET
        }
            , function (err, data) {
                if (err) {
                    throw err;
                }
                return data.events

            })
    }
}
