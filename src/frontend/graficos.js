const { request } = require("express");

function generateGraphics(){
    let requestGraph = new XMLHttpRequest();

    requestGraph.onreadystatechange = function(){
        let dados = JSON.parse(this.response)
        tamanhoDados = dados.length
        let arrayIds = []
        let arrayNomes = []
        for(let i = 0; i < tamanhoDados; i++){
            arrayIds.push(dados[i].idProject)
            arrayNomes.push(dados[i].nome)
        }
        graficos(arrayNomes);
    }

    url = "localhost:3061/alocacao"
    requestGraph.open("GET", url, true)
    requestGraph.setEncoding()

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