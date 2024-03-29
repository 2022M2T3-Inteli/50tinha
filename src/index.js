const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//const hostname = '127.0.0.1';

const port = process.env.PORT || 3000;
const path = require("path")
const sqlite3 = require('sqlite3').verbose();
const app = express();
const DBPATH = 'dbteste.db';

app.use(express.static("./frontend/"));

app.use(express.json());


/* Definição das rotas  */

/****** rotas ******************************************************************/
// Retorna todos registros
app.get('/profissionais', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o ban	co
  var sql = 'SELECT * FROM PROFISSIONAIS ORDER BY idFunc';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

app.get('/profissionais/tabelaprof', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o ban	co
  var sql = `SELECT   COUNT(ALOCACAO.idFunc) as numeroProjetos, sum(ALOCACAO.horasAlocadasProjeto) as sum, PROFISSIONAIS.idFunc, PROFISSIONAIS.nome, PROFISSIONAIS.tipo, PROFISSIONAIS.area, PROFISSIONAIS.estado from ALOCACAO
  INNER JOIN PROFISSIONAIS ON ALOCACAO.idFunc = PROFISSIONAIS.idFunc
	GROUP BY PROFISSIONAIS.idFunc
	ORDER BY PROFISSIONAIS.nome COLLATE NOCASE`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});



// Insere um registro 
app.post('/profissionais/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `INSERT INTO PROFISSIONAIS (nome, area, tipo, estado) VALUES ('${req.body.nome}', '${req.body.area}', '${req.body.tipo}', '${req.body.estado}')`;
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



// Atualiza um registro 
app.patch('/profissionais/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erros

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
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar erros

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

//////////////////////////////////Rotas de PROJETOS/////////////////////////

//exibe todos os projetos registrados
app.get('/projetos', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro

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

//exibe algum projeto
app.get('/projetos/single/:idProject', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro
 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM PROJETOS WHERE idProject = ' + req.params.idProject;
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        else console.log(sql);
 
    res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Pega informações e exibe na tela
app.get('/projetos/timeline', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erros

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = `SELECT nome, mesInicio, anoInicio, mesFim, anoFim FROM PROJETOS NOCASE`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

// Pega os numeros de funcionario por projeto
  app.get('/projetos/funcionario', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erros

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = `SELECT PROJETOS.nome, PROJETOS.idProject,
  COUNT(ALOCACAO.idFunc) as funcAlocados FROM ALOCACAO
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

// Cria uma tabela com a quantidades de horas por mes de projeto
app.get('/projetos/alocacaoMes', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erros

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = `SELECT ALOCACAO.mes, SUM(ALOCACAO.horasAlocadasProjeto) as horasMes
  FROM  ALOCACAO
  WHERE horasAlocadasProjeto IS NOT NULL   
	  AND horasAlocadasProjeto != 0.00   
  GROUP BY mes  
  ORDER BY mes`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

// Retorna todos os funcionarios CLTs e o total de horas alocadas deles
app.get('/projetos/alocacaoMesCLT', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erros

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = `SELECT   PROFISSIONAIS.idFunc, PROFISSIONAIS.nome, PROFISSIONAIS.tipo, PROFISSIONAIS.area, PROFISSIONAIS.estado, COUNT(ALOCACAO.idFunc) as numeroProjetos, sum(ALOCACAO.horasAlocadasProjeto) as horas  from ALOCACAO
  INNER JOIN PROFISSIONAIS ON ALOCACAO.idFunc = PROFISSIONAIS.idFunc
  WHERE PROFISSIONAIS.tipo != 'nao'
	GROUP BY PROFISSIONAIS.idFunc
	ORDER BY PROFISSIONAIS.nome COLLATE NOCASE`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

// Retorna todos os funcionarios CLTs e o total de horas alocadas deles
app.get('/projetos/alocacaoMesNaoCLT', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erros

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = `SELECT   PROFISSIONAIS.idFunc, PROFISSIONAIS.nome, PROFISSIONAIS.tipo, PROFISSIONAIS.area, PROFISSIONAIS.estado, COUNT(ALOCACAO.idFunc) as numeroProjetos, sum(ALOCACAO.horasAlocadasProjeto) as horas  from ALOCACAO
  INNER JOIN PROFISSIONAIS ON ALOCACAO.idFunc = PROFISSIONAIS.idFunc
  WHERE PROFISSIONAIS.tipo != 'sim'
	GROUP BY PROFISSIONAIS.idFunc
	ORDER BY PROFISSIONAIS.nome COLLATE NOCASE`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

//insere um novo projeto 
app.post('/projetos/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Acess-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 

	sql = `INSERT INTO PROJETOS (nome, area, mesInicio, anoInicio, mesFim, anoFim, unidade) VALUES ('${req.body.nome}', '${req.body.area}', '${req.body.mesInicio}', ${req.body.anoInicio}, '${req.body.mesFim}', ${req.body.anoFim}, '${req.body.unidade}')`;
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
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 
	sql = `UPDATE PROJETOS SET nome = '${req.body.nome}', area = '${req.body.area}', mesInicio = '${req.body.mesInicio}', anoInicio = ${req.body.anoInicio}, mesFim = '${req.body.mesFim}', anoFim = ${req.body.anoFim}, unidade = '${req.body.unidade}' WHERE idProject = ${req.body.idProject}`;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});


// Exclui um projeto    ${req.body.idProject}
app.delete('/projetos/deletar', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `DELETE FROM PROJETOS WHERE idProject = ${req.body.idProject}`;
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});


////////////////////////////////ALOCAÇÃO//////////////////////////

app.get('/alocacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM PROJETOS ORDER BY idProject';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		
		}
	res.json(rows)
	});
	db.close(); // Fecha o banco
});

// Pega alocação para "gráfico 1"
app.get('/alocacao/grafico1', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 

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

// Pega alocação para "gráfico 2"
app.get('/alocacao/grafico2', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 
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

// Insere um registro 
app.post('/alocacao/adicionar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro 

	sql = `INSERT INTO ALOCACAO (idFunc, idProject, horasAlocadasProjeto, mes, ano) VALUES (${req.body.idFunc}, ${req.body.idProject}, ${req.body.horasAlocadasProjeto}, '${req.body.mes}', ${req.body.ano})`;
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

// Atualiza profissional na alocação para algum existente
app.patch('/alocacao/adicionar/profissional', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro
 
    sql = `UPDATE ALOCACAO SET idFunc = ${req.body.idProf}, WHERE idAlocacao = ${req.body.idFunc}`;
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

// Atualiza um registro 
app.patch('/alocacao/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar erro

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


// Exclui um registro
app.delete('/alocacao/deletar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar erro 

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
app.listen(port, () => {
  console.log(`BD server running at port ${port}`);
});