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

var x = 0


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


function adicionarProfissionais() {
    let url = "/profissionais";
 
    let xhttp = new XMLHttpRequest(); //método do HTML que permite que faça requisições por script, no front
 
    xhttp.open("get", url, false) ; //abre a requisição do XMLHttpRequest com esses parâmetros. False é sobre ser síncrono, pois vai pegar só uma requisição. True é assíncrono (para realizar mais de uma requisição ao mesmo tempo)
 
    xhttp.send(); //manda para o servidor 
    
    let data = JSON.parse(xhttp.responseText); //recebe o dado que retorna do xhttp enviado ao servidor
    console.log(data[0]);
 
    $("#corpo-tabela-profissionais")[0].innerHTML = ''; //aqui tiramos todas as informações do array. Índice 0 pois o jQuery traz todos os elementos de "corpo-tabela-profissionais", mas queremos só o primeiro - que é a própria tabela (para depois dividir em linhas)
 
    data.forEach(PROFISSIONAIS => {  //cada linha da tabela se torna uma linha diferente. forEach = paraCada. 
       
       //acessa o 1º objeto da tabela e introduz a informação do banco de dados, acessando cada tabela do banco com o comando "${PROFISSIONAIS.}". No caso, "PROFISSIONAIS" é uma das tabelas e o que vem depois do "." é a coluna 
       $("#corpo-tabela-profissionais")[0].innerHTML += `
          <tr> 
            <td> <a data-toggle="modal" href="#modalhoras"><div class="modal_professional"> ${PROFISSIONAIS.nome} </div> </a> </td>
            <td> ${PROFISSIONAIS.nome} </td>
            <td> ${PROFISSIONAIS.tipo} </td>
            <td> ${PROFISSIONAIS.estado} </td>
            <td> ${PROFISSIONAIS.area} </td>
          </tr>             
       `  //aqui pode colocar scripts dentros, funções e tudo mais dentro dessa string (`)
          //${} permite passar um script  
          //foi correlacionado, dinamicamente, o banco de dados com a parte a ser implementada no texto
    });
}


