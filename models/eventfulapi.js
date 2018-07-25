const fetch = require("node-fetch");

function getEvents(api_key, location, category) {
  var categories = category.join(",");
  return fetch(
    `http://api.eventful.com/json/events/search?app_key=${api_key}&location=${location}&category=${categories}`
  )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return json.events.event;
    });
}

// function getCategories(api_key) {
//   return fetch(
//     `http://api.eventful.com/json/categories/list?app_key=${api_key}`
//   )
//     .then(res => res.json())
//     .then(json => {
//       console.log(json);
//       return json.category;
//     });
// }

// const categories;
// getCategories(process.env.api_key).then(value => categories = value)

// module.exports = { getEvents, categories}; //getCategory}
module.exports = { getEvents };
