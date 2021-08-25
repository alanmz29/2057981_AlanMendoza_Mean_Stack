function logPerson(){
    let readline= require("readline-sync");
    let fs = require("fs");
    const { time } = require("console");
    let fileName = readline.question("Enter the name of the json file you want to read(no extension): ");
    let path = fileName + ".json"
    debugger;
    let cont = true;
    data = []
    if (fs.existsSync(path)) 
    {   
        data = JSON.parse(fs.readFileSync(path).toString());
        debugger;
    } 
    else 
    {
        console.log("The file " + path + " does not exist, please enter and existing json file.");
        debugger;
    }

    while(cont)
    {
        let firstN = readline.question("Enter fist name: ");
        let lastN = readline.question("Enter last name: ");
        let gender = readline.question("Enter gender: ");
        let email = readline.questionEMail("Enter email: ");
        let timestamp = new Date().toISOString();
        debugger;
        data.push({"FirstName":firstN,"LastName":lastN,"Gender":gender,"Email":email,"TimeStamp":timestamp});
        fs.writeFileSync(path,JSON.stringify(data));
        debugger;
        let contIn = readline.question("Press Y/y to log another person or E to exit-");
        debugger;
        if(contIn == "Y" || contIn == "y")
        {
            cont = true;
        }
        else
        {
            cont = false;
        }
    }
}

logPerson();
