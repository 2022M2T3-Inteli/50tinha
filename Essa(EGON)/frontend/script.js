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
var largura = window.screen.height
var larguraAjuste = largura - (largura*0.15)
n = 0; // Usado para indentificar o numero de projetos e ordenados
res = 90;
function criarProjeto(){
    n +=1;
    var nP = document.getElementById("nP").value; // np = Nome do projeto
    var anoInicio = parseInt(document.getElementById("Ano").value);
    var anoFim = parseInt(document.getElementById("Ano1").value);
    var anoRes = (anoFim - anoInicio);
    var mesInicio = parseInt(document.getElementById("meses").value)
    var mesFinal = parseInt(document.getElementById("meses1").value)
    var tamanho = ((mesFinal - mesInicio)+1)
    var percentual = 1/larguraAjuste
    var anoA = 11
    console.log("Ano: "+anoRes+" anoA: "+anoA)
    console.log(larguraAjuste)
    if( anoRes == 0 ){
        tamanho = ((percentual+7)*tamanho)
        }
    else{
        tamanho = (anoRes*((percentual+7)*11) + ((percentual+7)*tamanho)) + 15
        }
    mesInicio+=1
    console.log("Antes: "+mesInicio)
    mesInicio = ((percentual+7)*(mesInicio-1))
    console.log("Depois: "+mesInicio)
    document.getElementById("c-todos").innerHTML += "<li><div>"+nP+"</div></li>";
    $("#c-todos > li:nth-child("+n+")").css("width",(tamanho)+"%");
    $("#c-todos > li:nth-child("+n+")").css("margin-left",parseInt(mesInicio)+"%")
    console.log("Tamanho:"+tamanho)
    console.log("MesInicio:"+mesInicio)
    console.log("ResAno:"+anoRes)
    if(tamanho>80){
        let x = 85*(anoRes+1)
        let y = (50/(anoRes+1*(percentual+100)))
        window.document.getElementById("add").innerHTML += "<div>"+"---- "+String(anoFim)+" --->"+"</div><ul class=\"month\"><li><h3> jan </h3></li><li><h3> fev </h3></li><li><h3> mar </h3></li><li><h3> abr </h3></li><li><h3> mai </h3></li><li><h3> jun </h3></li><li><h3> jul </h3></li><li><h3> ago </h3></li><li><h3> set </h3></li><li><h3> out </h3></li><li><h3> nov </h3></li><li><h3> dez </h3></li></ul>"
        $("#add").css("width",(x)+"%")
        $(".month").css("min-width",(y)+"%"+"!important")
        console.log("y: "+y)
    }
    
}


function scrollOn(){
    console.log(window.Date())
}


var x = 0
function keyB(){
    x += 100
    console.log(x)
    $("#calendario").css("left","auto")
    $("#calendario").css("right",(x)+"px")
}

function keyA(){
    x -= 100 
    console.log(x)
    $("#calendario").css("left","auto")
    $("#calendario").css("right",(x)+"px")
}