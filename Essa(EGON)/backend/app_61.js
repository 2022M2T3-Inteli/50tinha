const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';

const port = 3061;
const sqlite3 = require('sqlite3').verbose();
const app = express();
const DBPATH = 'dbteste.db';

app.use(express.static("../frontend/"));

app.use(express.json());


/* Definição dos endpoints */

/****** CRUD ******************************************************************/
app.get('/curriculo', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin',
	'*');
	
	var db = new sqlite3.Database(DBPATH);
	var sql = 'SELECT * FROM profissionais WHERE userId = 2';
	db.get(sql, [], (err, row) => {
	if (err) {
	throw err;
	}
	res.write('<!DOCTYPE html> \n<meta charset="UTF-8">\n<head> \n\t<title>MEUCURRÍCULO</title><style>.linha { border-bottom: solid 1px black;}</style>\n</head> \
	\n<body> \
	\n\t<div id="main"> \
	\n\t\t<h1>MEU CURRÍCULO</h1>');
	res.write('\n\t\t<div class="linha">' + row.title + '</div> \n\t</div>');
	res.write('\n</body> \n</html>');
	});
	});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/profissionais', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM profissionais ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	// 	res.write('<!DOCTYPE html> \n<meta charset="UTF-8">\n<head> \n\t<title>Profissionais</title><style>.linha { border-bottom: solid 1px black;}</style>\n</head> \
	// \n<body> \
	// \n\t<div id="main"> \
	// \n\t\t<h1>MEU CURRÍCULO</h1>');
	// res.write('\n\t\t<div class="linha">' + rows.name + '</div> \n\t</div>');
	// res.write('horas'+ rows.hours);
	// res.write('\n</body> \n</html>');
	const myJSON = rows;
	// console.log(myJSON[0].date);
	const MyJSONsize = Object.keys(myJSON).length;
	let nomes = []; //arrays que serão utilizados ao invés do JSON
	let horas = [];
	let campos = [];
	let cargos = [];
	let tipos = [];
	let quadrado;
	res.write(`<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="stylesheet" href="style-Geral.css"> <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> <link rel="stylesheet" href="criarprojmodal.css"> <title>Profissionais</title></head><body> <div class="container-nosso"> <header id="headProfissionais"> <div class="barra-pesqusia"> <button class="btn-meu"><span class="material-symbols-outlined">search</span></button> <input class="barra-texto" type="text" name="" placeholder="Pesquisar profissional" id="barra-texto"> <span class="material-symbols-outlined centro" id="fitro-posicao">filter_list</span> <script>$(document).ready(function(){$("#barra-texto").on("keyup", function(){var value=$(this).val().toLowerCase(); $("#corpo-tabela-profissionais tr").filter(function(){$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)});});}); </script> </div><div class="leva_prof"> <div class="login"> <a class="" href="index.html">Roberto</a> </div></div></header> <div id="CorpoProfissionais"> <table id="hover_tabela"> <tr> <th> Nome </th> <th> Nº projetos</th> <th> CLT </th> <th> Estado </th> <th> Alocação mensal (projetos/mês/máx) </th></tr><tbody id="corpo-tabela-profissionais">`);
	for(let i = 0; i < MyJSONsize; i++){ //Transforma os JSONs em arrays, ao adicionar cada elemento específico em um array relacionado, "name" no array "names"
		nomes.push(myJSON[i].name); //Push adiciona elemento no final do array
		horas.push(myJSON[i].hours); //Dessa forma, a cada for adiciona o 
		campos.push(myJSON[i].field);  // número correspondende do JSON
		cargos.push(myJSON[i].role);
		tipos.push(myJSON[i].type);
		if(horas[i] < 50 ){
			quadrado = "quadrado_verde"
		}
		else if(horas[i] >= 50 && horas[i] < 70){
			quadrado = "quadrado_amarelo";
		}
		else if(horas[i] >= 70 && horas[i] < 88 ){
			quadrado = "quadrado_vermelho"
		}
		else if(horas[i] >= 88 ){
			quadrado = "quadrado_preto"
		}
	res.write(`<tr> <td><a data-toggle="modal" href="#modalhoras"><div class="modal_professional" > ${nomes[i]} </div></a></td><td> ${campos[i]} </td><td> ${tipos[i]} </td><td> ${cargos[i]} </td><td> <span class="${quadrado}"> ${horas[i]}/120/176 </span> </td></tr>`);
	};
	res.write(`</tbody> </table> <form action="/profissionais/adicionar" method="post" ><input name="name" value="Insert Name"><input name="hours" value="Insert Hours"><input name="field" value="Insert Field"><input name="role" value="Insert Role"><input name="type" value="Insert Type"><button>ADICIONAR MEU ACESSO</button></form> </div><div id="menu"> <div class="centro"> <a href="abageral.html" id="logo_tela_inicial"> <img id="logo" src="img/logo2.png" alt=""> </a> </div><nav id="nav-menu"> <ul class="centro"> <div class="ative-profi" > <li class="ordem"><span class="material-symbols-outlined"> person_search </span>Profissionais</li></div><div class="projeto"> <li class="ordem"><a class="centra ordem" href="abageral.html"><span class="material-symbols-outlined"> task</span>Projetos</a></li></div><div class="modal-style" data-toggle="modal" data-target="#modalpro" id="buttonmodal"> <li class="ordem"> <span class="material-symbols-outlined"> add </span>Adicionar</li></div></ul> </nav> </div></div><div class="modal fade" id="modalpro" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> </div><div class="modal-body"> <div id="nome"> <label for="nome">Nome do Funcionario</label> <input name="nome" type="text"> </div><div id="unidade"> <label for="unidades">Unidades: </label> <select name="unidades" id="unidades"> <option value="sp">SP</option> <option value="am">AM</option> <option value="ambos">Ambos</option> </select> </div><div id="inicio"> <label for="CLT">CLT?:</label> <select name="CLT" id="CLT"> <option value="simclt">Sim</option> <option value="naoclt">Nao</option> </select> </div><div id="horastrabalhadas"> <label for="horastrab">Horas Mensais: </label> <input type="number" name="horastrab"> <label for="horasproj">Horas Mensais para Projetos: </label> <input type="number" name="horasproj"> </div><div id="inicio"> <label for="areas">Área Trabalhada: </label> <select name="areas" id="areas"> <option value="area1">Área 1</option> <option value="area2">Área 2</option> <option value="area3">Área 3</option> <option value="area4">Área 4</option> <option value="area5">Área 5</option> </select> </div></div><div class="modal-footer"> <a class="hand_hover" data-dismiss="modal">Criar</a> </div></div></div></div></div><div class="modal fade" id="modalhoras" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> </div><div class="modal-body"> </div><div id="tabhor"> <label for="Janeiro">Janeiro: </label> <input id='Janeiro' type="number" name="Janeiro" step="1" value="0"> <br><label for="Fevereiro">Fevereiro: </label> <input id='Fevereiro' type="number" name="Fevereiro" step="1" value="0"> <br><label for="Março"> Março: </label> <input id='Março' type="number" name="Março" step="1" value="0"> <br><label for="Abril"> Abril: </label> <input id='Abril' type="number" name="Abril" step="1" value="0"> <br><label for="Maio"> Maio: </label> <input id='Maio' type="number" name="Maio" step="1" value="0"> <br><label for="Junho"> Junho: </label> <input id='Junho' type="number" name="Junho" step="1" value="0"> <br><label for="Julho"> Julho: </label> <input id='Julho' type="number" name="Julho" step="1" value="0"> <br><label for="Agosto"> Agosto: </label> <input id='Agosto' type="number" name="Agosto" step="1" value="0"> <br><label for="Setembro"> Setembro: </label> <input id='Setembro' type="number" name="Setembro" step="1" value="0"> <br><label for="Outubro"> Outubro: </label> <input id='Outubro' type="number" name="Outubro" step="1" value="0"> <br><label for="Novembro"> Novembro: </label> <input id='Novembro' type="number" name="Novembro" step="1" value="0"> <br><label for="Dezembro"> Dezembro: </label> <input id='Dezembro' type="number" name="Dezembro" step="1" value="0"> <br></div></div><div class="modal-footer"> <button class="hand_hover" type="button" data-dismiss="modal">Editar</button> </div></div></div></div></div></div></body></html>`);
	});
	db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/profissionais/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO profissionais (name, hours, field, role, type) VALUES ('" + req.body.name + "', " + req.body.hours + ",'"+ req.body.field +"','" + req.body.role + "','" + req.body.type +"')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		else console.log(sql);
	});
	db.close(); // Fecha o banco
	res.end();
});



// Atualiza um registro (é o U do CRUD - Update)
app.patch('/profissionais/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `UPDATE profissionais SET name = '${req.body.name}', type = '${req.body.type}', hours = ${req.body.hours} WHERE id = ${req.body.id}`;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.delete('/profissionais/deletar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM profissionais WHERE id = " + "'" + req.body.id + "'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err; 
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

//////////////////////////////////PROJETOS/////////////////////////

//exibe todos os projetos registrados
app.get('/projetos', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM projetos ORDER BY name COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		else console.log(sql);

	res.json(rows);
	});
	db.close(); // Fecha o banco
});

//insere um novo projeto (C do CRUD)
app.post('/projetos/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Acess-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `INSERT INTO projetos (name, area, numberFunc, duration) VALUES ('${req.body.name}' , '${req.body.area}' , ${req.body.numberFunc} , ${req.body.duration})`;
	var db = new sqlite3.Database(DBPATH); //Abre o banco
	console.log(sql);
	db.run (sql, [], err => {
		if (err) {
			throw err;
		}
		else console.log(sql);
	});
	db.close(); //fecha o banco
	res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
app.patch('/projetos/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = `UPDATE projetos SET name = '${req.body.name}' , area = '${req.body.area}' , numberFunc = ${req.body.numberFunc} , duration = ${req.body.duration} WHERE id = ${req.body.id}`;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});


// Exclui um projeto
app.delete('/projetos/deletar', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    sql = `DELETE FROM projetos WHERE id = ${req.body.id}`;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

/* Inicia o servidor */
app.listen(port, hostname, () => {
  console.log(`BD server running at http://${hostname}:${port}/`);
});