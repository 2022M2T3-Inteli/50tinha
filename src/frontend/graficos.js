const { request } = require("express");

function generateGraphics(){
    let requestGraph = new XMLHttpRequest();

    requestGraph.onreadystatechange = function(){
        console.log(this.responseText + "Resposta")
        let dados = JSON.parse(this.response)
        tamanhoDados = dados.length
        console.log(tamanhoDados + "é o tamanho")
        let arrayHoras = []
        let arrayNomes = []
        for(let i = 0; i < tamanhoDados; i++){
            console.log(i + "é o for")
            arrayHoras.push(dados[i].somaHoras)
            arrayNomes.push(dados[i].nome)
        }
        graficos(arrayNomes, arrayHoras);
    }

    url = "http://localhost:3081/alocacao"
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