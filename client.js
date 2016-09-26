const Hogan = require("hogan.js");

console.log(module);

const Resources = Hogan.compile(`
	{{#resources}}
		<h1>{{title}}</h1>
		<h2><a href="{{url}}">{{url}}</a></h2>
	{{/resources}}
`);

const search = () => {
	$.get("/search", { q: $("#search").val() }, res => {
		const view = Resources.render({ resources: JSON.parse(res) });
		console.log(JSON.parse(res));
		$("#resources").html(view);
	});
};

search();

$("#search").keyup(search);

$("#submit").click(() => {
	$.get("/submit?" + $("#new").serialize(), () => {
		search();
	});
});
