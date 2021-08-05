function appendImage(){
    var title = document.getElementById("titleIn").value;
    var article = document.getElementById("articleIn").value;
    var url = document.getElementById("imageIn").value;

    document.getElementById("card").innerHTML += "<div class=\"card\" style=\"width: 10rem;\">"+
    "<img src=" + url + " class=\"card-img-top\" alt=\"\">" +
    "<div class=\"card-body\">"+
    "<h5 class=\"card-title\">" + title + "</h5>" +
    "<p class=\"card-text\">" + article + "</p>" +
    "</div>" +
    "</div>";
}
