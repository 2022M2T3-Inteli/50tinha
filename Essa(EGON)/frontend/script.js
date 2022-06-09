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

//Requição AJAX
const rodape = document.getElementById("rodape")
rodape.onload = geraTabela()
const tabela= document.getElementById("hover_tabela")

function geraTabela(){
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        let MyJson = JSON.parse(this.responseText);
        let MyJsonSize = MyJson.length;
        // tabela.innerHTML = ""
        for(let i = 0; i < MyJsonSize; i++ ){
            if(MyJson[i].hours < 50 ){
                quadrado = "quadrado_verde";
            }
            else if(MyJson[i].hours >= 50 && MyJson[i].hours < 70){
                quadrado = "quadrado_amarelo";
            }
            else if(MyJson[i].hours >= 70 && MyJson[i].hours < 88 ){
                quadrado = "quadrado_vermelho";
            }
            else if(MyJson[i].hours >= 88 ){
                quadrado = "quadrado_preto";
            } 
        tabela.innerHTML += `<tr> <td><a data-toggle="modal" href="#modalhoras"><div class="modal_professional" > ${MyJson[i].name} </div></a></td> <td> ${MyJson[i].role} </td><td> ${MyJson[i].type} </td><td> ${MyJson[i].field} </td>  <td> <span class=${quadrado}> ${MyJson[i].hours}/170/176 </span> </td></tr>`;
        }
    }

    let url = "http://localhost:3061/profissionais"
    request.open("GET", url, true);
    request.send()
    
}