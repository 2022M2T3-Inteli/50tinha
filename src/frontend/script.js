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

var nomes = new Map();

var x = 0


function keyB(){
    console.log("É o seu numero: "+$("#calendario").css("left"))
    if(parseInt($("#calendario").css("left")) < 235){
        x -= 100
        $("#calendario").css("left","auto")
        $("#calendario").css("right",(x)+"px")
    }
}

function keyA(){
    x += 100 
    console.log(x)
    $("#calendario").css("left","auto")
    $("#calendario").css("right",(x)+"px")
}

function adicionarProfissionais() { ////////////MUDAR PROFISSIONAIS.NOME DUPLICADO
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


//Get projetos
function geraTabelaProj(){
    const tabelaProj = document.getElementById("tabelaProj")
    let requestProj = new XMLHttpRequest();
    requestProj.onload = function(){
        let dados = JSON.parse(this.responseText);
        let tamanhoDados = dados.length;
        let duracao = []
        tabelaProj.innerHTML = `<tr>
        <th>Projeto</th><!--primeira linha da tabela-->
        <th>Duração</th>
        <th>Nº Funcionários/Projetos</th>
        <th>Unidade</th>
        <th>Ano</th>
        <th class="acoesProjeto">Ações</th>
        </tr>`
        for(let i = 0; i < tamanhoDados; i++){
            duracao.push((dados[i].anoFim - dados[i].anoInicio)*12 + eval("meses." + dados[i].mesFim) - eval("meses."+ dados[i].mesInicio)) // O if estava sendo inútil, então tirei o código dele
            nomes.set("nP"+dados[i].idProject,[dados[i].nome,dados[i].unidade])
            tabelaProj.innerHTML +="<tr id=\"projeto_"+dados[i].idProject+"\"> <td id=\"coldata\" class=\"aba\"> <a href=\"#modalgraphs\" data-toggle=\"modal\">"+dados[i].nome+"</a> </td><td id=\"coldata\" class=\"aba\"> <a href=\"#modalgraphs\" data-toggle=\"modal\"> "+duracao[i]+"Meses</a> <center> </td><td id=\"coldata\"> <a href=\"#modalgraphs\" data-toggle=\"modal\">"+dados[i].numberFunc+"</a> <center> <td>"+dados[i].unidade+"</td><td>"+dados[i].anoInicio+" a "+dados[i].anoFim+"</td><td><div class=\"linha\"> <a href=\"#\" onclick=\"editar("+dados[i].idProject+","+eval("meses."+ dados[i].mesInicio)+","+eval("meses." + dados[i].mesFim)+","+dados[i].anoInicio+","+dados[i].anoFim+");\" >Editar</a> <a href=\"/projetos.html\" onclick=\"excluirProjeto("+ dados[i].idProject+")\">Excluir</a> </div></td></tr>"
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
    url = "/projetos"
    requestProj.open("GET", url, true)
    requestProj.send()
}




//POST PROJETOS
function enviaProjeto(){
    const nomeProj = document.getElementById("nomeProj").value
    const unidadeProj = document.getElementById("unidadeProj").value
    const diaInicioProj = document.getElementById("diaInicioProj").value
    const mesInicioProj = document.getElementById("mesInicioProj").value
    const anoInicioProj = document.getElementById("anoInicioProj").value
    const mesFimProj = document.getElementById("mesFimProj").value
    const anoFimProj = document.getElementById("anoFimProj").value
    const areaProj = document.getElementById("areaProj").value
    url = "/projetos/adicionar"
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "nome": nomeProj,
                "area": areaProj,
                "mesInicio": mesInicioProj,
                "anoInicio": anoInicioProj,
                "mesFim": mesFimProj,
                "anoFim": anoFimProj,
                "unidade": unidadeProj
            }
        )
    });
}

var meses = { // Ajuda nas conversões necessarias de number para string
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
    n0: "janeiro",
    n1: "fevereiro",
    n2: "março",
    n3: "abril",
    n4: "maio",
    n5: "junho",
    n6: "julho",
    n7: "agosto",
    n8: "setembro",
    n9: "outubro",
    n10: "novembro",
    n11: ""
}


// Coleta os profissionais do banco de dados e passa suas informações como argumento para função alocacao(),  Linha:167
function getEmployees(){
    let requestLines = new XMLHttpRequest();
    requestLines.onload = function(){
        let dados = JSON.parse(this.responseText)
        let tamanhoDados = dados.length
        for(let i = 0; i < tamanhoDados; i++){
            alocacao(dados[i].nome,dados[i].id)
        }
    }
    /*rota que será exibida*/

    url = "/profissionais"
    requestLines.open("GET", url, true);
    requestLines.send();
}

// Exclui os projetos
function excluirProjeto(idP){
    url = "/projetos/deletar"
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "idProject": idP
            }
        )
    });
}

// Edita os projetos
function editar(idP,inicio,fim,anoI,anoF){
    let anoFim = anoF
    let anoInicio = anoI
    let idProjeto = "projeto_"+idP
    let mesInicio = inicio.toString()
    let mesFim = fim.toString()
    let lista = nomes.get("nP"+idP) // indice [0] reprensta o nome do projeto; indice [1] reprensta a cidade do projeto 
    let selecao =""
    // let duracao = (parseInt(anoFim) - parseInt(anoInicio)*12 + parseInt(mesFim) - parseInt(mesInicio) )
    mesInicio = eval("meses.n"+mesInicio)
    mesFim = eval("meses.n"+mesFim)
    if(lista[1] == "AM"){
        selecao = "<select><option value=\"am\">AM</option><option value=\"sp\">SP</option><option value=\"ambos\">Ambos</option> </select>"
    }else{selecao = "<select><option value=\"sp\">SP</option><option value=\"am\">AM</option><option value=\"ambos\">Ambos</option> </select>"}
    document.getElementById(idProjeto).innerHTML = "<form method=\"post\"><td id=\"coldata\" class=\"aba\"><input  type=\"text\" placeholder=\""+lista[0]+"\"></td>  <td id=\"coldata\" class=\"aba\"><input  type=\"text\" placeholder=\""+mesInicio+"\"><input  type=\"text\" placeholder=\""+mesFim+"\"></td>  <td id=\"coldata\">Auto</td> <td>"+selecao+"</td> <td><input  type=\"text\" placeholder=\""+anoInicio+"\"> a <input  type=\"text\" placeholder=\""+anoFim+"\"></td> <td><div class=\"linha\"> <button class=\"hand_hover\" type=\"submit\" onclick=\"atualizar("+idP+");\" >Confirmar</button> <a href=\"/projetos.html\" onclick=\"excluirProjeto()\">Excluir</a> </div></td></form>"
    
    // Impossibilita que os de mais projetos sejam clicaveis
        // tabelaProj.innerHTML +="<tr id=\"projeto_"+dados[i].idProject+"\"> <td id=\"coldata\" class=\"aba\"> <a href=\"#modalgraphs\" data-toggle=\"modal\">"+dados[i].nome+"</a> </td><td id=\"coldata\" class=\"aba\"> <a href=\"#modalgraphs\" data-toggle=\"modal\"> "+duracao+"Meses</a> <center> </td><td id=\"coldata\"> <a href=\"#modalgraphs\" data-toggle=\"modal\">"+dados[i].numberFunc+"</a> <center> <td>"+dados[i].unidade+"</td><td>"+dados[i].anoInicio+" a "+dados[i].anoFim+"</td><td><div class=\"linha\"> <a href=\"#\" onclick=\"editar("+dados[i].idProject+","+eval("meses."+ dados[i].mesInicio)+","+eval("meses." + dados[i].mesFim)+","+dados[i].anoInicio+","+dados[i].anoFim+");\" >Editar</a> <a href=\"/projetos.html\" onclick=\"excluirProjeto("+ dados[i].idProject+")\">Excluir</a> </div></td></tr>"

}

// Atualiza os projetos
function atualizar(idP){
    const nomeP = document.getElementById('nomeFunc').value;
    const mesInicio = document.getElementById('unidades').value;
    const anoInicio = document.getElementById('CLT').value;
    const mesFim = document.getElementById('areas').value;
    const anoFim = document.getElementById('areas').value;

    url = "/projetos/deletar"
    $.ajax({
        type: "PATCH",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {   
                "nome": nomeP,
                "area": "Teste",
                "mesInicio": mesInicio,
                "anoInicio": anoInicio,
                "mesFim": mesFim,
                "anoFim": anoFim,
                "idProject": idP,   
            }
        )
    });
    window.location.reload(); //essa função mágica faz com que atualize a página, sem haver a necessidade de recarregar manualmente para ver a adição do profissional na tabela
}

// Adiciona os profissionais do banco de dados ao modal de alocação
function alocacao(nomedb,iddb){
    var nome = nomedb
    var id = iddb
    document.getElementById("alocacaos").innerHTML += "<option value="+id+">"+nome+"</option>"
}


