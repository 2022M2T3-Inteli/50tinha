const express = require("express");
const db = require('../utils/db');

const router = express.Router();

router.all("/", (req, res) => {
	res.render("funcionarios/index");
});

router.get("/alterar", (req, res) => {
	let id = req.query["id"];

	if (!id) {
		res.send("Id faltando");
		return;
	}

	const sql = "SELECT id, nome, horas FROM pessoa WHERE id=?";

	console.log(sql);

	db.get(sql, [id], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("funcionarios/form", { funcionario: row });
	});
});

router.post("/alterar", (req, res) => {
	let msg;
	let id = req.body["id"];
	let nome = req.body["nome"];
	let horas = req.body["horas"];

	if (!id) {
		res.send("Id faltando");
		return;
	}

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!horas) {
		res.send("Horas faltando");
		return;
	}

	const sql = "UPDATE pessoa SET nome=?, horas=? WHERE id=?";

	console.log(sql);

	db.run(sql, [nome, horas, id], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("funcionarios/alterar", { mensagem: msg });
	});
});

router.all("/listar", (req, res) => {
	let pessoas;
	let ordenar = req.query["ordenar"];
	let params;

	if (!ordenar) {
		ordenar = "";
		params = [];
	} else {
		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
		params = [ordenar];
	}

	const sql = "SELECT id, nome, horas FROM pessoa " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("funcionarios/listar", { model: rows });
	});
});

router.get("/remover", (req, res) => {
	let msg;
	let id = req.query["id"];

	const sql = "DELETE FROM pessoa WHERE id=?";
	console.log(sql);

	db.all(sql, [id], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Usuário Removido!";

		res.render("funcionarios/remover", { mensagem: msg });
	});
});

router.all("/inserir", (req, res) => {
	const id = req.query["id"];
	const nome = req.query["nome"];
	const horas = req.query["horas"];

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!horas) {
		res.send("Horas faltando");
		return;
	}

	const sql = "INSERT INTO pessoa (nome, horas) VALUES (?, ?)";
	console.log(sql);

	db.run(sql, [nome, horas], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}

		res.render("funcionarios/inserir", { msg: mensagem });
	});
});

module.exports = router;
