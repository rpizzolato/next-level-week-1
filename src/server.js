const express = require('express');
const nunjucks = require('nunjucks');
const server = express();

const db = require('./database/db');

server.use(express.static("public"));
//habilita o uso do req.body
server.use(express.urlencoded({extended: true}));

nunjucks.configure("src/views", {
	express: server,
	noCache: true
});

server.get("/", (req, res) => {
	return res.render("index.html");
});

server.get("/create-point", (req, res) => {

	console.log(req.query);

	return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

	const body = req.body;

	const query = `
		INSERT INTO places (
				image,
				name,
				address,
				number,
				state,
				city,
				items
		) VALUES (?,?,?,?,?,?,?);
`;

	const values = [
		body.image,
		body.name,
		body.address,
		body.number,
		body.state,
		body.city,
		body.items
	];

	function afterInsertData(err) {
		if(err) {
			return res.send("Erro no cadastro.");
		}

		console.log("Cadastrado com sucesso");
		console.log(this);

		return res.render("create-point.html", {saved: true});
	}

	db.run(query, values, afterInsertData)


});

server.get("/search", (req, res) => {

	const search = req.query.search;

	if(search === "") {
		return res.render("search-results.html", {total: 0});
	}

	db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
		if(err) {
			return console.log(err);
		}

		const total = rows.length;
		const showTotal = total === 1 ? "ponto encontrado." : "pontos encontrados.";

		return res.render("search-results.html", { places: rows, total, showTotal});
	});
});

server.listen(3000);