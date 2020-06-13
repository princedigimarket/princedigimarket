var baseUrl = "https://einvite.tech/";

$( document ).ready(function() {
    console.log("On Load call get card api "+localStorage.visiting_card_id,);
	if(localStorage.token){
		console.log("user is logged in : "+localStorage.token);
	}else{
		console.log("user is not logged in redirect to login : "+localStorage.token);
		window.location="login.html";
	}
	if(localStorage.visiting_card_id)
  $.ajax({
			type: 'GET',
			url: baseUrl + 'visiting_card/'+localStorage.visiting_card_id,
			contentType: "application/json",
			beforeSend: function (xhr) {
				if (localStorage.token) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
				}
			},
			success: function (data) {
				console.log('Successfully retrieved card details.');
				console.log(JSON.stringify(data));
				console.log('Visiting card response : ' + data);
					localStorage.user_name = data.user_name;
				var resultJson = data;
			delete resultJson["_id"];
			delete resultJson["added_by"];
			delete resultJson["created"];
			
			console.log("Result json ");
			console.log(resultJson);
			$('#myform').populate(resultJson);
			},
			error: function (xhr, status, error) {
					console.log("xhr.responseText : " + xhr.responseText);
					console.log("status : " + status);
					console.log("error : " + error);
					console.log(error);
					console.log("xhr.status : " + xhr.status);
					var x = document.getElementById("serverError");
					x.style.display = "block";
				}
		});
});

$(document).ready(function () {

	$("#cancelCard").click(function () {
		event.preventDefault();
		console.log("Cancel was clicked.");
		window.location = "viewCard.html";
	});

	$('#myform').submit(function (e) {
		var count = getCount();
		e.preventDefault();
		var data = $(this).serializeFormJSON();
		console.log(data);
		var formValid = $("#myform").valid();
		console.log("Form valid : " + formValid);
		console.log("localStorage.visiting_card_id : "+localStorage.visiting_card_id);
		if (formValid && count >= 1 && localStorage.visiting_card_id) {
			$.ajax({
				type: "PUT",
				url: baseUrl + "visiting_card/"+localStorage.visiting_card_id,
				contentType: "application/json",
				data: data,
				beforeSend: function (xhr) {
					if (localStorage.token) {
						xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
					}
				},
				success: function (data) {
					console.log(data);
					console.log('Visiting card response : ' + data);
					window.location = "viewCard.html";
					/*if (localStorage.buy) {
						window.location = "https://pages.razorpay.com/pl_ElRHr5q55UvKL0/view";
					} else {
						window.location = "index.html";
					}*/
				},
				error: function (xhr, status, error) {
					console.log("xhr.responseText : " + xhr.responseText);
					console.log("status : " + status);
					console.log("error : " + error);
					console.log(error);
					console.log("xhr.status : " + xhr.status);
					var x = document.getElementById("serverError");
					x.style.display = "block";
				}
			});
		} else {
			console.log("Invalid form");
		}
	});


	(function ($) {
		$.fn.serializeFormJSON = function () {
			var o = {};
			var a = this.serializeArray();
			$.each(a, function () {
				if(this.value){
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}}
			});
			return JSON.stringify(o);
		};
	})(jQuery);

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


	function getCount() {
		var count = 0;
		$('#myform *').filter(':input').each(function () {
			console.log(this.name + ': ' + this.value);
			if (this.value && this.value != 'Submit' && this.value != 'Cancel') {
				count++;
			}
		});
		var x = document.getElementById("serverError");
		x.style.display = "none";

		console.log("Count : " + count);
		if (count >= 1) {
			console.log("Form is valid");
			var x = document.getElementById("atleastOne");
			x.style.display = "none";
		} else {
			console.log("Atleast enter one field");
			var x = document.getElementById("atleastOne");
			x.style.display = "block";
		}
		return count;
	}
});