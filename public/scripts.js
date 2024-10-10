$(document).ready(function () {
  const apiBase = "./users";

  // Handle Registration
  $("#registerForm").submit(function (e) {
    e.preventDefault();
    const userData = {
      username: $("#username").val(),
      userID: $("#userID").val(),
      poneNumber: $("#phoneNumber").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    };
    $.post(`${apiBase}/register`, userData, function (response) {
      console.log("User Registered", response);
    });
  });

  // Handle Login
  let authToken;
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    const loginData = {
      email: $("#loginEmail").val(),
      password: $("#loginPassword").val(),
    };
    $.post(`${apiBase}/login`, loginData, function (response) {
      console.log("User Logged In", response);
      authToken = response.token;
      displayUserProfile(response.userInfo);
    });
  });

  // Handle Update
  $("#updateForm").submit(function (e) {
    e.preventDefault();
    const updateData = {
      username: $("#updateUsername").val(),
    };
    $.ajax({
      url: `${apiBase}/update`,
      type: "PUT",
      headers: { Authorization: `Bearer ${authToken}` },
      data: updateData,
      success: function (response) {
        console.log("Profile Updated", response);
        displayUserProfile(response);
      },
    });
  });

  // Display User Profile
  function displayUserProfile(userInfo) {
    $("#userProfile").show();
    $("#profileInfo").html(`
          <strong>Username:</strong> ${userInfo.username}<br>
          <strong>Email:</strong> ${userInfo.email}<br>
          <strong>Phone:</strong> ${userInfo.poneNumber}<br>
          <strong>UserID:</strong> ${userInfo.userID}
      `);
  }
});
