//esta tabla solo la uso para no tener que escribir el nombre entero del modulo
var tabla_modules = {
    "efectivo" : "bunch_note_acceptor",
    "cheque" : "cheque_processing_module",
    "sobre" : "envelope_depository",
    "dispensa_sobre" : "envelope_dispenser",
    "dispensador" : "cash_handler",
    "lectora" : "card_reader",
    "codigo_de_barras" : "barcode_reader",
    "biometria" : "biometrics_capture_device",
    "dispensador_primario" : "primary_cash_handler",
    "dispensador_secundario" : "secondary_cash_handler",
    "ticket_usuario" : "receipt_printer",
    "ticket_journal" : "Journal_printer",
    "night_safe" : "night_safe",
    "statement_printer" : "statement_printer",
    "coin_dispenser" : "coin_dispenser",
    "passbook_printer" : "passbook_printer",
};

// last_check es un json con el estado de los modulos que se verificaron (true or false)
var CheckDevice = {

	Dispensador : undefined,

	//procede a checkear los modulos pedidos
	Check:function(obj, state){
		Vars.set("estado_ok", state);
		Vars.set("last_check", {});
		var module = obj[0];
		if (module == "deposito"){
			obj = ["efectivo", "cheque"];
		}
		else if (module == "pago"){
			obj = ["efectivo"];
		}
		else if (module == "all"){
			obj = ["efectivo","cheque","dispensador","ticket_usuario","ticket_journal", "dispensador_primario", "dispensador_secundario","dispensa_sobre","sobre"];
		}
		Vars.set("modulos", obj);
		//console.log(obj);
		//console.log("obj");

		return "ndc/check_device/sta_ndc_check_device"
	},

	//agrega un campo a last_check
	AppendLastCheck : function(check){
		var obj = Vars.get("last_check");
		obj[check] = true;
		Vars.set("last_check", obj);
		Vars.set("check", check);
		//console.log("append");
		//console.log(Vars.get("last_check"));		
	},	

	//actualiza el ultimo campo (check) en last_check con su estado (true or false)
	UpdateLastCheck : function(good){
		var obj = Vars.get("last_check");
		var check =	Vars.get("check");

		if(obj[check] != undefined && check != undefined)
		{
			obj[check] = ( good ? true : false);
			Vars.set("last_check", obj);
		}	
		//console.log("update");
		//console.log(Vars.get("last_check"));
	},

	UpdateModuleStatus : function(module,status){
		var obj = Vars.get("last_check");

		if(obj[module] != undefined)
		{
			obj[module] = status;
			Vars.set("last_check", obj);
		}	
		////console.log("update");
		////console.log(Vars.get("last_check"));
	},

	ReturnEstadoOk : function(){
		var state = Vars.get("estado_ok");
		//console.log(state);
		//console.log("state");
		if (state != undefined){
			return state;
		}
		return "ndc/sta_ndc_start";
	},	
	
	//algun modulo de los verificados esta ok?
	AlgunoOk : function(){
		var last_check = Vars.get("last_check");
		for ( var i in last_check ){
			if(last_check[i] == true)
				return true;
		}
		return false;

	},	

	//fue por device_available
	Good:function(){
		CheckDevice.UpdateLastCheck(true);
		var modulos = Vars.get("modulos");
		if(modulos.length > 0){
			States.refreshState();
		}
		else{
			States.handleEvent("ev_fin_check");	
		}
	},

	//fue por device_unavailable
	Bad:function(){
		CheckDevice.UpdateLastCheck(false);
		var modulos = Vars.get("modulos");
		if(modulos.length > 0){
			States.refreshState();
		}else{
			if(this.AlgunoOk){
				States.handleEvent("ev_fin_check");	
			}
			else{
				States.handleEvent("ninguno_disponible");	
			}
		}
	},

	//para poder llamar a esta funcion es necesario que se haya testeado el modulo con anterioridad
	//si no se encuentra en el array de checkeados, devuelve como si estuviese OK
	CheckHabilitado:function(id){
		// //console.log("HABLILITADO EL RETURN EN CHECKDEVICE");
		// return true;
		
		var modulos = Vars.get("last_check");
		if(modulos[id] == false)
			return false;
		return true
	},

	poseeDispensadorDeDinero : function(){
			
			//Se setea un valor del readregistry "(si existe)" a la variable para saber si tiene o no  dispensador
			CheckDevice.Dispensador=XFSHelpers.readRegistry("Cash Dispenser", undefined, "SOFTWARE\\NCR\\Advance NDC\\Aliases"); 

				//Si la variable permanece indefinida retorna false (no posee), si no, devuelve true
				if(CheckDevice.Dispensador == undefined){
			return false;
		
				}else{
			return true;
		}

	}

}

