var projectArray = []
var tempArray = []
var empJson = []
function getProjectInfo() {
    var clientName = document.getElementById("clientName").value;
    var projectName = document.getElementById("projectName").value;
    var budget = document.getElementById("budget").value;

    projectJson = {clientName:clientName,projectName:projectName,budget:budget};
    projectArray.push(projectJson);

    sessionStorage.setItem("projectArray", JSON.stringify(projectArray));

    document.getElementById('clientName').value = '';
    document.getElementById('projectName').value = '';
    document.getElementById('budget').value = '';
}

function clearProjectInfo() {

    document.getElementById('clientName').value = '';
    document.getElementById('projectName').value = '';
    document.getElementById('budget').value = '';
}

function displayData() {
        tempArray = sessionStorage.getItem("projectArray");
        var tableContent="";
        var total=0;
        var startTable ="<table border=1 class='table'><tr><th>Id</th><th>Name</th><th>Age</th></tr>";
        let empJson = JSON.parse(tempArray);
        for (let i = 0; i < empJson.length; i++) {
            tableContent = tableContent + "<tr><td>"+ empJson[i].clientName + "</td><td>" + empJson[i].projectName + "</td><td>" + empJson[i].budget + "</td></tr>";
            total = total + parseFloat(empJson[i].budget);
        }
        var endTable="</table>" + "Total: " + total;
        tableContent = startTable+tableContent+endTable;
        document.getElementById("main").innerHTML=tableContent;
}