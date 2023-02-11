var Parseo = {
	//chequea que el JSON tenga el formato adecuado, 
	//de ser asi deriva el flujo al siguiente estado y guarda mensaje en una variable parametrizable
	checkMessage : function(next_state,variable){
		try {
			var info = ndctools.retrieveScreen(48,73);
			var respuesta = JSON.parse(info)
			var nombre = variable ? variable : "respuesta" 
			Vars.set(nombre,respuesta)
			return next_state
		} catch (error) {
			console.error("[ERROR] de Parseo")
			return "ndc/sta_ndc_start"
		}
	},
	parser : function () {
		try{
			var info = ndctools.retrieveScreen(48,75); 
			var regexp  =  /{.*}/g;
			info = info.match(regexp);
			info = JSON.parse(info);
			Vars.set("depositos",info);	
		}
		catch(error){
			console.error("[ERROR] de Parseo")
		}		
	},
	parser_next : function(){
		try{
			var info = ndctools.retrieveScreen(48,75);
		}catch(error){
			console.error("[ERROR] de Parseo")
		}
		var respuesta = JSON.parse(info);
		Vars.set("respuesta",respuesta);
	}		

}