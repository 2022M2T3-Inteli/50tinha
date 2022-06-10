const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';

const port = 3091;
const sqlite3 = require('sqlite3').verbose();
const app = express();
const DBPATH = 'dbteste.db';

app.use(express.static("../frontend/"));

app.use(express.json());


/* Definição dos endpoints */

/****** CRUD ******************************************************************/
// Retorna todos registros (é o R do CRUD - Read)
app.get('/profissionais', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM PROFISSIONAIS ORDER BY idFunc';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/profissionais/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `INSERT INTO PROFISSIONAIS (nome, area, tipo, estado, idCargo) VALUES ('${req.body.nome}', '${req.body.area}', '${req.body.tipo}', '${req.body.estado}', ${req.body.idCargo})`;
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

	sql = `UPDATE PROFISSIONAIS SET nome = '${req.body.nome}', area = '${req.body.area}', tipo = '${req.body.tipo}', estado = '${req.body.estado}' WHERE idFunc = ${req.body.idFunc}`;
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

	sql = `DELETE FROM PROFISSIONAIS WHERE idFunc = ${req.body.idFunc}`;
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
  var sql = 'SELECT * FROM PROJETOS ORDER BY idProject';
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

	sql = `INSERT INTO PROJETOS (idProject, nome, area, mesInicio, anoInicio, mesFim, anoFim) VALUES (${req.body.idProject}, '${req.body.nome}', '${req.body.area}', '${req.body.mesInicio}', ${req.body.anoInicio}, '${req.body.mesFim}', ${req.body.anoFim})`;
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
	sql = `UPDATE PROJETOS SET nome = '${req.body.nome}', area = '${req.body.area}', mesInicio = '${req.body.mesInicio}', anoInicio = ${req.body.anoInicio}, mesFim = '${req.body.mesFim}', anoFim = ${req.body.anoFim} WHERE idProject = ${req.body.idProject}`;
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
    sql = `DELETE FROM PROJETOS WHERE idProject = ${req.body.idProject}`;
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});


////////////////////////////////ALOCACAO//////////////////////////

app.get('/alocacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = `SELECT PROJETOS.nome, SUM(horasAlocadasProjeto) AS somaHoras FROM alocacao
  INNER JOIN PROJETOS ON ALOCACAO.idProject = PROJETOS.idProject
  GROUP BY PROJETOS.idProject
  ORDER BY PROJETOS.nome COLLATE NOCASE`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/alocacao/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `INSERT INTO ALOCACAO (idAlocacao, idFunc, idProject, horasAlocadasProjeto, mes, ano) VALUES (${req.body.idAlocacao}, ${req.body.idFunc}, ${req.body.idProject}, ${req.body.horasAlocadasProjeto}, '${req.body.mes}', ${req.body.ano})`;
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
app.patch('/alocacao/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `UPDATE ALOCACAO SET horasAlocadasProjeto = ${req.body.horasAlocadasProjeto}, mes = '${req.body.mes}', ano = ${req.body.ano} WHERE idAlocacao = ${req.body.idAlocacao}`;
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
app.delete('/alocacao/deletar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `DELETE FROM ALOCACAO WHERE idAlocacao = ${req.body.idAlocacao}`;
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