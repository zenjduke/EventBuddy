// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function() {

  $(".setup-btn").on("click", function(event) {

    event.preventDefault();

    var id = $(this).data("id");
     
    console.log("User ID: "+id);

    // var venue = [];
    //   $("#venue > option").each(function(){
    //   venue.push(this.value);
    //   });

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
  
    console.log("NEW ACCOUNT CREATED FOR "+newAccount.fname+".");

    createAccount(newAccount);
  })
});
  
      // This function updates a todo in our database
  function createAccount(info) {
    $.ajax({
      method: "PUT",
      url: "/api/users",
      data: info
    }).then(
      console.log("Account created."),
      location.href = "profile"
    );
  };
     

  