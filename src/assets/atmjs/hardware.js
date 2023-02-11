var Hardware = {

	vendor : null,

	isNCR : function(){
	
		return (this.vendor == "N");
	
	},

	hasCashDispenser : function(){
		return (InternalData.cashDispenser.length > 0);
	},

	selec_Vendor : function(){  //Asigna el valor Correspondiente al identificador de Cajero. (Para saber que marca es el cajero)
		
		//Se lee en la registry el valor que representa la marca del cajero
		XFSHelpers.readRegistry("NCRHWErrors", undefined, "SOFTWARE\\NCR\\Advance NDC").then(function(data){ 
		
	//Se parcea el valor obtenido en la registry a letra (Representativa a la marca del cajero)
	switch(data){

		case "1": 
			Hardware.vendor = 'N';
			break

		case "2":
			Hardware.vendor = 'W';
			break

		case "3":
			Hardware.vendor = 'D';
			break

		case "4":
			Hardware.vendor = 'H';
			break
		
		case "5":
			Hardware.vendor = 'G';
			break

		case "6":
			Hardware.vendor = 'O';
			break
	}

	}).caught(function(error){
		//console.error("Error de vendor ",error);
	});
	},

	Error : {
		printTicket : function(params){
			if(params == null)
				params = {};
			params.CAJERO = InternalData.InfoCajero.nombre.trim();
			params.DOMICILIO = InternalData.InfoCajero.dom.trim();
			params.hash = InternalData.InfoCajero.hash;
			if(params.mensaje === undefined)
				params.mensaje = "LA TRANSACCION NO SE PUDO COMPLETAR DEBIDO A UN ERROR EN LA TERMINAL.<br>POR FAVOR, CONSERVA ESTE TICKET Y CONTACTA AL PERSONAL DE LA SUCURSAL";
			if(params.nextState === undefined)
				params.nextState = "ndc/sta_ndc_start";
			Vars.set("fw_ticket_params",params);
			return "ssfw/error/sta_ssfw_ticket_falla_modulo";
		}
	}

	
};
