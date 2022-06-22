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
    window.location.reload(); //essa função mágica faz com que atualize a página, sem haver a necessidade de recarregar manualmente para ver a adição do profissional na tabela
}

const assignBtn = document.getElementById("assign-btn");
assignBtn.onclick = () => assignProf()

var idClickedProj
$(document).ready(function(){
    $('body').on('click', '.aAssign', function (e) {
        idClickedProj = $(this).closest('tr').attr('id')
        let finalId
        for(i = 8; i < idClickedProj.length; i++){
            console.log(idClickedProj.charAt(i))
            finalId += idClickedProj.charAt(i)
        }
        idClickedProj = finalId
        console.log(idClickedProj)
    })
})

function assignProf(){
    const idProf = document.getElementById("alocacaos").value
    url1 = "/alocacao/acidionar/prof"
    url2 = "/projetos/single"
    idClickedProj
    console.log(idClickedProj + " projetoo")
    let clickedProj = new XMLHttpRequest
    clickedProj.onload = function(){
        data = JSON.parse(this.responseText)
        dataLenght = data.lenght
        console.log(data[1].nome + " pegou krll")
    }
    clickedProj.open("GET", url2, true)
    clickedProj.send()
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",  //por padrão, temos que avisar que a aplicação é do tipo json e que os caracteres aceitam caracteres especiais
        dataType: "json", //o conteúdo do dado é json
        data: JSON.stringify(  //transforma os valores em uma string do tipo json
            {
                
            }   
        )
    });
}