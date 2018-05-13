
window.addEventListener("load",function(){
// display the model
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btnadd = document.getElementById("myModalbtn");

// Get the <span> element that closes the modal
var spanadd = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btnadd.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanadd.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } 
}
});

function myCreateFunction(){
    //get user type in new goal and target saving value
    var goal = document.getElementById("newGoal").value;
    var targetsaving = document.getElementById("targetSaving").value; 
    if(goal!= "" && targetsaving!= "" && targetsaving!=0){
    // defined a new row
    var table = document.getElementById("goalTable");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    // Save target saving in targetGoal table
    document.getElementById("TargetGoal").innerHTML = (parseInt(targetsaving)).toFixed(2);
    // create a new row with 3 column
    cell1.innerHTML = '<tr><td><input type="text" id="typeGoal" name="text" disabled value="'+goal+'"><td>';
    cell2.innerHTML = '<td><button onclick="myEditFunction(this)" id="myModaleditbtn" class="btn btn-default">Edit</button><td>';
    cell3.innerHTML = '<td><button onclick="mySelectFunction(this)" id="myModaleselectbtn" class="btn btn-primary">Select</button><td>';
    cell4.innerHTML = '<td><button onclick="myDeleteFunction(this)" type="button" class="btn btn-danger">Del</button></td></tr>';
    //close the addrow pop up window when they press save
    (document.getElementById('myModal')).style.display = "none";
    // add the goals into a array
    goals.push([goal,targetsaving]);
    //Get the ans from the targetGoal table and moneySave frm database
    var targetGoal = document.getElementById("TargetGoal").innerHTML;
    var moneySave = document.getElementById("MoneySaved").innerHTML;
    // Calculate the Money Required
    var moneyRequired = ((parseInt(targetGoal))-(parseInt(moneySave))).toFixed(2);
    if(moneyRequired > 0){
    document.getElementById("MoneyRequired").innerHTML=moneyRequired;
    // SET percentage into the table
    document.getElementById("mrPercent").innerHTML = ((parseInt(moneyRequired)/parseInt(targetGoal))*100).toFixed(0) + "%";
    document.getElementById("msPercent").innerHTML = ((parseInt(moneySave)/parseInt(targetGoal))*100).toFixed(0) + "%";   
    }else{
    document.getElementById("MoneyRequired").innerHTML = parseInt("0").toFixed(2);
    // SET percentage into the table
    document.getElementById("mrPercent").innerHTML = parseInt("0").toFixed(0) +"%";
    document.getElementById("msPercent").innerHTML = parseInt("100").toFixed(0) +"%";    
    }
    //clear the input
    document.getElementById("newGoal").value = null;
    document.getElementById("targetSaving").value= null;
    }else{
        alert("Goal or target saving is empty");
    }
}

function myEditFunction(element) {
    // defined edit modal
    var modaledit = document.getElementById('myModaledit');
    var btnedit = document.getElementById("myModaleditbtn");
    var spanedit = document.getElementsByClassName("close")[1];
    
    modaledit.style.display = "block";
    
    spanedit.onclick = function() {
    modaledit.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modaledit) {
            modaledit.style.display = "none";
        }
    }
    // getDetails of particular row
    var rowNumber = element.closest('tr').rowIndex;
    var goal = goals[rowNumber][0];
    var targetsaving = goals[rowNumber][1];
    //update it in the edit pop up fill
    document.getElementById("editGoal").value = goal;
    document.getElementById("targetSavingedit").value = (parseInt(targetsaving)).toFixed(2);
    // set into target goal table
    document.getElementById("TargetGoal").innerHTML = (parseInt(targetsaving)).toFixed(2);
    // Calculate the Money Required
    var moneySave = document.getElementById("MoneySaved").innerHTML;
    var moneyRequired = ((parseInt(targetsaving))-(parseInt(moneySave))).toFixed(2);
    document.getElementById("MoneyRequired").innerHTML= moneyRequired;

    // SET percentage into the table
    document.getElementById("mrPercent").innerHTML = ((parseInt(moneyRequired)/parseInt(targetsaving))*100).toFixed(0) + "%";
    document.getElementById("msPercent").innerHTML = ((parseInt(moneySave)/parseInt(targetsaving))*100).toFixed(0) + "%";   
    
    // when save change button clicked
    SaveChange.onclick = function(){
    var goal= document.getElementById("editGoal").value;
    var targetsaving = document.getElementById("targetSavingedit").value;
    if(goal!= "" && targetsaving!= "" && targetsaving!=0){
    goals[rowNumber][0] = document.getElementById("editGoal").value;
    targetsavingedit = document.getElementById("targetSavingedit").value;
    goals[rowNumber][1]= targetsavingedit;
    //close the edit pop up window when they press save
    (document.getElementById('myModaledit')).style.display = "none";
    // set into target goal
    document.getElementById("TargetGoal").innerHTML = (parseInt(targetsavingedit)).toFixed(2);
    // Calculate the Money Required
    var moneySave = document.getElementById("MoneySaved").innerHTML;
    var moneyRequired = ((parseInt(targetsavingedit))-(parseInt(moneySave))).toFixed(2);
    document.getElementById("MoneyRequired").innerHTML= moneyRequired;
    // SET percentage into the table
    document.getElementById("mrPercent").innerHTML = ((parseInt(moneyRequired)/parseInt(targetsavingedit))*100).toFixed(0) + "%";
    document.getElementById("msPercent").innerHTML = ((parseInt(moneySave)/parseInt(targetsavingedit))*100).toFixed(0) + "%";
 }else{
     alert("Goal or target saving is empty");
 }
}}

function mySelectFunction(element){
    var rowNumber = element.closest('tr').rowIndex;
    targetsavingselect = goals[rowNumber][1];
    document.getElementById("TargetGoal").innerHTML = (parseInt(targetsavingselect)).toFixed(2);
    // Calculate the Money Required
    var moneySave = document.getElementById("MoneySaved").innerHTML;
    var moneyRequired = ((parseInt(targetsavingselect))-(parseInt(moneySave))).toFixed(2);
    document.getElementById("MoneyRequired").innerHTML= moneyRequired;
    // SET percentage into the table
    document.getElementById("mrPercent").innerHTML = ((parseInt(moneyRequired)/parseInt(targetsavingselect))*100).toFixed(0) + "%";
    document.getElementById("msPercent").innerHTML = ((parseInt(moneySave)/parseInt(targetsavingselect))*100).toFixed(0) + "%";
}

function myDeleteFunction(element){
    console.log("test_alert");
    var ans = confirm("Are you sure you want to delete this goal?");
    if(ans == true){
    var rowNumber = element.closest('tr').rowIndex;
    goals.splice(rowNumber,1);
    console.log(goals);
    document.getElementById("TargetGoal").innerHTML = parseInt("0").toFixed(2);
    document.getElementById("goalTable").deleteRow(rowNumber);
    // Calculate the Money Required
    var moneySave = document.getElementById("MoneySaved").innerHTML;
    document.getElementById("MoneyRequired").innerHTML = parseInt("0").toFixed(2);
    // SET percentage into the table
    document.getElementById("mrPercent").innerHTML = parseInt("0").toFixed(0) +"%";
    document.getElementById("msPercent").innerHTML = parseInt("0").toFixed(0) +"%";
    }
}

