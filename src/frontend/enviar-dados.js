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
 assignBtn.onclick = () => assignProfIntoProj()
  
 var idClickedProj
 $(document).ready(function(){
     $('body').on('click', '.aAssign', function (e) {
         idClickedProj = $(this).closest('tr').attr('id')
         let finalId = ""
         for(i = 8; i < idClickedProj.length; i++){
             finalId += idClickedProj.charAt(i)
         }
         idClickedProj = finalId
     })
 })
  
 function assignProfIntoProj(){
     const idProf = Number(document.getElementById("alocacaos").value)
     const horasAlocadas = Number(document.getElementById("horasAlocadas").value)
  
     url2 = "/projetos/single/"
     url3 = "/alocacao/adicionar"
     Number(idClickedProj)
     let params = JSON.stringify({idProject: Number(idClickedProj)});
     console.log(params)
     let clickedProj = new XMLHttpRequest();
     clickedProj.onload = function(){
         let data = JSON.parse(this.responseText)
         let dataLength = data.length
         console.log(data[0].nome + " pegou krll")
         let idFunc = idProf
         let idProj = data[0].idProject
         let horasAlocadasProj = horasAlocadas
         let mesProj = data[0].mesInicio
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
                     "horasAlocadasProjeto": horasAlocadasProj,
                     "mes": mesProj,
                     "ano": anoProj
                 }  
             )
         });

     }
     clickedProj.open("GET", url2+idClickedProj, true)
     clickedProj.send(params)
 } 