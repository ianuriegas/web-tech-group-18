document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch user data from the server
    function pullUsers() {
      fetch("pull-users.php", {
        method: "GET",
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming your server sends JSON data
        })
        .then(function (data) {
          // Handle the user data received from the server
          console.log(data);
          // You can update the DOM or perform other actions with the data
        })
        .catch(function (error) {
          // Handle errors (if any)
          console.error("Error:", error);
        });
    }
  
    // Call the pullUsers function when the page loads
    pullUsers();
  
    // Function to create a new account
    window.createAccount = function () {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
  
      // Make an AJAX request using the Fetch API
      fetch("add-user.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then(function (data) {
          // Handle the response from the server (if needed)
          console.log(data);
          // Refresh user data after creating a new account
          pullUsers();
        })
        .catch(function (error) {
          // Handle errors (if any)
          console.error("Error:", error);
        });
    };
  });