var x = 0
//Login
var btnAtivado = false
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
// var largura = window.screen.height
// var larguraAjuste = largura - (largura*0.15)
// n = 0; // Usado para indentificar o numero de projetos e ordenados
// res = 90;
// function criarProjeto(){
//     n +=1;
//     var nP = document.getElementById("nP").value; // np = Nome do projeto
//     var anoInicio = parseInt(document.getElementById("Ano").value);
//     var anoFim = parseInt(document.getElementById("Ano1").value);
//     var anoRes = (anoFim - anoInicio);
//     var mesInicio = parseInt(document.getElementById("meses").value)
//     var mesFinal = parseInt(document.getElementById("meses1").value)
//     var tamanho = ((mesFinal - mesInicio)+1)
//     var percentual = 1/larguraAjuste
//     var anoA = 11
//     console.log("Ano: "+anoRes+" anoA: "+anoA)
//     console.log(larguraAjuste)
//     if( anoRes == 0 ){
//         tamanho = ((percentual+7)*tamanho)
//         }
//     else{
//         tamanho = (anoRes*((percentual+7)*11) + ((percentual+7)*tamanho)) + 14
//         }
//     mesInicio+=1
//     console.log("Antes: "+mesInicio)
//     mesInicio = ((percentual+7)*(mesInicio-1))
//     console.log("Depois: "+mesInicio)
//     document.getElementById("c-todos").innerHTML += "<li><div>"+nP+"</div></li>";
//     console.log("Tamanho:"+tamanho)
//     console.log("MesInicio:"+mesInicio)
//     console.log("ResAno:"+anoRes)
//     if(tamanho>80){
//         if(btnAtivado == false){
//             gerarBtn()
//             btnAtivado = true
//             alert(btnAtivado)
//         }
//         let x = 85*(anoRes+1)
//         let y = (50/(anoRes+1*(percentual+100)))
//         tamanho = tamanho
//         $("#c-todos > li:nth-child("+n+")").css("width",(tamanho)+"%");
//         $("#c-todos > li:nth-child("+n+")").css("margin-left",parseInt(mesInicio)+"%")
//         window.document.getElementById("add").innerHTML += "<div>"+"---- "+String(anoFim)+" --->"+"</div><ul class=\"month\"><li><h3> jan </h3></li><li><h3> fev </h3></li><li><h3> mar </h3></li><li><h3> abr </h3></li><li><h3> mai </h3></li><li><h3> jun </h3></li><li><h3> jul </h3></li><li><h3> ago </h3></li><li><h3> set </h3></li><li><h3> out </h3></li><li><h3> nov </h3></li><li><h3> dez </h3></li></ul>"
//         $("#add").css("width",(x)+"%")
//         $(".month").css("min-width",(y)+"%"+"!important")
//         console.log("y: "+y)

//     }else{ $("#c-todos > li:nth-child("+n+")").css("width",(tamanho)+"%");
//     $("#c-todos > li:nth-child("+n+")").css("margin-left",parseInt(mesInicio)+"%")}
    
// }

// var x = 0

// function gerarBtn(){
//     document.getElementById("Controle").innerHTML = "<button class=\"btn-controle\" onclick=\"keyB()\"><span class=\"material-symbols-outlined\">arrow_back_ios</span></button><button class=\"btn-controle\" onclick=\"keyA()\"><span class=\"material-symbols-outlined\">arrow_forward_ios</span></button>"
// }

function keyB(){
    x -= 100
    console.log(x)
    $("#calendario").css("left","auto")
    $("#calendario").css("right",(x)+"px")
}

function keyA(){
    x += 100 
    console.log(x)
    $("#calendario").css("left","auto")
    $("#calendario").css("right",(x)+"px")
}

//Requição AJAX
const rodape = document.getElementById("rodape")
rodape.onload = geraTabela()
const tabela= document.getElementById("hover_tabela")

// function geraTabela(){   FICA COM DEUS PARTE DO PABLÃO
//     let request = new XMLHttpRequest();

//     request.onreadystatechange = function(){
//         let MyJson = JSON.parse(this.responseText);
//         let MyJsonSize = MyJson.length;
//         // tabela.innerHTML = ""
//         for(let i = 0; i < MyJsonSize; i++ ){
//             if(MyJson[i].hours < 50 ){
//                 quadrado = "quadrado_verde";
//             }
//             else if(MyJson[i].hours >= 50 && MyJson[i].hours < 70){
//                 quadrado = "quadrado_amarelo";
//             }
//             else if(MyJson[i].hours >= 70 && MyJson[i].hours < 88 ){
//                 quadrado = "quadrado_vermelho";
//             }
//             else if(MyJson[i].hours >= 88 ){
//                 quadrado = "quadrado_preto";
//             } 
//         tabela.innerHTML += `<tr> <td><a data-toggle="modal" href="#modalhoras"><div class="modal_professional" > ${MyJson[i].name} </div></a></td> <td> ${MyJson[i].role} </td><td> ${MyJson[i].type} </td><td> ${MyJson[i].field} </td>  <td> <span class=${quadrado}> ${MyJson[i].hours}/170/176 </span> </td></tr>`;
//         }
//     }

//     let url = "/profissionais"
//     request.open("get", url, true);
//     request.send()
    
// }

function adicionarProfissionais() {
    let url = "/profissionais";
 
    let xhttp = new XMLHttpRequest(); //método do HTML que permite que faça requisições por script, no front
 
    xhttp.open("get", url, false) ; //abre a requisição do XMLHttpRequest com esses parâmetros. False é sobre ser síncrono, pois vai pegar só uma requisição. True é assíncrono (para realizar mais de uma requisição ao mesmo tempo)
 
    xhttp.send(); //manda para o servidor 
    
    let data = JSON.parse(xhttp.responseText); //recebe o dado que retorna do xhttp enviado ao servidor
    console.log(data[0]);
 
    $("#corpo-tabela-profissionais")[0].innerHTML = ''; //aqui tiramos todas as informações do array. Índice 0 pois o jQuery traz todos os elementos de honors, mas queremos só o primeiro - que é a própria DIV (para depois dividir em linhas)
 
    data.forEach(PROFISSIONAIS => {    //cada linha da tabela se torna uma linha (se transforma sempre em uma linha diferente). forEach = paraCada. 
       
       //acessa o 1º objeto da div que colocamos para exibir os profissionais  
       $("#corpo-tabela-profissionais")[0].innerHTML += `
          <tr> 
            <td> <a data-toggle="modal" href="#modalhoras"><div class="modal_professional"> ${PROFISSIONAIS.nome} </div> </a> </td>
            <td> ${PROFISSIONAIS.nome} </td>
            <td> ${PROFISSIONAIS.tipo} </td>
            <td> ${PROFISSIONAIS.estado} </td>
            <td> ${PROFISSIONAIS.area} </td>
          </tr>             
       `  //aqui pode colocar scripts dentros, funções e tudo mais dentro dessa deliciosa string (`)
          //${} permite passar um script  
          //foi correlacionado, dinamicamente, o banco de dados com a parte a ser implementada no texto
    });
}

//function storeForms(nome) {
    
    //alert(formRecieved.toString());
    //alert('text(): '+ formRecieved.text());
    //var jsonString = JSON.stringify(formRecieved);
    //var htmlText = escape(formRecieved.innerHTML);
    //var htmlText = formRecieved.innerHTML;
    //var simplyString = String(formRecieved);
//    db.transaction(function (tx) {
//        tx.executeSql('INSERT INTO PROFISSIONAIS(nome) VALUES(?)', [nome]);
//    }, function (err) {
//    alert('StoreForms ERROR: ' + JSON.stringify(err));
//    })
//}
