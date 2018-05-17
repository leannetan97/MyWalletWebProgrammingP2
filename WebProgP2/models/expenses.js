/*Define variables*/
var mongoose = require("mongoose");

/*Define Schema*/
var ExpensesSchema = new mongoose.Schema({
	key:{type:String, unique: true, required: true},
	value:String,
});

/*Define Model*/
module.exports = mongoose.model("Expenses", ExpensesSchema);
