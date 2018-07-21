// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-visit").on("click", function(event) {
    var id = $(this).data("id");
    var newVisit = $(this).data("newvisit");
    console.log(newVisit);

    var newVisitState = {
      devoured: newVisit
    };

    // Send the PUT request.
    $.ajax("/api/restaurants/" + id, {
      type: "PUT",
      data: newVisitState
    }).then(
      function() {
        console.log("changed visit to", newVisit);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".add-restaurant").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newRestaurant = {
      name: $("#name").val().trim(),
      type: $("#type").val().trim(),
      location: $("#location").val().trim(),
      price: $("#price").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(),
      rating: $("#rating").val().trim(),
    };

    console.log(newRestaurant);
    // Send the POST request.
    $.ajax("/api/restaurants", {
      type: "POST",
      data: newRestaurant
    }).then(
      function() {
        console.log("Created new restaurant.");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-restaurant").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/restaurants/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("Deleted restaurant", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
