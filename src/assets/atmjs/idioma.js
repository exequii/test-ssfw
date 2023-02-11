var leyendas = {
	"ESP" : esp,
	"ENG" : eng,
	"POR" : por,
};

var Idioma = {
	txt : function(label){
		var idioma = ( Vars.get("idioma") != undefined ? Vars.get("idioma") : "ESP");
		return leyendas[idioma][label];
	},

	agregarTexto : function(id){
		var componente = $("#" + id);
		componente.html(Idioma.txt(componente.html()));
	},
};
