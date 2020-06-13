$(document).ready(function () {
var baseUrl = "https://einvite.tech/";

//example url to view card http://localhost:8080/viewCard?user_name=elavarasan
//https://wishmecards.com/viewCard?user_name=elavarasan

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
	var str = document.referrer;
	console.log(" Curent url : "+str);
var n = str.includes("einvite");
console.log(" n : "+n);
if(n){
	$("#editCard").hide();
	$("#home").hide();
}else{
	$("#editCard").show();
	$("#home").show();
}
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

var user_name = getUrlParam('user_name','Empty');

console.log("user_name: "+user_name)
if(user_name == "Empty"){
	console.log("localStorage.user_name : "+localStorage.user_name);
	//alert('localStorage.user_name : ' + localStorage.user_name);
	if(localStorage.user_name){
		user_name = localStorage.user_name;
	}else{
		console.log("no card exist for this user");
	window.location = "index.html";
	}
	
}
	$.ajax({
		type: 'GET',
		url: baseUrl + 'view_card/'+user_name,
		contentType: "application/json",
		success: function (data) {
			console.log(JSON.stringify(data));
			
			console.log('Visiting exist or created Visiting Card ID : ' + Object.values(data._id));
			card_id = Object.values(data._id);
			
			var user_name = data.user_name;
			var email = data.email;
			var mobile_no = data.mobile_no;
			var company_name = data.company_name;
			var designation = data.designation;
			var company_link = data.company_link;
			var company_address = data.company_address;
			var services_provided = data.services_provided;
			var facebook_link = data.facebook_link;
			var messenger_link = data.messenger_link;
			var twitter_link = data.twitter_link;
			var linkedin_link = data.linkedin_link;
			var instagram_link = data.instagram_link;
			var youtube_link = data.youtube_link;
			var payment_link = data.payment_link;
			var other_payment_link = data.other_payment_link;
			var google_map_link = data.google_map_link;
			var profile_picture_link = data.profile_picture_link;
			
			if(facebook_link === "" &&  twitter_link === "" &&  linkedin_link === ""  &&  instagram_link === "" )
			{
				$('#follow_me_heading').hide();
			}
			if(company_link === "" &&  google_map_link === ""){
				$('#company_heading').hide();
			}

			if(data.profile_picture_exist){
				console.log("profile picture exist image_ref_id data.profile_picture_exist "+card_id);
				$("#profile_picture_link").attr("src",baseUrl+"display_image/"+card_id);
				 $('#profile_picture_link').attr('target', '_blank'); 
			}else{
				console.log("no profile picture exist data.profile_picture_exist  image_ref_id "+data.profile_picture_exist);
			}

			$("#user_name").text(toTitleCase(user_name));
			if (email !== "") {
				console.log("exiy email "+$("#email").val());
				$("#email").attr("href", "mailto:" + email + "?Subject=Hello");
				$('#email').attr('target', '_blank'); 
				$('#email').show();
			}else{
				console.log("NO email "+email);
				$('#email').hide();
			}
			if (mobile_no !== "") {
			$("#mobile_no").attr("href", "tel:+91" + mobile_no);
			$('#mobile_no').attr('target', '_blank'); 
			$('#mobile_no').show();
			}else{
				console.log("NO mobile_no "+mobile_no);
				$('#mobile_no').hide();
			}
			if (company_name !== "") {
			$('#company_name').text(company_name.toUpperCase());
			$('#company_name').attr('target', '_blank'); 
			$('#company_name').show();
			}else{
				console.log("NO company_name "+company_name);
				$('#company_name').hide();
			}
			if (designation !== "") {
			$('#designation').text(designation.toUpperCase());
			$('#designation').attr('target', '_blank'); 
			$('#designation').show();
			}else{
				console.log("NO designation "+designation);
				$('#designation').hide();
			}
			if (mobile_no !== "") {
			$("#whatsapp_link").attr("href", "https://api.whatsapp.com/send?phone=+91" + mobile_no);
			$('#whatsapp_link').attr('target', '_blank'); 
			$('#whatsapp_link').show();
			}else{
				console.log("NO whatsapp_link mobile_no "+mobile_no);
				$('#whatsapp_link').hide();
			}
			if (company_link !== "") {
			$("#company_link").attr("href", company_link);
			$('#company_link').attr('target', '_blank'); 
			$('#company_link').show();
			}else{
				console.log("NO company_link "+company_link);
				$('#company_link').hide();
			}
			if (messenger_link !== "") {
			$("#messenger_link").attr("href", messenger_link);
			$('#messenger_link').attr('target', '_blank'); 
			$('#messenger_link').show();
			}else{
				console.log("NO messenger_link "+messenger_link);
				$('#messenger_link').hide();
			}
			if (facebook_link !== "") {
			$("#facebook_link").attr("href", facebook_link);
			$('#facebook_link').attr('target', '_blank'); 
			$('#facebook_link').show();
			}else{
				console.log("NO facebook_link "+facebook_link);
				$('#facebook_link').hide();
			}
			if (twitter_link !== "") {
			$("#twitter_link").attr("href", twitter_link);
			$('#twitter_link').attr('target', '_blank'); 
			$('#twitter_link').show();
			}else{
				console.log("NO twitter_link "+twitter_link);
				$('#twitter_link').hide();
			}
			if (linkedin_link !== "") {
			$("#linkedin_link").attr("href", linkedin_link);
			$('#linkedin_link').attr('target', '_blank'); 
			$('#linkedin_link').show();
			}else{
				console.log("NO linkedin_link "+linkedin_link);
				$('#linkedin_link').hide();
			}
			if (instagram_link !== "") {
			$("#instagram_link").attr("href", instagram_link);
			$('#instagram_link').attr('target', '_blank'); 
			$('#instagram_link').show();
			}else{
				console.log("NO instagram_link "+instagram_link);
				$('#instagram_link').hide();
			}
			if (youtube_link !== "") {
			$("#youtube_link").attr("href", youtube_link);
			$('#youtube_link').attr('target', '_blank'); 
			$('#youtube_link').show();
			}else{
				console.log("NO youtube_link "+youtube_link);
				$('#youtube_link').hide();
			}
			if (payment_link !== "") {
			$("#payment_link").attr("href", payment_link);
			$('#payment_link').attr('target', '_blank'); 
			$('#payment_link').show();
			}else{
				console.log("NO payment_link "+payment_link);
				$('#payment_link').hide();
			}
			if (other_payment_link !== "") {
			$("#other_payment_link").attr("href", other_payment_link);
			$('#other_payment_link').attr('target', '_blank'); 
			$('#other_payment_link').show();
			}else{
				console.log("NO other_payment_link "+other_payment_link);
				$('#other_payment_link').hide();
			}
			if (google_map_link !== "") {
			$("#google_map_link").attr("href", google_map_link);
			$('#google_map_link').attr('target', '_blank'); 
			$('#google_map_link').show();
			}else{
				console.log("NO google_map_link "+google_map_link);
				$('#google_map_link').hide();
			}
			
			var base_share_url = "https%3A%2F%2Feinvite.tech%2Fcard%2F";
			
			$("#fb_share").attr("href", "https://www.facebook.com/sharer/sharer.php?u="+base_share_url+user_name);
			$("#twitter_share").attr("href", "https://twitter.com/intent/tweet?text="+base_share_url+user_name);
			$("#linkedin_share").attr("href", "https://www.linkedin.com/shareArticle?mini=true&url="+base_share_url+user_name);
			$("#whatsapp_share").attr("href", "whatsapp://send?text="+base_share_url+user_name);
			
			



			
			
		},
		error: function (xhr, status, error) {
			console.log(xhr);
			var err = JSON.parse(xhr.responseText);
			
			console.log("xhr.responseText : " + xhr.responseText);
			console.log("error message : " + err.error);
			console.log(xhr.status);
			console.log("status : " + status);
			console.log("error : " + error);
			console.log("no card exist for this user");
			alert("Error occured");
	window.location = "index.html";
		}
	});
	function toTitleCase(str) {
		return str.replace(/(?:^|\s)\w/g, function (match) {
			return match.toUpperCase();
		});
	}
})