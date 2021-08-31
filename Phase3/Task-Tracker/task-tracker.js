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
    <h2>Add Task</h2>
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
let delTaskPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Delete Task</h2>
    <form action="findTask">
        <label>Task ID:</label>
        <input type="text" name="taskid" required/><br/>
    
        <input type="submit" value="Delete Task!"/>
       <input type="reset" value="Reset"/> <br/>
       <a href="index">Back</a>
    </form>
</body>
</html> 
`

let viewTaskPage=`<a href="index">Back</a>`

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
        else if(urlInfo.path == "/DeleteTask")
        {
            response.write(delTaskPage);
        }
        else if(urlInfo.pathname == "/findTask")
        {
            let tid = urlInfo.query;
            let index = taskArray.findIndex(t=>t.taskId == tid.taskid);
            response.writeHead(200,{"content-type":"text/html"});
            if(index == -1 )
            {
                response.write(delTaskPage);
                response.write("Could not delete task with ID: " + tid.taskid);
            }
            else
            {
                taskArray.splice(index,1);
                fs.writeFileSync(taskDataBase,JSON.stringify(taskArray));
                response.write(delTaskPage);
                response.write("Deleted task with ID: " + tid.taskid +  " successfully");
            }
        }
        else if(urlInfo.path =="/Viewtasks")
        {
            var tableStart = `<table border="1">
            <tr>
              <th>Employee ID</th>
              <th>Task ID</th>
              <th>Task</th>
              <th>Deadline</th>
            </tr>`
            var tableBody = "";
            var tableEnd = `</table>`;
            for (let i = 0; i < taskArray.length; i++) 
            {
                tableBody = tableBody + `<tr>
                                         <td>`+ taskArray[i].empId +`</td>`+
                                         `<td>`+ taskArray[i].taskId +`</td>`+
                                         `<td>` + taskArray[i].Task +`</td> `+
                                         `<td>` + taskArray[i].Deadline +`</td> `+
                                         `</tr>`
            }
            response.write(viewTaskPage);
            response.write(tableStart + tableBody + tableEnd);
        }
        else {
            response.write(indexPage);  
        }
    }
    response.end();
});

server.listen(9090,()=>console.log("Server running on port number 9090"))