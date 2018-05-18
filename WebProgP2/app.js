/*Require all packages*/
var express 				= require("express"),
	mongoose 				= require("mongoose"),
	passport 				= require("passport"),
	bodyParser 				= require("body-parser"),
	LocalStrategy 			= require("passport-local").Strategy,
	passportLocalMongoose 	= require("passport-local-mongoose"),
	session					= require("express-session"),
	User 					= require("./models/user"),
	Expenses                = require("./models/expenses"),
    Goal                    = require("./models/goal");

/*Define variables*/
var app = express();

/*Set view engine*/
app.set("view engine", "ejs");

/*Define connection*/
var db = mongoose.connect("mongodb://localhost/myWallet");

// Test connection to db
mongoose.connection.on("error", function (error) {  
  console.log("Connection to DB fail：" + error); 
}); 
mongoose.connection.on("open", function () {  
  console.log("DB Connect Successfully");
});

/*Use*/
//CSS and JS
app.use(express.static("public", { redirect : false }));

//Body parser
app.use(bodyParser.urlencoded({extended:true}));

//Express session
app.use(session({
	secret:"This is secret",
	resave:false,
	saveUninitialized: false
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Tell Passport to use the local strategy
passport.use(new LocalStrategy(User.authenticate()));

//Ask passport read this session, take the data , encode and decoded it
passport.serializeUser(User.serializeUser()); //encode 
passport.deserializeUser(User.deserializeUser()); //decode 

/* Defined Route for page*/
app.get("/MyWallet", function(req, res){  
    res.render("home",{
    	title: 'MyWallet'});
});


/*Successful registered------------------------Secret page1*/
app.get("/registered",isLoggedIn,function(req, res){  
    res.render("register", {title: "Success"});
    });

/*Post route-----------------------------------------------------------*/
//signup
app.post("/MyWallet/signup",function(req,res){
	User.register(new User({username:req.body.username, name:req.body.myName}), req.body.password, function(error,user){
		console.log("create user");
		if(error){
			console.log(error);
			return res.render("signup",{title:'Sign up'});
		}
	//logged the user in using passport
		passport.authenticate("local")(req, res, function(){
			console.log("redirect");
			res.redirect("/registered");
		});
	});
});

//login
app.post("/login",passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/MyWallet/login"
}) ,function(req, res){
});

//Before login
app.get("/MyWallet/:pageName",function(req, res){
    var page = req.params.pageName;
    if(page.toLowerCase() === "signup"){
    	//SignUp Page
    	res.render("signup",{
    		title: 'Sign up'});
    }else if(page.toLowerCase() === "login"){
    	//Login Page
    	res.render("login",{
    		title: 'Login'});
    }else{
    	res.redirect("*");
    }
});

//After login
//myWallet Home
app.get("/MyWalletHome", isLoggedIn,function(req, res){  
    res.render("Login_home",{
    	title: 'MyWallet'});
});

//Home--------------------SecretPage2
app.get("/home",isLoggedIn, function(req, res){
    res.render("home_user",{
    	title: 'Home'});
});

//Features
app.get("/home/:features", isLoggedIn,function(req, res){
	var f = req.params.features;
    if(f.toLowerCase() === "goal"){
    	//goal
        //Find data from database and pass to front end
        Goal.find({key: req.user.username}, {_id: 0, key: 0, __v: 0}, function(err, item) {
            if (err) {
                console.log("Opps Something went Wrong");
                console.log(err);
            }else{
                if(item.length == 0){
                    console.log("here no goal")
                    res.render("goal",{
                    title: 'MyGoal', username: req.user.username, goalTable : JSON.stringify({value: '[]'})});
                } else {
                    console.log("Found goalTable")
                    res.render("goal",{
                    title: 'MyGoal', username: req.user.username, goalTable : item});
                }
            }
        });
    }else if(f.toLowerCase() === "expenses"){
    	//manage expenses
        //Find data frm database and pass to front end
        Expenses.find({key: req.user.username}, {_id: 0, key: 0, __v: 0}, function(err, item) {
            if (err) {
                console.log("Opps Something went Wrong");
                console.log(err);
            }else{
                if(item.length == 0){
                    console.log("here")
                    res.render("expenses",{
                    title: 'ManageExpenses', username: req.user.username, expensesTable : JSON.stringify({value: '[]'})});
                } else {
                    console.log("Found expensesTable")
                	res.render("expenses",{
            		title: 'ManageExpenses', username: req.user.username, expensesTable : item});
                }
            }
        });
    }else if(f.toLowerCase() === "report2018"){
		//report2018
        Expenses.find({key: req.user.username}, {_id: 0, key: 0, __v: 0}, function(err, item) {
            if (err) {
                console.log("Opps Something went Wrong");
                console.log(err);
            }else{
                if(item.length == 0){
                    console.log("No expenses, no data shown");
                    res.render("report2018",{
            title: 'ExpensesReport', username: req.user.username, report : JSON.stringify({value: '[]'})});
                } else {
                    console.log("Found expenses, data pass to report")
                    res.render("report2018",{
            title: 'ExpensesReport', username: req.user.username, report:item});
                }
            }
        });
    }else if(f.toLowerCase() === "report2017"){
    	//report2017
         Expenses.find({key: req.user.username}, {_id: 0, key: 0, __v: 0}, function(err, item) {
            if (err) {
                console.log("Opps Something went Wrong");
                console.log(err);
            }else{
                if(item.length == 0){
                    console.log("No expenses, no data shown");
                    res.render("report2017",{
            title: 'ExpensesReport', username: req.user.username, report : JSON.stringify({value: '[]'})});
                } else {
                    console.log("Found expenses, data pass to report")
                    res.render("report2017",{
            title: 'ExpensesReport', username: req.user.username, report:item});
                }
            }
        });
    }else if(f.toLowerCase() === "report2016"){
    	//report2016
         Expenses.find({key: req.user.username}, {_id: 0, key: 0, __v: 0}, function(err, item) {
            if (err) {
                console.log("Opps Something went Wrong");
                console.log(err);
            }else{
                if(item.length == 0){
                    console.log("No expenses, no data shown");
                    res.render("report2016",{
            title: 'ExpensesReport', username: req.user.username, report : JSON.stringify({value: '[]'})});
                } else {
                    console.log("Found expenses, data pass to report")
                    res.render("report2016",{
            title: 'ExpensesReport', username: req.user.username, report:item});
                }
            }
        });
    }else{
    	res.redirect("*");
    }
});

//logout
app.get("/logout",isLoggedIn,function(req,res){
	req.logout();
	res.redirect("/MyWallet");
});

/*---------------------UPDATE EXPENSES TABLE-----------*/
app.post("/updateTable", isLoggedIn, function(req, res){
    var myNewExpenses = new Expenses({key: req.body.key, value: req.body.value});
    console.log(req.body.key)
    Expenses.find({key: req.body.key}, function(err, item) {
        if (err) {
            console.log("error");
        } else {
            if (item.length == 0) {
                myNewExpenses.save(function(err, item) {
                    if (err) { console.log(err); }
                    console.log(item);
                });
                console.log("new item saved");
            } else {
                Expenses.updateOne({key:req.body.key},{value: req.body.value}, function(err, res) {
                    if (err) {
                        console.log("error");
                    }
                });
                console.log("old item updated");
            }
        }
    })
});

/*---------------------UPDATE GOAL TABLE-----------*/
app.post("/updateGoalTable", isLoggedIn, function(req, res){
    var myNewGoal = new Goal({key: req.body.key, value: req.body.value});
    console.log(req.body.key);
    Goal.find({key: req.body.key}, function(err, item) {
        if (err) {
            console.log("error");
        } else {
            if (item.length == 0) {
                myNewGoal.save(function(err, item) {
                    if (err) { console.log(err); }
                    console.log(item);
                });
                console.log("new goal saved");
            } else {
                Goal.updateOne({key:req.body.key},{value: req.body.value}, function(err, res) {
                    if (err) {
                        console.log("error");
                    }
                });
                console.log("old goal updated");
            }
        }
    })
});


//Check login or not
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/MyWallet/login");
}

/*----------------------------------------------*/
//Apply "*" route matcher 
app.get("*", function(req,res){
    res.send("Sorry, page not found, check your path again.");
});

//Local Host started
app.listen(3000, function(){ 
    console.log('Server has started!!!');
});