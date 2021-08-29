//let http = require("http");
//let url = require("url");
let fs = require("fs");
taskDataBase = "tasks.json"
taskArray = []
if (fs.existsSync(taskDataBase)) 
{   
    taskArray = JSON.parse(fs.readFileSync(taskDataBase).toString());
    debugger;
} 
else 
{
    console.log("The file " + taskDataBase + " does not exist.");
    debugger;
}

/* let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    response.write(loginPage);
    console.log(urlInfo);
    if(urlInfo.pathname == "/addTask")
    {
        taskInfo = urlInfo.query;
        let result = taskArray.find(t=>t.taskId == taskInfo.taskid);
        if(result == undefined)
        {
            taskArray.push({"empId":taskInfo.empid,"taskId":taskInfo.taskid,"Task":taskInfo.task,"Deadline":taskInfo.date})
            response.write("Added new task successfully!");
            console.log(taskArray);
        }
        else
        {
            response.write("The task with ID: " + taskInfo.taskid + " already exists");
            console.log(taskArray);
        }

    }
    
}); */
let http = require("http");
let url = require("url");
let loginDetail = [
    {"user":"Raj","pass":"123"},
    {"user":"Ramesh","pass":"567"},
    {"user":"Raju","pass":"1100"},
]
let indexPage = `
            <html>
                    <head>
                    </head>
                    <body>
                    <h2>Welcome to Task Tracker</h2>
                    <a href="AddTask">Add Task </a> |
                    <a href="DeleteTask">Delete Task</a> |
                    <a href="Viewtasks">View Tasks </a>
                    </body>
            </html>
`
let addTaskPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Login Page</h2>
    <form action="checkTask">
        <label>Employee ID:</label>
        <input type="text" name="empid" required/><br/>
        <label>Task ID:</label>
        <input type="text" name="taskid" required/><br/>
        <label>Task:</label>
        <input type="text" name="task" required /><br/>
        <label>Deadline:</label>
        <input type="date" name="date" required/><br/>
    
        <input type="submit" value="Add Task!"/>
       <input type="reset" value="Reset"/> <br/>
       <a href="index">Back</a>
    </form>
</body>
</html> 


`
let loginPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Login Page</h2>
    <form action="checkLogin">
        <label>UserName</label>
        <input type="text" name="user"/><br/>
        <label>Password</label>
        <input type="password" name="pass"/><br/>
        <input type="submit" value="submit"/>
       <input type="reset" value="reset"/> <br/>
       <a href="signup">Sign Up</a>
    </form>
</body>
</html> 
`

let registerLoginPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Registration Page</h2>
    <form action="register">
        <label>UserName</label>
        <input type="text" name="user"/><br/>
        <label>Password</label>
        <input type="password" name="pass"/><br/>
        <input type="submit" value="submit"/>
       <input type="reset" value="reset"/> 
    </form>
</body>
</html>
`
let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == "/AddTask")
        {
                response.write(addTaskPage);
        }
        else if(urlInfo.pathname == "/checkTask")
        {
            taskInfo = urlInfo.query;
            let result = taskArray.find(t=>t.taskId == taskInfo.taskid);
            response.writeHead(200,{"content-type":"text/html"});
            if(result == undefined)
            {
                taskArray.push({"empId":taskInfo.empid,"taskId":taskInfo.taskid,"Task":taskInfo.task,"Deadline":taskInfo.date})
                response.write(addTaskPage);
                response.write("Added new task successfully!");
                fs.writeFileSync(taskDataBase,JSON.stringify(taskArray));
            }
            else
            {
                response.write(addTaskPage);
                response.write("The task with ID: " + taskInfo.taskid + " already exists");
            }
        }
        else if(urlInfo.path == "/Login"){
            response.write(loginPage);
        }else if(urlInfo.pathname == "/checkLogin"){
                let login = urlInfo.query;
                let result = loginDetail.find(l=>l.user == login.user && l.pass==login.pass);
                if(result != undefined){
                        response.write("Successfully Login!");
                }else {
                        response.write("Failure try once again!");
                }
        }else if(urlInfo.path =="/signup"){
                response.write(registerLoginPage);
        }else if(urlInfo.pathname == "/register"){
                let login = urlInfo.query;
                let result = loginDetail.find(l=>l.user == login.user);
                // 200 -success code , content type in header text/html
                response.writeHead(200,{"content-type":"text/html"});
                if(result == undefined){
                    loginDetail.push(login);    // added user and pass in loginDetails
                    response.write("Account Created successfully!");     
                    response.write(loginPage);            
                    }else {
                        response.write("User Name must be unique!");     
                        response.write(loginPage); 
                }
        }
        else {
            response.write(indexPage);  
        }
    }
    
    response.end();

})

server.listen(9090,()=>console.log("Server running on port number 9090"))