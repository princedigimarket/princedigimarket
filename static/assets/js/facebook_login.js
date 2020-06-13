var baseUrl = "https://einvite.tech/";
// tell the embed parent frame the height of the content
if (window.parent && window.parent.parent) {
	window.parent.parent.postMessage(["resultsFrame", {
		height: document.body.getBoundingClientRect().height,
		slug: "wbyhnuf5"
	}], "*")
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"

window.fbAsyncInit = function () {
	// FB JavaScript SDK configuration and setup
	FB.init({
		appId: '214165990033725', // FB App ID
		cookie: true, // enable cookies to allow the server to access the session
		xfbml: true, // parse social plugins on this page
		version: 'v6.0' // use graph api version 2.8
	});

	// Check whether the user already logged in
	FB.getLoginStatus(function (response) {
		if (response.status === 'connected') {
			//display user data
			getFbUserData();
		}
	});
};

// Load the JavaScript SDK asynchronously
(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
function fbLogin() {
	FB.login(function (response) {
		if (response.authResponse) {
			// Get and display the user profile data
			getFbUserData();
		} else {
			document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
		}
	}, {
		scope: 'email'
	});
}

function fbLoginAjax(fbLogin) {
	$.ajax({
		type: "POST",
		url: baseUrl + "auth/socialauth",
		contentType: "application/json",
		data: fbLogin,
		success: function (data) {
			console.log(data);
			localStorage.token = data.access_token;
			console.log('Got a token from the server! Token: ' + data.access_token);
			console.log('user_name  : ' + data.user_name);
			if (data.visiting_card_exist) {
				localStorage.visiting_card_id = Object.values(data.visiting_card_id);
				console.log('Visiting exists already Visiting Card ID : ' + Object.values(data.visiting_card_id));
			} else {
				console.log('no Visiting Card create new ');
			}
			/*if (localStorage.buy) {
				window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
			} else {
				window.location = "index.html";
			}*/
			window.location="editCard.html";
		},
		error: function () {
			console.log("Login Failed");
		}
	});
}

// Fetch the user profile data from facebook
function getFbUserData() {
	FB.api('/me', {
			locale: 'en_US',
			fields: 'id,first_name,last_name,email,link,gender,locale,picture'
		},
		function (response) {
			console.log("UserData");
			console.log(JSON.stringify(response));
			var first_name = response.first_name;
			var id = response.id;
			var last_name = response.last_name;
			var email = response.email;
			var gender = response.gender;
			var locale = response.locale;
			var picture_url = response.picture.data.url;
			var link = response.link;

			var loginData = new Object();
			loginData.user_name = first_name + "  " + last_name;
			loginData.email = email;
			loginData.picture_link = picture_url;

			var fbLogin = JSON.stringify(loginData);
			fbLoginAjax(fbLogin);

		});
}

// Logout from facebook
function fbLogout() {
	FB.logout(function () {
		/* document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
		 document.getElementById('fbLink').innerHTML = '<img src="fblogin.png"/>';
		 document.getElementById('userData').innerHTML = '';
		 document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';*/
	});
}