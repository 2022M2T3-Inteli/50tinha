const express = require("express");
const db = require('../utils/db');

const router = express.Router();

router.all("/", (req, res) => {
	res.render("index/index");
});

router.get("/grafico", (req, res) => {
	let votacao;
	let votos = [];
	let cores = [];

	const sql = "SELECT id, cor, votos FROM votacao ORDER BY cor ASC";

	db.all(sql, [], (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}
		votos = rows.map(votos => votos.votos);
		cores = rows.map(cores => cores.cor);
		console.log(votos);
		console.log(cores);
		res.render("index/grafico", { model: rows, totalVotos: votos , totalCores: cores });
	});
});

module.exports = router;
