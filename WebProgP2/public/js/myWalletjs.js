// JScript Validate Passwords
function validate_Pwd(){
	password = document.querySelector("#signuppwd").value;
	confirm_password = document.querySelector("#signupconfirm_pwd").value;
	if (password === confirm_password && password != "") {
		alert("Successful!\nAccount Created");
		return true;
	}else{
		if(password==""){
		alert("Password is null");
		}else{
		alert("Passwords aren't match.\nPlease re-enter your password.");
		}return false;
}
};

//JS redirect function page
function link_page(clicked_id){
	if(clicked_id == "goals"){
 	location.href = '/home/goal';
}else if(clicked_id == "expenses"){
	location.href = '/home/expenses';
}else if(clicked_id == "reports"){
	location.href = '/home/report2018';
}
};

//Scrool to what you can do part
$(document).ready(function() {
	console.log("load MyWalletjs");
	//Before login (other page link to home)
	$("#nav_Ser").click(function(){
		location.href = '/MyWallet#Services';
	});
	$("#info").click(function(){
		 location.href = '/MyWallet#intro';
	});
	
	//After login (other page link to login-home)
	$("#info_login").click(function(){
		 location.href = '/MyWalletHome#intro';
	});
	$("#nav_Ser_login").click(function(){
		 location.href = '/MyWalletHome#Services';
	});

	//After login ( info link to services)
	$("#try_now").click(function(){
		 $('html, body').animate({ scrollTop:  $("#Services").offset().top }, 'slow');
  	});

	//Used for both Before login and after login (Link to own page's info and services)
	$("#info_home").click(function(){
		 $('html, body').animate({ scrollTop:  $("#intro").offset().top }, 'slow');
	});
	
	$("#nav_Ser_home").click(function(){
		 $('html, body').animate({ scrollTop:  $("#Services").offset().top }, 'slow');
  	});
});

//Validate password if correct will redirect to particular Thank you page
//  window.addEventListener("load",function(){
//  	console.log("load js");
//  	document.querySelector("#Create_Account").addEventListener("submit", function(e){
//  		e.preventDefault();
//  		if(validate_Pwd()){
//  		 	location.href = '/MyWallet/registered';
//  		}
//  		return false;
//  	});
// });

/*This is for Google signin js*/
// gapi.load('auth2',function(){
// 	gapi.auth2.init();
// });

//  function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

