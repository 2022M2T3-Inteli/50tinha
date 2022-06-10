const { get } = require("ajax");
const { request } = require("express");

function generateGraphics(){
    let requestGraph = new XMLHttpRequest();

    requestGraph.onreadystatechange = function(){
        let dados = JSON.parse(this.response)
        let tamanhoDados = dados.length
        let arrayHoras = []
        let arrayNomes = []
        for(let i = 0; i < tamanhoDados; i++){
            arrayHoras.push(dados[i].somaHoras)
            arrayNomes.push(dados[i].nome)
        }
        graficos(arrayNomes, arrayHoras);
    }

    url = "/alocacao/grafico2"
    requestGraph.open("GET", url, true)
    requestGraph.send()

}

function graficos(nomeProj, horasProj){
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: nomeProj,
            datasets: [
                {
                    label: "Horas",
                    backgroundColor: ["#2d3870", "rgb(82, 111, 255)", "#8d8d8d", "#ef0404", "#39cfd75f"],
                    data: horasProj
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Número de horas/ projeto'
            }
        }
    });
}

function generateLines(){
    let requestLines = new XMLHttpRequest();

    requestLines.onreadystatechange = function(){
        let dados = JSON.parse(this.responseText)
        let tamanhoDados = dados.length
        for(let i = 0; i < tamanhoDados; i++){
            var meses = {
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
                dezembro: 11
            }
            console.log(i + " é o for ")
            criarProjeto(dados[i].nome, dados[i].anoInicio, dados[i].anoFim, eval("meses."+dados[i].mesInicio), eval("meses."+dados[i].mesFim),i)
        }
    }

    url = "/projetos/timeline"
    requestLines.open("GET", url, true);
    requestLines.send();
}


function criarProjeto(nomedb, anoIniciodb, anoFimdb, mesIniciodb, mesFinaldb,i){
    var n = i
    var largura = window.screen.height
    var larguraAjuste = largura - (largura*0.15)
    var nP = nomedb; // np = Nome do projeto
    var anoInicio = parseInt(anoIniciodb);
    var anoFim = parseInt(anoFimdb);
    var anoRes = (anoFim - anoInicio);
    var mesInicio = parseInt(mesIniciodb)
    var mesFinal = parseInt(mesFinaldb)
    var tamanho = ((mesFinal - mesInicio)+1)
    var percentual = 1/larguraAjuste
    var anoA = 11
    console.log("Ano: "+anoRes+" anoA: "+anoA)
    console.log(larguraAjuste)
    if( anoRes == 0 ){
        tamanho = ((percentual+7)*tamanho)
        }
    else{
        tamanho = (anoRes*((percentual+7)*11) + ((percentual+7)*tamanho)) + 14
        }
    mesInicio+=1
    console.log("Antes: "+mesInicio)
    mesInicio = ((percentual+7)*(mesInicio-1))
    console.log("Depois: "+mesInicio)
    document.getElementById("c-todos").innerHTML += "<li><div>"+nP+"</div></li>";
    console.log("Tamanho:"+tamanho)
    console.log("MesInicio:"+mesInicio)
    console.log("ResAno:"+anoRes)
    if(tamanho>80){
        if(btnAtivado == false){
            gerarBtn()
            btnAtivado = true
            alert(btnAtivado)
        }
        let x = 85*(anoRes+1)
        let y = (50/(anoRes+1*(percentual+100)))
        tamanho = tamanho
        $("#c-todos > li:nth-child("+n+")").css("width",(tamanho)+"%");
        $("#c-todos > li:nth-child("+n+")").css("margin-left",parseInt(mesInicio)+"%")
        window.document.getElementById("add").innerHTML += "<div>"+"---- "+String(anoFim)+" --->"+"</div><ul class=\"month\"><li><h3> jan </h3></li><li><h3> fev </h3></li><li><h3> mar </h3></li><li><h3> abr </h3></li><li><h3> mai </h3></li><li><h3> jun </h3></li><li><h3> jul </h3></li><li><h3> ago </h3></li><li><h3> set </h3></li><li><h3> out </h3></li><li><h3> nov </h3></li><li><h3> dez </h3></li></ul>"
        $("#add").css("width",(x)+"%")
        $(".month").css("min-width",(y)+"%"+"!important")
        console.log("y: "+y)

    }else{ $("#c-todos > li:nth-child("+n+")").css("width",(tamanho)+"%");
    $("#c-todos > li:nth-child("+n+")").css("margin-left",parseInt(mesInicio)+"%")}
    
}



function gerarBtn(){
    document.getElementById("Controle").innerHTML = "<button class=\"btn-controle\" onclick=\"keyB()\"><span class=\"material-symbols-outlined\">arrow_back_ios</span></button><button class=\"btn-controle\" onclick=\"keyA()\"><span class=\"material-symbols-outlined\">arrow_forward_ios</span></button>"
}
