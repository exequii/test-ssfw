var Logos = {
	mostrar : function(id){
		if(id == undefined)
			return;

		var componente = $("#" + id);
		componente[0].style = "display : inline";
		
	}
}