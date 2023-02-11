var Extraccion = {

	formatoAmountBuffer : function(importe, largo){
		var total = largo;
		var len_importe = importe.length;

		while ( total > len_importe )
		{
			importe = "0" + importe;
			total--;
		};	
		return importe;
	},

	setExtraccion : function(stateData){
		console.log("[INFO] inicio setExtraccion")
		var importe = Vars.get("importe");
		var ticket = Vars.get("ticket",false);
		var indice = Vars.get("cta_indice",0);
		if(Vars.get("fastcash")){
			var cuentas = Consultas.setCuentasEnPesos(Vars.get("cuentas", []))
		}else{
			var cuentas = Vars.get("cuentas");
		}
		var moneda = Vars.get("moneda","pesos");

		var opcode = {
			"pesos":{
				"pesos":{
					"true" : "AAB  C  ", //imprime ticket
					"false": "AAB  D  "  //no imprime ticket
				},
				"dolares":{
					"true" : "A D CC  ", //imprime ticket
					"false": "A D CD  "  //no imprime ticket
				}
			},
			"dolares":{
				"pesos":{
					"true" : "A D BC  ", //imprime ticket
					"false": "A D BD  "  //no imprime ticket
				},
				"dolares":{
					"true" : "D A BC  ", //imprime ticket
					"false": "D A BD  "  //no imprime ticket
				}
			}
		}
		var origen = (cuentas[indice].moneda == "u$s")?"dolares":"pesos";
		stateData.properties.opcode  = opcode[origen][moneda][ticket];

		// stateData.properties.opcode  = opcode[ticket];
		stateData.properties.buffer_B = cuentas[indice].t;
		stateData.properties.buffer_C = cuentas[indice].n;
		//console.log(importe)
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		//console.log(imp_formateado)
		stateData.properties.amount_buffer = imp_formateado; 
		console.log("[INFO] fin setExtraccion")
	},

	setExtraccionRias : function(stateData){
		console.log("[INFO] inicio setExtraccionRias")
		var importe = Vars.get("importe");
		var imprime = Vars.get("ticket","false");
		var indice = Vars.get("tipo_cta");

		var opcode = {
			"true":[
				"  CBB C ",
				"  CBC C ",
				"  CBH C ",
				"  CBG C ",
			],
			"false":[
				"  CBB D ",
				"  CBC D ",
				"  CBH D ",
				"  CBG D ",
			]
		}
		
		stateData.properties.opcode  = opcode[imprime][indice];
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado;
		console.log("[INFO] fin setExtraccionRias") 
		//stateData.properties.buffer_B = tipo[indice];
		//stateData.properties.buffer_C = "0000000000000000000";
	},

	setExtraccionLink : function(stateData){
		console.log("[INFO] inicio setExtraccionLink")
		var importe = Vars.get("importe");
		var indice = Vars.get("tipo_cta_link");

		var opcode = [
			"ADC     ",
			"ACC     ",
			"AIC     "
		];
		var tipo = [
			"11",
			"01",
			"31",
		];
		stateData.properties.opcode  = opcode[indice];
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado; 
		stateData.properties.buffer_B = tipo[indice];
		stateData.properties.buffer_C = "0000000000000000000";
		console.log("[INFO] fin setExtraccionLink")
	},

	setExtraccionTc : function(stateData){
		console.log("[INFO] inicio setExtraccionTc")
		var ticket = Vars.get("ticket",false);
		var importe = Vars.get("importe");
		var indice = Vars.get("tipo_cta");
		var cuotas = Vars.get("cuotas",1)
		var idioma = Vars.get("idioma","ESP");

		var opcode = {
			"true" :{
				"ESP" : [
					" C  AC A",
					" C  BC A",
					" C  CCCA",
					" C  DCCA"
				],
				"ENG" : [
					"        ",
					"   CBC B",
					"   CCCCB",
					"   CDCCB"
				],
				"POR" : [
					"        ",
					"   CBC C",
					"   CCCCC",
					"   CDCCC"
				],
			},
			"false":{
				"ESP" : [
					" C  AC A",
					" C  BA A",//preset nuevo 
					" C  CCDA",
					" C  DCDA"
				],
				"ENG" : [
					"        ",
					" C  BA B",//
					"   CCCDB",
					"   CDCDB"
				],
				"POR" : [
					"        ",
					" C  BA C",//
					"   CCCDC",
					"   CDCDC"
				],
			},
		};
		
		
		// stateData.properties.buffer_B = "TC";

		if(indice == 1 && cuotas > 1){
			stateData.properties.opcode  = " F   C A";
			stateData.properties.buffer_B = cuotas;
			// stateData.properties.buffer_B = "CC";
		}else{
			stateData.properties.opcode  = opcode[ticket][idioma][indice];
		}

		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado; 
		console.log("[INFO] fin setExtraccionTc")

	},

	setExtraccionCardless : function(stateData){
		console.log("[INFO] inicio setExtraccionCardless")

		var importe = Vars.get("importe");
		var tipo = Vars.get('doc_tipo')

		var opcode = [
		    "FACCC   ",
		    "FBCCC   ",
		    "FCCCC   ",
		    "FHCCC   ",
		    "FICCC   "
		];


		stateData.properties.opcode  = opcode[tipo];
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado; 
		stateData.properties.buffer_C = Vars.get("doc");
		console.log("[INFO] fin setExtraccionCardless")
	},

	setExtraccionANSES : function(stateData){
		console.log("[INFO] inicio setExtraccionAnses")
		var importe = Vars.get("importe");
		var ticket = (CheckDevice.CheckHabilitado("ticket_usuario") == true ) ? true : false;
		var cta_indice = Vars.get("cta_indice", 0);
		var cuentas = Vars.get('cuentas', []);
		var opcode = {
			"true" : "AAB  C  ", //imprime ticket
			"false": "AAB  D  "  //no imprime ticket
		}

		stateData.properties.opcode  = opcode[ticket];
		stateData.properties.buffer_B = "11";
		if (cuentas.length>0 && Vars.exists("cta_indice")){
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			stateData.properties.buffer_C = "0000000000000000000";
		}
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado; 
		console.log("[INFO] inicio setExtraccionAnses")
	},

	setFastCash : function(stateData){
		console.log("[INFO] inicio setFastCash")
		Vars.set("fastcash", true);
		var importe = Vars.get("importe");
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		var tipo_menu = Vars.get("tipo_menu");
		if(tipo_menu === "TC" || tipo_menu === "LINK" || tipo_menu === "RIAS" || tipo_menu === "ANSES" || tipo_menu === "BIOMETRIA" || Vars.get("isBiom")){
			stateData.properties.opcode = Vars.get("biom_of",false) ? "FBBB    " : "AAB  D  "
			stateData.properties.amount_buffer = imp_formateado;
			console.log("[INFO] fin setFastCash") 
			return false;
		} else {
			var ticket = Vars.get("ticket",false);
			var cuentas = Consultas.setCuentasEnPesos(Vars.get("cuentas", []));
			var indice = Vars.get("cta_indice",0);
			stateData.properties.buffer_B = cuentas[indice].t;
			stateData.properties.buffer_C = cuentas[indice].n;
			stateData.properties.opcode = "AAB  D  ";
			stateData.properties.amount_buffer = imp_formateado; 
			console.log("[INFO] fin setFastCash")
			return false;
		}
		
	},

	setExtraccionBiometria : function(stateData){
		console.log("[INFO] inicio setExtraccionBio")
		var importe = Vars.get("importe");
		var ticket = (Vars.get("ticket",false)) ? "C " : "D ";
		var indice = Vars.get("cta_indice",0);
		var cuentas = Vars.get("cuentas");
		var moneda = Vars.get("moneda","pesos");
		if (moneda == "dolares"){
			cuentas = Vars.get("cuentas_dolares");
		}
		var origen = cuentas[indice].t;

		var opcode = {
			"pesos":{
				"01" : "ACC B ",
				"11" : "ADC B ",
				"21" : "ABC B ",
				"02" : "AHC B ",
				"12" : "AGC B ",
			},
			"dolares":{
				"02" : "AIC B ",
				"12" : "",
			}
		}
		stateData.properties.opcode  = opcode[moneda][origen] + ticket;

		stateData.properties.buffer_B = cuentas[indice].t;
		stateData.properties.buffer_C = cuentas[indice].n;
		//console.log(importe)
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		//console.log(imp_formateado)
		stateData.properties.amount_buffer = imp_formateado; 
		console.log("[INFO] fin setExtraccionBio")
	},

	getIDPositivaValues : function(fields){
		var fdks 	= [
			{ "fdk" : "fdka" },
			{ "fdk" : "fdkb" },
			{ "fdk" : "fdkc" },
			{ "fdk" : "fdkd" },
			{ "fdk" : "fdkf" },
			{ "fdk" : "fdkg" },
			{ "fdk" : "fdkh" },
			{ "fdk" : "fdki" }
		];
		var keys = [];
		for (index in fdks){
			var newObject = {};
			var fdk = fdks[index];
			newObject.texto = fields[fdk["fdk"]];
			newObject.event = "ev_"+fdk["fdk"];
			
			keys.push(newObject);
		}
		
		return keys;
	},

	getIDPositivaDNI : function(msj){
		var regexp = /^[A-Z]{2}([0-9]+)\./
		msj = msj[2].match(regexp)
		return (msj==null)?false:msj[1]
	},

	getIDPositivaCUIT : function(msj){
		var regexp 	=  /[0-9]+/g
		return msj[2].match(regexp)
	},

	//TODO: Falta agregar las funciones:
	//    -getIDPositivaCI
	//    -getIDPositivaPAS
	//    -getIDPositivaLC
	//    -getIDPositivaLE

	getIDPositivaTipoDoc : function(msj){
		return msj[1].substring(2).trim();
	},

	getIDPositivaError : function(screen_data, fields){
		var regexp 	=  /31[0-9]/g
		var texto 	= (screen_data != undefined) ? screen_data : "";
		var result 	= texto.match(regexp);		 			
		var code 	= "310";
		var text 	= "";
		
		if (result != null ){
			code = result[0];
		}

		if(code == "311"){
			return true;
		}
		else if(code == "312"){
			return true;
		}
		else{
			return false;
		};
	},	

	getIDPositivaAlerta : function(screen_data, fields){
		var regexp 	=  /31[0-9]/g
		var texto 	= (screen_data != undefined) ? screen_data : "";
		var result 	= texto.match(regexp);		 			
		var code 	= "310";
		var text 	= "";
		
		if (result != null ){
			code = result[0];
		}

		if(code == "311"){
			return false;
		}
		else if(code == "312"){
			return true;
		}
		else{
			return false;
		};
	},

	getIDPositivaOrden : function(fields){
		var regexp 	=  /\.[*-]{3}\./g
		var a = fields[2].match(regexp);
		if(a==null){
			var regexp 	=  /[*-]{3}\./g
			var a = fields[2].match(regexp);
			return ((a == "---.")? true : false);
		}
		return ((a == ".---.")? true : false);
	},

	getImporteRecomendado : function(){
		try{
			var msj = ndctools.retrieveScreen(48,75);
			var importe_recomendado = parsePRDH(msj, "", "");
			return importe_recomendado;
		}catch(error){
			console.error("[ERROR] de Parseo de Importe Sugerido")
		}
	},

	getIDAlfaValues : function(opciones,tipo_menu){
		var fdks = ["fdki","fdkh","fdkg","fdkf","fdka","fdkb","fdkc","fdkd"];
		if(tipo_menu){
			fdks = ["fdka","fdkb","fdkc","fdkd","fdki","fdkh","fdkg","fdkf"];
		}
		var keys = [];
		for (index in fdks){
			var newObject = {};
			newObject.texto = opciones[index];
			newObject.event = "ev_"+fdks[index];
			newObject.fdk = fdks[index].charAt(3).toUpperCase();

			keys.push(newObject);
		}
		
		return keys;
	},

	getIDPositivaNumerica : function(msj){
		var fdks = ["fdka",
					"fdkb",
					"fdkc",
					"fdkd",
					"fdki",
					"fdkh",
					"fdkg",
					"fdkf"];
		var keys = [];

		for(i=0; i<8; i++){
			var newObject = {};
			newObject.texto = msj[i+3].substring(2);
			newObject.event = "ev_" + fdks[i];
			newObject.fdk = fdks[i].charAt(3).toUpperCase();

			keys.push(newObject);
		}
		//console.log("KEYS: ", keys);
		return keys;
	},

	getLinkIDAlfaValues : function(opciones){
		var fdks = ["fdka",
					"fdkb",
					"fdkc",
					"fdkd",
					"fdki",
					"fdkh",
					"fdkg",
					"fdkf"];
		var keys = [];
		for (index in fdks){
			var newObject = {};
			newObject.texto = opciones[index];
			newObject.event = "ev_"+fdks[index];
			newObject.fdk = fdks[index].charAt(3).toUpperCase();

			keys.push(newObject);
		}
		
		return keys;
	},

	espaciosBlancos: function(value,largo){
		if(largo==undefined){
			var white="            "
			result=value+white.slice(value.length)
			return result
		}else{
			var total = largo;
			var len_importe = value.length;

			while ( total > len_importe )
			{
				result = value+" ";
				total--;
			};	
			return result;
		}
	},

	parsearSinTicketExtraccion: function(){
		var receiptdata = Vars.get("msg-ticket");
		var comprobante = Vars.get("comprobante");
		if(comprobante == undefined){
			comprobante = {};
		}
		if(receiptdata == undefined) return;
		Vars.remove("msg-ticket");
		//console.log(receiptdata);
		var obj = {};
		obj.receipt = [];

		try{
			var data = {};
			data["lines"] = receiptdata.split("\n");
			obj.receipt.push(data);			
		}
		catch(e){
			//console.log(e);
		}

		for (var i in obj.receipt){
			var data  = parseTicket(obj.receipt[i]);
			data.fromHost = "----------------------";
			obj.receipt[i] 	= data;
		}

		if(obj.receipt[0].CAJERO != undefined)  
			 comprobante.cajero = obj.receipt[0].CAJERO;
		if(obj.receipt[0].DOMICILIO != undefined)  
			 comprobante.direccion = obj.receipt[0].DOMICILIO;
		if(obj.receipt[0].FECHA != undefined)  
			 comprobante.fecha = obj.receipt[0].FECHA;
		if(obj.receipt[0].HORA != undefined)  
			 comprobante.hora = obj.receipt[0].HORA;
		if(obj.receipt[0].SALDO != undefined)  
			 comprobante.saldo = obj.receipt[0].SALDO;
		if(obj.receipt[0].DISPONIBLE != undefined)  
			 comprobante.disponible = obj.receipt[0].DISPONIBLE;
		if(obj.receipt[0].TRANS != undefined)  
			 comprobante.trans = obj.receipt[0].TRANS;
		
		if(comprobante.trans == undefined){
			//console.log( obj.receipt[0].extra_data );
			var regex = /^([0-9]{4}|[\s]{1}[0-9]{3}|[\s]{2}[0-9]{2}|[\s]{3}[0-9]{1})$/;
			for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
				var tmp = obj.receipt[0].extra_data[i].match(regex);
				if(tmp != undefined){
					//console.log( tmp );
					comprobante.trans = tmp[0];
				}
			}	
		}

		if(comprobante.direccion == undefined){
			if(obj.receipt[0].LOCALIZACAO != undefined){
				comprobante.direccion = obj.receipt[0].LOCALIZACAO;
			}else if(obj.receipt[0].LOCATION != undefined){
				comprobante.direccion = obj.receipt[0].LOCATION;
			}
		}


		Vars.set("comprobante", comprobante);
		
		// obj.receipt[0].onus = (Vars.get("crd_fiid")==Vars.get("term_fiid"));

		// // obj.name = "banelcoTicketParser.html";
		// obj.name = "banelcoTicketParserPlano.html";
		// return obj;		
	},

	switchExtraccion :function(data){
		var menu = Vars.get("tipo_menu")
		switch(menu) {
			case "BANELCO":
				Extraccion.setExtraccion(data)
				break
			case "JUBILADOS":
				Extraccion.setExtraccion(data)
				break
			case "TC":
				Extraccion.setExtraccionTc(data);
				break
			case "ANSES":
				Extraccion.setExtraccionANSES(data);
				break
			case "LINK":
				Extraccion.setExtraccionLink(data);
				break
			case "RIAS":
				Extraccion.setExtraccionRias(data);
				break
			case "BIOMETRIA":
				Extraccion.setExtraccionBiometria(data);
				break
			default:
				//console.log('next screen not defined')
				break
		}
		return data
	},

	switchNextState: function(){
		var tipo_menu = Vars.get("tipo_menu","BANELCO")
		var confirmacion = Vars.get("confirmacion",false)
		var es_biom = Usuario.esBiometria()

		if(tipo_menu =="LINK" && !confirmacion && !es_biom){
			return "ssfw/tx_extraccion/sta_ssfw_seleccion_tipo_cta";
		}else if ((tipo_menu == "LINK" || tipo_menu == "ANSES" || tipo_menu == "TC" || tipo_menu == "RIAS") && !es_biom){
			return "ssfw/tx_extraccion/sta_ssfw_extr_conf_sin_cuentas";
		}else if(es_biom && tipo_menu == "BANELCO"){
			return "ndc/tx_extraccion/sta_ndc_tr_fast_cash"
		}else if(es_biom && tipo_menu == "LINK"){
			return Usuario.switchPinBiometrico()
		}else{
			return "ssfw/tx_extraccion/sta_ssfw_extraccion2";
		}

	},

} 


