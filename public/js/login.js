$("#signup-form").on("submit", function(event){
	event.preventDefault();

	var userEmail = $("#signup-email").val().trim();
	var userFirstName = $("#signup-firstname").val().trim();
	var userLastName = $("#signup-lastname").val().trim();
	var userPassword = $("#signup-password").val().trim();
	var userConfirmPasword = $("#signup-confirm-password").val().trim();

	if (userPassword !== userConfirmPasword) {
		alert("Your passwords do not match");
		return;
	}

	var newUser = {
		email: userEmail,
		firstname: userFirstName,
		lastname: userLastName,
		password: userPassword
	};

	$.post("/signup", newUser, function() {
		// if(err) {
		// 	console.log("signup unsuccessful");
		// }


	})
})