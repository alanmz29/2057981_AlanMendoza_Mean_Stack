let express = require("express");
let app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require("mongoose");
const { table } = require("console");
let url = "mongodb://localhost:27017/courses";
mongoose.pluralize(null); 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

let db = mongoose.connection;
let courseSchema = mongoose.Schema({
    _id:Number,
    cName:String,
    cDes:String,
    cAmnt:Number
});

let courseModel = mongoose.model("Course",courseSchema);

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\index.html");
})
app.get("/addCourse",(request,response)=> {
    response.sendFile(__dirname+"\\addCourse.html");
})
app.get("/storeCourse",(request,response)=> {

    let courseId = request.query["cId"];
    let courseName = request.query["cName"];
    let courseDes = request.query["cDes"];
    let courseAmnt = request.query["cAmnt"];
    let c = new courseModel({_id:courseId,cName:courseName,cDes:courseDes,cAmnt:courseAmnt});

    courseModel.insertMany([c],(err,result)=> {
        if(!err)
        {
            console.log(result);
            response.sendFile(__dirname+"\\addCourse.html");

        } 
        else
        {
            console.log(err);
        }
    })
        
})
app.get("/deleteCourse",(request,response)=> {
    response.sendFile(__dirname+"\\deleteCourse.html");
})
app.get("/delCourse",(request,response)=> {
    let courseId = request.query["cId"];
    courseModel.deleteMany({_id:courseId},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                        console.log("Record deteled successfully");
                }else {
                        console.log("Record not present");
                }
        }else {
                console.log(err)
        }
    })

    response.sendFile(__dirname+"\\deleteCourse.html");
})
app.get("/updateCourse",(request,response)=> {
    response.sendFile(__dirname+"\\updateCourse.html");
})
app.get("/update",(request,response)=> {
    let courseId = request.query["cId"];
    let newAmnt = request.query["cAmnt"];
    courseModel.updateOne({_id:courseId},{$set:{cAmnt:newAmnt}},(err,result)=> {
        if(!err){
            console.log(result)
            if(result.modifiedCount>0 || result.matchedCount>0){
                    console.log("Product updated successfully")
            }else {
                    console.log("Prouct didn't update");
            }
        }else {
            console.log(err);
        }
    })
    response.sendFile(__dirname+"\\updateCourse.html");
})
app.get("/fetchCourses",(request,response)=> {
    var tableStart = `<table border="1">
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Course Amount</th>
            </tr>`
            var tableBody = "";
            var tableEnd = `</table>`;
        courseModel.find({},(err,doc)=> {
            if(!err){
                    doc.forEach(c=> {  
                        tableBody = tableBody + `<tr>
                        <td>`+ c._id +`</td>`+
                        `<td>`+ c.cName +`</td>`+
                        `<td>` + c.cDes +`</td> `+
                        `<td>` + c.cAmnt +`</td> `+
                        `</tr>`
                    })
                    response.send(tableStart+tableBody+tableEnd + `<a href="/"> Go Back </a>`);
            }else {
                console.log(err);
            }
        })
})















app.listen(9090,()=>console.log("Server running on port number 9090"))