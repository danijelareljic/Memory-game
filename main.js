let modal1 = document.getElementById('helpModal');
let help = document.getElementById('help');
help.onclick = function () {
    modal1.style.display = "block";
}
var span = document.getElementsByClassName("close");
span[0].onclick = function () { 
    modal1.style.display = "none";
}