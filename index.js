const argv = require("minimist")(process.argv.slice(2));
const express = require("express");
const Sequelize = require("sequelize");

const db = new Sequelize(argv.db, argv.user, argv.password);

const Resource = db.define("resource", {
	title: Sequelize.STRING,
	url: Sequelize.STRING,
	date: Sequelize.DATE
});

const app = express();

app.use(express.static(__dirname + "/static"));

app.get("/search", (req, res) => {
	Resource.findAll({
		where: {
			title: {
				$like: "%" + req.query.q.replace(new RegExp(" ", "g"), "%") + "%"
			}
		}
	}).then(resources => {
		res.end(JSON.stringify(resources));
	});
});

app.get("/submit", (req, res) => {
	Resource.create({
		title: req.query.title,
		url: req.query.url
	}).then(() => {
		res.end();
	});
});

db.sync({ force: !!argv.force }).then(() => {
	app.listen(8080);
});
