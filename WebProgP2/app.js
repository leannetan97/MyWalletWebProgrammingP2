/*Require all packages*/
var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	localStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

/*Define variables*/
var app = express();

/*Set view engine*/
app.set("view engine", "ejs");

/*Use Css*/
app.use(express.static("public", { redirect : false }));


/* Defined Route for page*/

app.get("/MyWallet/", function(req, res){  
    res.render("home",{
    	title: 'MyWallet'});
});
//Before login
app.get("/MyWallet/:pageName", function(req, res){
    var page = req.params.pageName;
    if(page.toLowerCase() === "signup"){
    	//SignUp Page
    	res.render("signup",{
    		title: 'Sign up'});
 // }else if(page.toLowerCase() === "registered"){
 // 	res.render("register",{
 // 		title: 'Success'});
    }else if(page.toLowerCase() === "login"){
    	//Login Page
    	res.render("login",{
    		title: 'Login'});
    }else{
    	res.redirect("*");
    }
});

/*Successful registered*/
app.get("/registered", function(req, res){  
    res.render("register",{
    	title: 'Success'});
});

//After login
//myWallet Home
app.get("/MyWalletHome", function(req, res){  
    res.render("Login_home",{
    	title: 'MyWallet'});
});

//HomeSecretPage
app.get("/home", function(req, res){
    res.render("home_user",{
    	title: 'Home'});
});


app.get("/home/:features", function(req, res){
	var f = req.params.features;
    if(f.toLowerCase() === "goal"){
    	//goal
    	res.render("goal",{
    		title: 'MyGoal'});
    }else if(f.toLowerCase() === "expenses"){
    	//manage expenses
    	res.render("expenses",{
    		title: 'ManageExpenses'});
    }else if(f.toLowerCase() === "report2018"){
    	res.render("report2018",{
			title: 'ExpensesReport'});
    }else if(f.toLowerCase() === "report2017"){
    	res.render("report2017",{
			title: 'ExpensesReport'});
    }else if(f.toLowerCase() === "report2016"){
    	res.render("report2016",{
			title: 'ExpensesReport'});
    }else{
    	res.redirect("*");
    }
});

//report
// app.get("home/report/:year", function(req, res){
//     var year = req.params.year;
//     if(year === 2016){
//     	res.render("report2016",{
//     		title: 'ExpensesReport'});
// 	}else if(year === 2017){
// 		res.render("report2017",{
// 			title: 'ExpensesReport'});
// 	}else if(year === 2018){
// 		res.render("report2018",{
// 			title: 'ExpensesReport'});
// 	}else{
// 		res.redirect("*");
// 	}
// });

//Apply "*" route matcher 
app.get("*", function(req,res){
    res.send("Sorry, page not found, check your path again.");
});

//Local Host started
app.listen(3000, function(){ 
    console.log('Server has started!!!');
});

