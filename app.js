var express = require("express");
var app = express();


//Before login
app.get("/MyWallet", function(req, res){  
    res.render("home.ejs",{
    	title: 'MyWallet'});
});

app.get("/signup", function(req, res){
    res.render("signup.ejs",{
    	title: 'Sign up'});
});

app.get("/registered", function(req, res){
    res.render("register.ejs",{
    	title: 'Success'});
});

app.get("/login", function(req, res){
    res.render("login.ejs",{
    	title: 'Login'});
});

//after login
//mywallet
app.get("/MyWallet-login", function(req, res){  
    res.render("Login_home.ejs",{
    	title: 'MyWallet'});
});




//home
app.get("/home", function(req, res){
    res.render("home_user.ejs",{
    	title: 'Home'});
});

//goal
app.get("/mygoal", function(req, res){
    res.render("goal.ejs",{
    	title: 'MyGoal'});
});

//manage expenses
app.get("/manage", function(req, res){
    res.render("expenses.ejs",{
    	title: 'ManageExpenses'});
});

//report
app.get("/report2016", function(req, res){
    res.render("report2016.ejs",{
    	title: 'ExpensesReport'});
});
app.get("/report2017", function(req, res){
    res.render("report2017.ejs",{
    	title: 'ExpensesReport'});
});
app.get("/report2018", function(req, res){
    res.render("report2018.ejs",{
    	title: 'ExpensesReport'});
});


app.listen(3000, function(){ 
    console.log('Server has started!!!');
});

app.use(express.static("public"));

