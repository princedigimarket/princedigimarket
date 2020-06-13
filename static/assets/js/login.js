var baseUrl = "https://einvite.tech/";

$(document).ready(function () {

	$('#emailLogin').click(function () {
		event.preventDefault();
		var formValid = $("#loginForm").valid();
		console.log("Form valid : " + formValid)
		console.log("Email Login")
		var email = document.getElementById("inputEmail").value;
		var password = document.getElementById("inputPassword").value;
		if (formValid) {
			console.log("Valid input");
			$.ajax({
				type: "POST",
				url: baseUrl + "auth/login",
				contentType: "application/json",
				data: JSON.stringify({
					"email": email,
					"password": password
				}),
				success: function (data) {
					console.log(data);
					localStorage.token = data.access_token;
					console.log('access_token : ' + data.access_token);
					console.log('user_name  : ' + data.user_name);
					if (data.visiting_card_exist) {
						localStorage.visiting_card_id = Object.values(data.visiting_card_id);
						console.log('Visiting exists already Visiting Card ID : ' + Object.values(data.visiting_card_id));
					} else {
						console.log('no Visiting Card create new ');
					}
					var x = document.getElementById("invalid_cred");
					x.style.display = "none";
					console.log('Got a token from the server! Token: ' + data.access_token);
					console.log(JSON.stringify(data));
					/*if(localStorage.buy){
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					}
					else{
						//window.location = "index.html";
						window.location.href="index.html";
					}*/
					window.location="editCard.html";

				},
				error: function (xhr, status, error) {
					var err= JSON.parse(xhr.responseText);
					console.log("xhr.responseText : " + xhr.responseText);
					console.log(xhr.status);
					console.log("status : " + status);
					console.log("error : " + error);
					if (error == "UNAUTHORIZED") {
						var x = document.getElementById("invalid_cred");
						x.style.display = "block";
					}
					$loading.hide();
				}
			});
		} else {
			console.log("Invalid input");
		}

	});


	$('#getVisitingCard').click(function () {
		$.ajax({
			type: 'GET',
			url: baseUrl + 'visiting_cards',
			contentType: "application/json",
			beforeSend: function (xhr) {
				if (localStorage.token) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
				}
			},
			success: function (data) {
				console.log(JSON.stringify(data));
				console.log(JSON.stringify(data));
				console.log('Hello ' + data + '! You have successfully accessed to /api/profile.');
			},
			error: function (xhr, status, error) {
				var err= JSON.parse(xhr.responseText);
				console.log("xhr.responseText : " + xhr.responseText);
				console.log("status : " + status);
				console.log("error : " + error);
				console.log("err.Message : " + xhr.responseText.error);
				console.log(error);
			}
		});
	});
	$('#socialAuth').click(function () {
		$.ajax({
			type: "POST",
			url: baseUrl + "auth/socialauth",
			contentType: "application/json",
			data: JSON.stringify({
				"user_name": "Elavarasan",
				"email": "elavarasan_natarajan@ahoo.com",
				"picture_link": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3166267760083480&height=50&width=50&ext=1590480380&hash=AeR4gImK_vAuhEWz"
			}),
			success: function (data) {
				console.log(data);
				localStorage.token = data.access_token;
				console.log('Got a token from the server! Token: ' + data.access_token);
				if (localStorage.buy) {
					window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
				} else {
					//window.location = "index.html";
					window.location.href = "index.html"
				}
			},
			error: function (xhr, status, error) {
				var err= JSON.parse(xhr.responseText);
				console.log("xhr.responseText : " + xhr.responseText);
				console.log("status : " + status);
				console.log("error : " + error);
				console.log("err.Message : " + xhr.responseText.error);
				console.log(error);
			}
		});
	});
	$('#goodLogin').click(function () {
		$.ajax({
			type: "POST",
			url: baseUrl + "auth/login",
			contentType: "application/json",
			data: JSON.stringify({
				"email": "elavarasan_natarajan@yahoo.com",
				"password": "default"
			}),
			success: function (data) {
				console.log(data);
				localStorage.token = data.access_token;
				console.log('Got a token from the server! Token: ' + data.access_token);
			},
			error: function (xhr, status, error) {
				var err= JSON.parse(xhr.responseText);
				console.log("xhr.responseText : " + xhr.responseText);
				console.log("status : " + status);
				console.log("error : " + error);
				console.log("err.Message : " + xhr.responseText.error);
				console.log(error);
			}
		});
	});
	$('#badLogin').click(function () {
		$.ajax({
			type: "POST",
			url: baseUrl + "auth/login",
			contentType: "application/json",
			data: JSON.stringify({
				"email": "elavarasan_natarajan@yahoo.com",
				"password": "default1"
			}),
			success: function (data) {
				console.log("ERROR: it is not supposed to console.log.");
			},
			error: function (xhr, status, error) {
				var err= JSON.parse(xhr.responseText);
				console.log("xhr.responseText : " + xhr.responseText);
				console.log("status : " + status);
				console.log("error : " + error);
				console.log("err.Message : " + xhr.responseText.error);
				console.log(error);
			}
		});
	});
	$('#logout').click(function () {
		localStorage.clear();
	});


	jQuery.validator.setDefaults({
		debug: true,
		success: function (label) {
			label.attr('id', 'valid');
		},
	});
	$("#loginForm").validate({
		messages: {
			inputEmail: {
				required: "Please enter email"
			},
			inputPassword: {
				required: "Please enter password"
			}
		}
	});

	var $loading = $('#loader').hide();
	$(document)
		.ajaxStart(function () {
			$loading.show();
			console.log("ajax start");
		})
		.ajaxStop(function () {
			$loading.hide();
			console.log("ajax stop");
		});


});