const {Vars, CheckDevice} = require("./utils/globals")

var Extraccion = {

    setCuentasEnPesos: function(cuentas){
		var cuentasPesos = [];
		cuentas.forEach((element) => {
			if(element.moneda === "$"){
				cuentasPesos.push(element);
			}
		});
		return cuentasPesos;
	},

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
		var importe = Vars.get("importe");
		var ticket = Vars.get("ticket",false);
		var indice = Vars.get("cta_indice",0);
		if(Vars.get("fastcash")){
			var cuentas = Extraccion.setCuentasEnPesos(Vars.get("cuentas", []))
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
		stateData.properties.buffer_B = cuentas[indice].t;
		stateData.properties.buffer_C = cuentas[indice].n;
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado; 
        return stateData;
	},

	setExtraccionRias : function(stateData){
		console.log("[INFO] inicio setExtraccionRias")
		var importe = Vars.get("importe");
		var imprime = Vars.get("ticket","false");
		var indice = Vars.get("tipo_cta",0);

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
		return stateData
	},

	setExtraccionLink : function(stateData){
		console.log("[INFO] inicio setExtraccionLink")
		var importe = Vars.get("importe");
		var indice = Vars.get("tipo_cta_link",0);

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
		return stateData
	},

	setExtraccionTc : function(stateData){
		console.log("[INFO] inicio setExtraccionTc")
		var ticket = Vars.get("ticket",false);
		var importe = Vars.get("importe");
		var indice = Vars.get("tipo_cta",0);
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
		return stateData
	},

	setExtraccionCardless : function(stateData){
		var importe = Vars.get("importe");
		var tipo = Vars.get('doc_tipo',0)

		var opcode = [
			"FACCC   ",
			"FBCCC   ",
			"FCCCC   ",
			"FHCCC   ",
			"FICCC   "
		];


		
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		stateData.properties.amount_buffer = imp_formateado; 
		stateData.properties.buffer_C = Vars.get("doc");
		stateData.properties.opcode  = opcode[tipo];
		return stateData
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
		return stateData
	},

	setFastCash : function(stateData){
		var importe = Vars.get("importe");
		var cuentas = Vars.get("cuentas",[])
		var indice = Vars.get("cta_indice");
		var tipo_menu = Vars.get("tipo_menu")
		var imp_formateado = Extraccion.formatoAmountBuffer(importe.toString(), 12);
		if(tipo_menu === "TC" || tipo_menu === "LINK" || tipo_menu === "RIAS" || tipo_menu === "ANSES" || tipo_menu === "BIOMETRIA"){
			stateData.properties.opcode = Vars.get("biom_of",false) ? "FBBB    " : "AAB  D  "
			stateData.properties.amount_buffer = imp_formateado;
			return stateData;
		} else {
			var ctas = Extraccion.setCuentasEnPesos(cuentas);
			stateData.properties.buffer_B = ctas[indice].t;
			stateData.properties.buffer_C = ctas[indice].n;
			stateData.properties.opcode = "AAB  D  ";
			stateData.properties.amount_buffer = imp_formateado; 
			return stateData;
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
		return stateData
	},
} 

module.exports = Extraccion;
