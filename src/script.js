//Login
var visibilityClick = false
function frg(){
    const eye = document.getElementById("eye")
    const input = document.getElementById("keyInput")
    if(visibilityClick == false){
        eye.innerHTML = "visibility_off"
        input.type = "text"
        visibilityClick = true
    }
    else{
        eye.innerHTML = "visibility"
        visibilityClick = false
        input.type = "password"
        console.log("invisible")
    }
}

//Aba geral - Criar novo projeto

function criarProjeto(){
    var nP = document.getElementById("nP").value;
    document.getElementById("c-todos").innerHTML += "<li><div>"+nP+"</div></li>";
}