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

/* Editção Tabelas: profissional, projeto */

var nomesP = new Map();
var listaFuncionario =[]

function getProfissionais(){
    let requestProj = new XMLHttpRequest();
    requestProj.onload = function(){
        let dados = JSON.parse(this.responseText);
        let tamanhoDados = dados.length;
        for (let i = 0; i < tamanhoDados; i++) {
            listaFuncionario.push(dados[i]) 
        }
    }

    url = "/profissionais/tabelaprof"
    requestProj.open("GET", url, true)
    requestProj.send()  
}



function adicionarProfissionais() { // !MUDAR PROFISSIONAIS.NOME DUPLICADO!
    let url = "/profissionais"; // /profissionais
 
    let xhttp = new XMLHttpRequest(); //método do HTML que permite que faça requisições por script, no front
 
    xhttp.open("get", url, false) ; //abre a requisição do XMLHttpRequest com esses parâmetros. False é sobre ser síncrono, pois vai pegar só uma requisição. True é assíncrono (para realizar mais de uma requisição ao mesmo tempo)
 
    xhttp.send(); //manda para o servidor 
    
    let data = JSON.parse(xhttp.responseText); //recebe o dado que retorna do xhttp enviado ao servidor

 
    $("#corpo-tabela-profissionais")[0].innerHTML = ''; //aqui tiramos todas as informações do array. Índice 0 pois o jQuery traz todos os elementos de "corpo-tabela-profissionais", mas queremos só o primeiro - que é a própria tabela (para depois dividir em linhas)

    document.getElementById("hover_tabela").innerHTML = "<tr><th> Nome </th><th> Nº projetos</th><th> CLT </th><th> Estado </th><th> Alocação mensal (projetos/mês/máx) </th><th class=\"acoesProjeto\"> Ações </th></tr> "
    tamanhoDados = data.length
    var quadrado = ""
    console.log(tamanhoDados+" Dados");
    for (var a = 0; a < tamanhoDados; a++) {
        if(a < listaFuncionario.length ){
            for (var b = 0; b < listaFuncionario.length; b++) {
                if(((listaFuncionario[b].sum)/12).toFixed(0) < 50 ){
                    quadrado = "quadrado_verde";
                }
                else if(((listaFuncionario[b].sum)/12).toFixed(0) >= 50 && ((listaFuncionario[b].sum)/12).toFixed(0) < 70){
                    quadrado = "quadrado_amarelo";
                }
                else if(((listaFuncionario[b].sum)/12).toFixed(0) >= 70 && ((listaFuncionario[b].sum)/12).toFixed(0) < 88 ){
                    quadrado = "quadrado_vermelho";
                }
                else if(((listaFuncionario[b].sum)/12).toFixed(0) >= 88 ){
                    quadrado = "quadrado_preto";
                } 
                
                $("#hover_tabela")[0].innerHTML += `
                    <tr id="profissional_${data[b].idFunc}"> 
                        <td> ${listaFuncionario[b].nome} </td>
                        <td> ${(listaFuncionario[b].numeroProjetos)/12} </td>
                        <td> ${listaFuncionario[b].tipo} </td>
                        <td> ${listaFuncionario[b].estado} </td>
                        <td> <span class=${quadrado}> ${((listaFuncionario[b].sum)/12).toFixed(0)}/88/178 </td>
                        <td> <div class="linha">  <a href="#" onclick="editarProfissional(${listaFuncionario[b].idFunc})" > Editar </a>  <a href="/profissionais.html" onclick="excluirProfissional(${listaFuncionario[b].idFunc})" > Excluir </a>  </div> </td>
                    </tr>             
                `
                a++
            }
        }else{
            //aqui pode colocar scripts dentros, funções e tudo mais dentro dessa string (`)
        $("#hover_tabela")[0].innerHTML += `
            <tr id="profissional_${data[a].idFunc}"> 
                <td> ${data[a].nome} </td>
                <td> 0 </td>
                <td> ${data[a].tipo} </td>
                <td> ${data[a].estado} </td>
                <td> <span class="quadrado_verde"> 0/88/178 </td>
                <td> <div class="linha">  <a href="#" onclick="editarProfissional(${data[a].idFunc})" > Editar </a>  <a href="/profissionais.html" onclick="excluirProfissional(${data[a].idFunc})" > Excluir </a>  </div> </td>
            </tr>             
            `
        }   
    }
    
}

//Get funcionario por projeto
function getFuncionario(){

    let listaAlocados =[]
    let requestProj = new XMLHttpRequest();
    requestProj.onload = function(){
        let dados = JSON.parse(this.responseText);
        let tamanhoDados = dados.length;
        for(let i = 0; i < tamanhoDados; i++){
            listaAlocados.push(dados[i].funcAlocados/12)

        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
    url = "/projetos/funcionario"
    requestProj.open("GET", url, true)
    requestProj.send()
    return listaAlocados
}

//Get projetos
function geraTabelaProj(){
    numeroFunc = getFuncionario()
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
            nomesP.set("nP"+dados[i].idProject,[dados[i].nome,dados[i].unidade])
            tabelaProj.innerHTML +="<tr id=\"projeto_"+dados[i].idProject+"\"> <td id=\"coldata\" class=\"aba\"> <a href=\"#modalgraphs\" data-toggle=\"modal\" class=\"aAssign\">"+dados[i].nome+"</a> </td><td id=\"coldata\" class=\"aba\"> "+duracao[i]+" Meses <center> </td><td id=\"coldata\"> "+numeroFunc[i]+"<center> <td>"+dados[i].unidade+"</td><td>"+dados[i].anoInicio+" a "+dados[i].anoFim+"</td><td><div class=\"linha\"> <a href=\"#\" onclick=\"editar("+dados[i].idProject+","+eval("meses."+ dados[i].mesInicio)+","+eval("meses." + dados[i].mesFim)+","+dados[i].anoInicio+","+dados[i].anoFim+");\" >Editar</a> <a href=\"/projetos.html\" onclick=\"excluirProjeto("+ dados[i].idProject+")\">Excluir</a> </div></td></tr>"
 

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
    n11: "dezembro"
}


// Coleta os profissionais do banco de dados e passa suas informações como argumento para função alocacao(),  Linha:167
function getEmployees(){
    let requestLines = new XMLHttpRequest();
    requestLines.onload = function(){
        let dados = JSON.parse(this.responseText)
        let tamanhoDados = dados.length
        for(let i = 0; i < tamanhoDados; i++){
            alocacao(dados[i].nome,dados[i].idFunc)
        }
    }
    /*rota que será exibida*/

    url = "/profissionais"
    requestLines.open("GET", url, true);
    requestLines.send();
}


/* Editar & Excluir - Profissionais */


// Editar profissionais

// nomesF é um array onde [0] é o nome,[1] é o numero de projetos,[2] é o contrato,[3] é o estado,[4] é a area, da tabela funcionarios
function editarProfissional(idFuncionario){
        let idNP = code(idFuncionario,"_F_NP")
        let idAI = code(idFuncionario,"_F_AI")
        let idMF = code(idFuncionario,"_F_MF")
        let idUP = code(idFuncionario,"_F_UP")
        let idF = "profissional_"+idFuncionario
        let lista = nomesF.get("funcionario"+idFuncionario)
        let selecao =""
        let selecaoClt = ""
        if(lista[3] == "am" || lista[3] == "AM"){
            selecao = "<select id=\""+idUP+"\"><option value=\"am\">AM</option><option value=\"sp\">SP</option> </select>"
        }else{selecao = "<select id=\""+idUP+"\"><option value=\"sp\">SP</option><option value=\"am\">AM</option> </select>"}

        if(lista[2] == "sim"){
            selecaoClt = "<select id=\""+idMF+"\"><option value=\"sim\">Sim</option><option value=\"sp\">SP</option> </select>"
        }else{selecaoClt = "<select id=\""+idMF+"\"><option value=\"nao\">Não</option><option value=\"am\">AM</option> </select>"}

        document.getElementById(idF).innerHTML = "<form method=\"post\"><td id=\"coldata\" class=\"aba\"><input value=\""+lista[0]+"\" class=\"limitador\" id=\""+idNP+"\" type=\"text\" placeholder=\""+lista[0]+"\"></td>  <td id=\"coldata\" class=\"aba\">auto</td> <td id=\"coldata\" class=\"aba\">"+selecaoClt+"</td> <td>"+selecao+"</td> <td><input value=\""+lista[4]+"\" class=\"limitador\" id=\""+idAI+"\" type=\"text\" placeholder=\""+lista[4]+"\"></td> <td><div class=\"linha\"> <button class=\"hand_hover\" type=\"submit\" onclick=\"atualizarProfissional("+idFuncionario+");\" >Confirmar</button> <a href=\"/profissionais.html\">Voltar</a> </div></td></form>"
        
}

function atualizarProfissional(idP){
        let idNP = code(idP,"_F_NP") // Nome
        let idAI = code(idP,"_F_AI") // Area
        let idMF = code(idP,"_F_MF") // CLT
        let idUP = code(idP,"_F_UP") // Estado
    
    
    
    const nomeP = document.getElementById(idNP).value;
    const area = document.getElementById(idAI).value;
    const tipo = document.getElementById(idMF).value;
    const estado = document.getElementById(idUP).value;
    
    url = "/profissionais/atualizar"
    $.ajax({
        type: "PATCH",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {   
                "nome": nomeP,
                "area": area,
                "tipo": tipo,
                "estado": estado,
                "idFunc": idP,   
            }
            )
        });
        window.location.reload(); //essa função mágica faz com que atualize a página, sem haver a necessidade de recarregar manualmente para ver a adição do profissional na tabela
}

// Excluir profissionais
function excluirProfissional(idFuncionario){
    url = "/profissionais/deletar"
    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "idFunc": idFuncionario
            }
            )
        });
    }
    
    /* Editar & Excluir & Atualizar - Projetos */

    // Edita os projetos
    function editar(idP,inicio,fim,anoI,anoF){
        let idNP = code(idP,"NP")
        let idMI = code(idP,"MI")
        let idAI = code(idP,"AI")
        let idMF = code(idP,"MF")
        let idAF = code(idP,"AF")
        let idUP = code(idP,"UP")
        let anoFim = anoF
        let anoInicio = anoI
        let idProjeto = "projeto_"+idP
        let mesInicio = inicio.toString()
        let mesFim = fim.toString()
        let lista = nomesP.get("nP"+idP) // indice [0] reprensta o nome do projeto; indice [1] reprensta a cidade do projeto 
        let selecao =""
        mesInicio = eval("meses.n"+mesInicio)
        mesFim = eval("meses.n"+mesFim)
        if(lista[1] == "am"){
            selecao = "<select id=\""+idUP+"\"><option value=\"am\">AM</option><option value=\"sp\">SP</option><option value=\"ambos\">Ambos</option> </select>"
        }else{selecao = "<select id=\""+idUP+"\"><option value=\"sp\">SP</option><option value=\"am\">AM</option><option value=\"ambos\">Ambos</option> </select>"}
        document.getElementById(idProjeto).innerHTML = "<form method=\"post\"><td id=\"coldata\" class=\"aba\"><input value=\""+lista[0]+"\" class=\"limitador\" id=\""+idNP+"\" type=\"text\" placeholder=\""+lista[0]+"\"></td>  <td id=\"coldata\" class=\"aba\"><input value=\""+mesInicio+"\" class=\"limitador\" id=\""+idMI+"\" type=\"text\" placeholder=\""+mesInicio+"\"><input value=\""+mesFim+"\" class=\"limitador\" id=\""+idMF+"\" type=\"text\" placeholder=\""+mesFim+"\"></td>  <td id=\"coldata\">Auto</td> <td>"+selecao+"</td> <td><input value=\""+anoInicio+"\" class=\"limitador\" id=\""+idAI+"\" type=\"text\" placeholder=\""+anoInicio+"\"> a <input value=\""+anoFim+"\" class=\"limitador\" id=\""+idAF+"\" type=\"text\" placeholder=\""+anoFim+"\"></td> <td><div class=\"linha\"> <button class=\"hand_hover\" type=\"submit\" onclick=\"atualizar("+idP+");\" >Confirmar</button> <a href=\"/projetos.html\">Voltar</a> </div></td></form>"
        
    }

// Atualiza os projetos
function atualizar(idP){
    let idNP = code(idP,"NP")
    let idMI = code(idP,"MI")
    let idAI = code(idP,"AI")
    let idMF = code(idP,"MF")
    let idAF = code(idP,"AF")
    let idUP = code(idP,"UP")
    
    
    
    const nomeP = document.getElementById(idNP).value;
    const mesInicio = document.getElementById(idMI).value;
    const mesFim =  document.getElementById(idMF).value;
    const anoInicio = parseInt(document.getElementById(idAI).value);
    const anoFim = parseInt(document.getElementById(idAF).value);
    const unidade = document.getElementById(idUP).value
    
    url = "/projetos/atualizar"
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
                "unidade": unidade,
                "idProject": idP,   
            }
            )
        });
        window.location.reload(); //essa função mágica faz com que atualize a página, sem haver a necessidade de recarregar manualmente para ver a adição do profissional na tabela
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

    function code(a,b){
        a = b+a
    return a;
}


// Adiciona os profissionais do banco de dados ao modal de alocação
function alocacao(nomedb,iddb){
    var nome = nomedb
    var id = iddb
    document.getElementById("alocacaos").innerHTML += "<option value="+id+">"+nome+"</option>"
}

function enviarDados(){  ///////////////////COLOCAR O ID DO PROFISSIONAL, PQ ESTÁ COMO NULO AGORA
    const nomeFunc = document.getElementById('nomeFunc').value;
    const estadoFunc = document.getElementById('unidades').value;
    const tipoFunc = document.getElementById('CLT').value;
    const areaFunc = document.getElementById('areas').value;
    
    url = "/profissionais/adicionar"
     $.ajax({
         type: "POST",
         url: url,
         contentType: "application/json; charset=utf-8",  //por padrão, temos que avisar que a aplicação é do tipo json e que os caracteres aceitam caracteres especiais
         dataType: "json", //o conteúdo do dado é json
         data: JSON.stringify(  //transforma os valores em uma string do tipo json
             {
                 nome: nomeFunc, //o primeiro valor é como está no banco
                 estado: estadoFunc,  //o segundo valor é a variável que contém o id do front-end
                 tipo: tipoFunc,
                 area: areaFunc
             }  
         )
     });
     window.location.reload(); //essa função faz com que atualize a página, sem haver a necessidade de recarregar manualmente para ver a adição do profissional na tabela
 }
  
 var alocacaoLista = [0,0,0,0,0,0,0,0,0,0,0,0,] // Representa a alocação por mês

 const assignBtn = document.getElementById("assign-btn");
 assignBtn.onclick = () => {
    alocacaoLista[0] = Number(document.getElementById("janeiroAloca").value)
    alocacaoLista[1] = Number(document.getElementById("fevereiroAloca").value)
    alocacaoLista[2] = Number(document.getElementById("marçoAloca").value)
    alocacaoLista[3] = Number(document.getElementById("abrilAloca").value)
    alocacaoLista[4] = Number(document.getElementById("maioAloca").value)
    alocacaoLista[5] = Number(document.getElementById("junhoAloca").value)
    alocacaoLista[6] = Number(document.getElementById("julhoAloca").value)
    alocacaoLista[7] = Number(document.getElementById("agostoAloca").value)
    alocacaoLista[8] = Number(document.getElementById("setembroAloca").value)
    alocacaoLista[9] = Number(document.getElementById("outubroAloca").value)
    alocacaoLista[10] = Number(document.getElementById("novembroAloca").value)
    alocacaoLista[11] = Number(document.getElementById("dezembroAloca").value)

for (let i = 0; i < alocacaoLista.length; i++) {
   let mes = eval("meses.n"+i)
   let hora = alocacaoLista[i]
    
    assignProfIntoProj(mes,hora)
    
 }}
 var idClickedProj
 $(document).ready(function(){
     $('body').on('click', '.aAssign', function () {
        
         idClickedProj = $(this).closest('tr').attr('id')
         let finalId = ""
         for(i = 8; i < idClickedProj.length; i++){
             finalId += idClickedProj.charAt(i)
             
         }
         idClickedProj = finalId
         
     })
 })
 

 function assignProfIntoProj(mes,hora){
     const idProf = Number(document.getElementById("alocacaos").value)
     console.log(idProf)
    
     url2 = "/projetos/single/"
     url3 = "/alocacao/adicionar"
     Number(idClickedProj)
     let params = JSON.stringify({idProject: Number(idClickedProj)});
     let clickedProj = new XMLHttpRequest();
     clickedProj.onload = function(){
         let data = JSON.parse(this.responseText)
         let idFunc = idProf
         let idProj = data[0].idProject
         
         let mesProj = mes
         let anoProj = data[0].anoInicio
         //Adiciona uma nova alocação
         $.ajax({
             type: "POST",
             url: url3,
             contentType: "application/json; charset=utf-8",  //por padrão, temos que avisar que a aplicação é do tipo json e que os caracteres aceitam caracteres especiais
             dataType: "json", //o conteúdo do dado é json
             data: JSON.stringify(  //transforma os valores em uma string do tipo json
                 {
                     "idFunc": idFunc, //idFunc, idProject, horasAlocadasProjeto, mes, ano
                     "idProject": idProj,
                     "horasAlocadasProjeto": hora,
                     "mes": mesProj,
                     "ano": anoProj
                 }  
             )
         });

     }
     clickedProj.open("GET", url2+idClickedProj, true)
     clickedProj.send(params)
 } 




//  var idAtual = ""
// function clickId(a){
//     idAtual = a
//     console.log(idAtual)
    
// }


// onclick=\"clickId(projeto_"+dados[i].idProject+")\"