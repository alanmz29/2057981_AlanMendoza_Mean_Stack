let totalItems:number = 0;
let IP12Ptotal:number = 0;
let IP12total:number = 0;
let IPtotal:number = 0;
let IP11total:number = 0;
let totalPrice:number =0;

function addIP12P(){
    this.IP12Ptotal ++;
    this.totalPrice = this.totalPrice + 999;
    totalItems++;
    document.getElementById("cartSize").innerHTML = "Cart Size: " + totalItems;
}

function addIP12(){
    IP12total ++;
    totalItems++;
    totalPrice = this.totalPrice + 849;
    document.getElementById("cartSize").innerHTML = "Cart Size: " + totalItems;
}
function addIP(){
    IPtotal ++;
    totalItems++;
    totalPrice = this.totalPrice + 550;
    document.getElementById("cartSize").innerHTML = "Cart Size: " + totalItems;
}
function addIP11(){
    IP11total ++;
    totalItems++;
    totalPrice = totalPrice + 649;
    document.getElementById("cartSize").innerHTML = "Cart Size: " + totalItems;
}

function storeData(){
    let cartData = {iPhone12Pro:IP12Ptotal,iPhone12:IP12total,iPad:IPtotal,iPhone11:IP11total,TotalPrice:totalPrice,cartSize:totalItems};
    sessionStorage.setItem("CartData", JSON.stringify(cartData));
}

function viewCart(){
    let tableStart:string = "<table class=\"table\"> <thead class=\"thead-dark\"><tr><th>Device Name</th><th>Quantity</th><th>Price</th></tr></thead><tbody>";
    let tableEnd:string = "</tbody></table>";
    let tableBody:string = ""
    let sessionData = sessionStorage.getItem("CartData");
    let empJson = JSON.parse(sessionData);
    document.getElementById("cartDisplay").innerHTML = "Cart Size: " + empJson.cartSize;
    if(empJson.iPhone12Pro != 0){
        tableBody = tableBody + "<tr><th scope=\"row\">iPhone12 Pro</th> <td>"+ empJson.iPhone12Pro +"</td> <td>$999</td></tr>"
    }
    if(empJson.iPhone12 != 0){
        tableBody = tableBody + "<tr><th scope=\"row\">iPhone12</th> <td>"+ empJson.iPhone12 +"</td> <td>$849</td></tr>"
    }
    if(empJson.iPad != 0){
        tableBody = tableBody + "<tr><th scope=\"row\">iPad</th> <td>"+ empJson.iPad +"</td> <td>$550</td></tr>"
    }
    if(empJson.iPhone11 != 0){
        tableBody = tableBody + "<tr><th scope=\"row\">iPhone11</th> <td>"+ empJson.iPhone11 +"</td> <td>$649</td></tr>"
    }
    tableBody = tableBody +"<tr><th scope=\"row\">Total</th> <td> - </td> <td>" + "$" +empJson.TotalPrice + "</td></tr>"
    document.getElementById("table").innerHTML = tableStart+tableBody+tableEnd;
    
    
}