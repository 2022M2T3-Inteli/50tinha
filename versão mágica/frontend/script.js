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
n = 0;
res = 90;
function criarProjeto(){
    n +=1;
    var mesInicio = document.getElementById("meses").value
    var mesFinal = document.getElementById("meses1").value
    var tamanho = 84 * (mesFinal - mesInicio)
    var nP = document.getElementById("nP").value;
    document.getElementById("c-todos").innerHTML += "<li><div>"+nP+"</div></li>";
    $("#c-todos > li:nth-child("+n+")").css("max-width",tamanho+"px");
    console.log(tamanho)    
    $("#c-todos > li:nth-child("+n+")").css("margin-left",mesInicio*82+"px")
}