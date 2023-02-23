const {Vars, CheckDevice} = require("./utils/globals")

var Consultas = {
	Ticket:{
		Metadata:{
			Date:/\d{2}\/\d{2}\/\d{2}/,
			Time:/\d{2}:\d{2}/,
			Terminal:/S1.{6}/,
			outMetadata(line, outobject){
				var syntax = new RegExp(`${this.Date.source}.*${this.Time.source}.*${this.Terminal.source}`);
				if(!syntax.test(line)){
					return true; // Keep the line because isn't a match
				}
				outobject.fecha = (line.match(new RegExp(this.Date)) || [undefined])[0];
				outobject.hora = (line.match(new RegExp(this.Time)) || [undefined])[0];
				outobject.cajero = (line.match(new RegExp(this.Terminal)) || [undefined])[0];
				return false // Remove the line;
			}
		}
	},
	setCuentasEnPesos: function(cuentas){
		var cuentasPesos = [];
		cuentas.forEach((element) => {
      		if(element.moneda === "$"){
			  	cuentasPesos.push(element);
			}
		});
		return cuentasPesos;
	},
	setNumeroCuentaFormateado: function (cuentas){
		cuentas.forEach((element,index) => {
			var numerosIniciales = element.n.slice(0,4);
			var numerosFinales = element.n.slice(-4);
			cuentas[index].n = numerosIniciales + "..." + numerosFinales;
		  });
		return cuentas;
	},
	parseConsultasRias: function(){
		var concat_ticket = {}
		var imprime = Vars.get("imprime") == true ? true : false ;
		var msg = Vars.get("trx_reply");
		Vars.remove("msg-ticket");
		Vars.remove("primera-consulta");
		//console.log("msg-ticket",msg)

		if(msg.includes("@@"))
            ticket = msg.substr(msg.indexOf("@@") + 6).split('').pop();
        else if(msg.includes("@?"))
            ticket = msg.substr(msg.indexOf("@?") + 7).split('').pop();
        else
            ticket = msg.split('').pop();

        //console.log("ticket",ticket)
        var rawlines = ticket.splitU();
        //console.log("rawlines: ",rawlines);
        if(rawlines.length >= 3 && concat_ticket.fecha == undefined){

            var direccion = rawlines[7].replace(/\s+/g, ' ').replace(/^ +/g, "")
            var saldo = rawlines[13].replace(/\s+/g, ' ').replace(/^ +/g, "")
            var disponible = rawlines[15].replace(/\s+/g, ' ').replace(/^ +/g, "")

            concat_ticket.fecha = rawlines[0].slice(3);
            concat_ticket.hora = rawlines[1];
            concat_ticket.cajero = rawlines[2].slice(0,8);
            concat_ticket.direccion = direccion
            concat_ticket.saldo = saldo
            concat_ticket.disponible = disponible
            
        }
        //console.log("concat_ticket",concat_ticket)

        Vars.set("comprobante", concat_ticket);
	},

	parseConsultasTc: function(stateData){
		var concat_ticket = {}
		var msg = Vars.get("trx_reply");
		Vars.remove("msg-ticket");
		Vars.remove("primera-consulta");
		//console.log("msg-ticket",msg)

		if(msg.includes("@@"))
            ticket = msg.substr(msg.indexOf("@@") + 6).split('').pop();
        else if(msg.includes("@?"))
            ticket = msg.substr(msg.indexOf("@?") + 7).split('').pop();
        else
            ticket = msg.split('').pop();

        //console.log("ticket",ticket)
        var rawlines = ticket.splitU();
        //console.log("rawlines: ",rawlines);
        if(rawlines.length >= 3 && concat_ticket.fecha == undefined){
            var direccion = rawlines[3].slice(-25
            	).replace(/\s+/g, ' ').replace(/^ +/g, "");
            var saldo = rawlines[13].slice(0,18).replace(/\s+/g, ' ').replace(/^ +/g, "");
            var disponible = rawlines[15].slice(0,18).replace(/\s+/g, ' ').replace(/^ +/g, "");

            concat_ticket.fecha = rawlines[0];
            concat_ticket.hora = rawlines[1];
            concat_ticket.cajero = rawlines[2].slice(0,8);
            concat_ticket.direccion = direccion
            concat_ticket.saldo = saldo
            concat_ticket.disponible = disponible
            
        }
        //console.log("concat_ticket",concat_ticket)

        Vars.set("comprobante", concat_ticket);

	},
	parseConsultas : function(stateData){
		Vars.set("imprime", false);

		var receiptdata = Vars.get("msg-ticket");
		Vars.remove("msg-ticket");
		Vars.remove("primera-consulta");

		if(receiptdata== undefined)
			return;
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
			var data  = parseTicketConsultas(obj.receipt[i]);
			data.fromHost = "----------------------";
			obj.receipt[i] 	= data;
		}

		var comprobante = Vars.get("comprobante");
		if(comprobante==undefined)
			comprobante = {};

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

		var regex = /^CBU: ([0-9]+)/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
		 	var tmp = obj.receipt[0].extra_data[i].match(regex);
		 
		 	if(tmp != undefined){
		 		comprobante.cbu = tmp[1];
		 	}
		 }

		var regex = /(?:^LIMITE DIARIO(?:\s)*)(\$(?:\s)*(?:[0-9]+)(?:(?:,|.)(?:[0-9]{2})))/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
			var tmp = obj.receipt[0].extra_data[i].match(regex);

			if(tmp != undefined){
				comprobante.limitecompra = tmp[1];
			}
		}

		var regex = /(?:^ACUM.COMPRA DIARIO(?:\s)*)(\$(?:\s)*(?:[0-9]+)(?:(?:,|.)(?:[0-9]{2})))/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
			var tmp = obj.receipt[0].extra_data[i].match(regex);

			if(tmp != undefined){
				comprobante.acumcompra = tmp[1];
			}
		}

		var regex = /(?:^LIMITE PAGO(?:\s)*((\$|U\$S)(?:\s)*(?:[0-9]+)(?:(?:,|.)(?:[0-9]{2}))))/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
			var tmp = obj.receipt[0].extra_data[i].match(regex);

			if(tmp != undefined){
				comprobante.limitepago = tmp[1];
			}
		}

		var regex = /(?:^DISPONIBLE PAGO(?:\s)*\(\*\)(?:\s)*((\$|U\$S)(?:\s)*(?:[0-9]+)(?:(?:,|.)(?:[0-9]{2}))))/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
			var tmp = obj.receipt[0].extra_data[i].match(regex);

			if(tmp != undefined){
				comprobante.disponiblepagos = tmp[1];
			}
		}

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
		
		obj.name = "banelcoTicketParser.html";

	},

	setConsultaSaldo : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas",[]);
		var cta_indice = Vars.get("cta_indice",0);
		Vars.set("indice_consulta", cta_indice)
		var opcode_pesos = {
			"true" : "ABA  C  ", //imprime ticket
			"false": "ABA  D  "  //no imprime ticket
		}
		var opcode_dolares = {
			"true" : "ABC  C  ", //imprime ticket
			"false": "ABC  D  "  //no imprime ticket
		}

		if(cta_indice != undefined){
			if(cuentas[cta_indice].t == "01" || cuentas[cta_indice].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[cta_indice].t;
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			if(cuentas[0].t == "01" || cuentas[0].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[0].t;
			stateData.properties.buffer_C = cuentas[0].n;
		}
		return stateData
    },

	setConsultaSaldoTc : function(stateData){
		var indice = Vars.get("cta_index",0);
		var idioma = Vars.get("idioma","ESP");

		var opcode = {
			"ESP" : [
				" A AA  A",
				" A AB  A",
				" A AC CA",
				" A AD CA"
			],
			"ENG" : [
				"        ",
				"   DB  B",
				"   DC CB",
				"   DD CB"
			],
			"POR" : [
				"        ",
				"   DB  C",
				"   DC CC",
				"   DD CC"
			],
		};

		stateData.properties.opcode  = opcode[idioma][indice];	
		// stateData.properties.buffer_B = tipo[indice];
		// stateData.properties.buffer_C = "0000000000000000000";
		return stateData
    },

    setConsultaSaldoRias:function(stateData){
    	var indice = Vars.get("cta_index",0);
    	var imprime = Vars.get("imprime") == true ? true : false ;
    	var opcode = {
    		"true":[
    			"   AB C ",
    			"   AC C ",
    			"   AH C ",
    			"   AG C "
    		],
    		"false":[
    			"   AB D ",
    			"   AC D ",
    			"   AH D ",
    			"   AG D "
    		]
    	}
				

		stateData.properties.opcode  = opcode[imprime][indice];
		return stateData
    },

    setConsultaSaldoLink : function(stateData){
		var indice = Vars.get("tipo_cta_link",0);

		var opcode_pesos = [
			"BCD     ",
			"BCC     ",
			"BCI     ",
		]
		var tipo = [
			"11",
			"01",
			"31",
		];
		stateData.properties.opcode  = opcode_pesos[indice];	
		stateData.properties.buffer_B = tipo[indice];
		stateData.properties.buffer_C = "0000000000000000000";
		return stateData
    },

	setConsultaSaldoAnses : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");
		var cta_indice = Vars.get("cta_indice");
		Vars.set("indice_consulta", cta_indice)

		var opcode_pesos = {
			"true" :"ABA  C  ",
			"false":"ABA  D  "
		}

		stateData.properties.opcode  = opcode_pesos[imprime];	
		stateData.properties.buffer_B = "11";

		if (cuentas != undefined && cta_indice != undefined){
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			stateData.properties.buffer_C = "0000000000000000000";
		}
		return stateData
    },

    setConsultaCBU : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");
		var cta_indice = Vars.get("cta_indice");
 		Vars.set("indice_consulta", cta_indice)

		var opcode_pesos = {
			"true" : "ABB  C  ", //imprime ticket
			"false": "ABB  D  "  //no imprime ticket
		}
		var opcode_dolares = {
			"true" : "ACA  C  ", //imprime ticket
			"false": "ACA  D  "  //no imprime ticket
		}

		if(cta_indice != undefined){
			if(cuentas[cta_indice].t.slice(-1) == "1" ){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[cta_indice].t;
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			if(cuentas[0].t.slice(-1) == "1" ){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[0].t;
			stateData.properties.buffer_C = cuentas[0].n;
		}
		return stateData
    },

    setConsultaCBUAnses : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
 
		var opcode_pesos = {
			"true" :"ABB  C  ", //imprime ticket
			"false":"ABB  D  "  //no imprime ticket
		}

		stateData.properties.opcode  = opcode_pesos[imprime];
		stateData.properties.buffer_B = "11";
		stateData.properties.buffer_C = "0000000000000000000";
		return stateData
    },

	setConsultaUMov : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");
		var cta_indice = Vars.get("cta_indice");
		Vars.set("indice_consulta", cta_indice)

		var opcode_pesos = {
			"true" : "BDC     ", //imprime ticket
			"false": "BDC     "  //no imprime ticket
		}
		var opcode_dolares = {
			"true" : "BDG     ", //imprime ticket
			"false": "BDG     "  //no imprime ticket
		}

		if(cta_indice != undefined){
			if(cuentas[cta_indice].t == "01" || cuentas[cta_indice].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[cta_indice].t;
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			if(cuentas[0].t == "01" || cuentas[0].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[0].t;
			stateData.properties.buffer_C = cuentas[0].n;
		}
		return stateData
		//console.log("el opcode");
		//console.log(stateData.properties.opcode);
    },


    setConsultaUMovAnses : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;

		var opcode_pesos = {
			"true" :"BDC     ", //imprime ticket
			"false":"BDC     "  //no imprime ticket
		}

		stateData.properties.opcode  = opcode_pesos[imprime];
		stateData.properties.buffer_B = "11";
		stateData.properties.buffer_C = "0000000000000000000";
		return stateData
		//console.log("el opcode");
		//console.log(stateData.properties.opcode);
    },

	setConsultaUMovMas : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");
		var cta_indice = Vars.get("cta_indice");
		Vars.set("indice_consulta", cta_indice)

		var opcode_pesos = {
			"true" : "BDC  C  ", //imprime ticket
			"false": "BDC  C  "  //no imprime ticket
		}
		var opcode_dolares = {
			"true" : "BDG  C  ", //imprime ticket
			"false": "BDG  C  "  //no imprime ticket
		}

		if(cta_indice != undefined){
			if(cuentas[cta_indice].t == "01" || cuentas[cta_indice].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[cta_indice].t;
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			if(cuentas[0].t == "01" || cuentas[0].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[0].t;
			stateData.properties.buffer_C = cuentas[0].n;
		}
		return stateData
		//console.log("el opcode");
		//console.log(stateData.properties.opcode);
    },

    setConsultaUMovMasAnses : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");

		var opcode_pesos = {
			"true" : "BDC  C  ", //imprime ticket
			"false": "BDC  D  "  //no imprime ticket
		}

		stateData.properties.opcode  = opcode_pesos[imprime];
		stateData.properties.buffer_B = "11";
		stateData.properties.buffer_C = "0000000000000000000";
		return stateData
    },

    setConsultaLimitePagos : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");
		var cta_indice = Vars.get("cta_indice",0);
		Vars.set("indice_consulta", cta_indice)
		var tipo_menu = Vars.get("tipo_menu")
		var opcode_anses = {
			"true" : "BID D   ", //imprime ticket
			"false": "BID C   "  //no imprime ticket
		}

		var opcode_pesos = {
			"01" : {
				"true" : "BIC D   ", //imprime ticket
				"false": "BIC C   "  //no imprime ticket
			},
			"02" : {
				"true" : "BIB D   ", //imprime ticket
				"false": "BIB C   "  //no imprime ticket
			},
			"11" : {
				"true" : "BID D   ", //imprime ticket
				"false": "BID C   "  //no imprime ticket
			},
			"12" : {
				"true" : "BIG D   ", //imprime ticket
				"false": "BIG C   "  //no imprime ticket
			},
			"21" :{//CUENTA ESPECIAL
				"true" : "BIA D   ", //imprime ticket
				"false": "BIA C   "  //no imprime ticket
			},
			"22" :{//CUENTA ESPECIAL
				"true" : "BII D   ", //imprime ticket
				"false": "BII C   "  //no imprime ticket
			},
		};

		if(tipo_menu == "ANSES"){
			stateData.properties.opcode  = opcode_anses[imprime];
			stateData.properties.buffer_B = "11";
			stateData.properties.buffer_C = "0000000000000000000";
		} else{
			stateData.properties.opcode  = opcode_pesos[cuentas[cta_indice].t][imprime];
			stateData.properties.buffer_B = cuentas[cta_indice].t;
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		}
		return stateData
    },

    setConsultaLimiteCompras : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas");

		var opcode_pesos = {
			"true" : "BI  C   ", //imprime ticket
			"false": "BI  D   "  //no imprime ticket
		}

		stateData.properties.opcode  = opcode_pesos[imprime];
		stateData.properties.buffer_B = "11";
		stateData.properties.buffer_C = "0000000000000000000";
		return stateData
    },

	procesar_saldo : function(){
	    
	    var btn_saldos = $("#btn-saldo"); 
	    var btn_umov = $("#btn-umov"); 
	    var btn_cbu = $("#btn-cbu"); 

	    btn_saldos.addClass("selected");
		if(CheckDevice.CheckHabilitado("ticket_usuario")){
		    btn_umov.removeClass("selected");
		    btn_cbu.removeClass("selected");
		}
	},

	procesar_umov : function(){
    
	    var btn_saldos = $("#btn-saldo"); 
	    var btn_umov = $("#btn-umov"); 
	    var btn_cbu = $("#btn-cbu"); 

        btn_saldos.removeClass("selected");
        btn_umov.addClass("selected");
        btn_cbu.removeClass("selected");
	},

	procesar_cbu : function(){
	    
	    var btn_saldos = $("#btn-saldo"); 
	    var btn_umov = $("#btn-umov"); 
	    var btn_cbu = $("#btn-cbu"); 

        btn_saldos.removeClass("selected");
        btn_umov.removeClass("selected");
        btn_cbu.addClass("selected");
	},

	loadConsultaSaldo: function(){

	    var ticket = Vars.get("comprobante");
	    var saldo = $("#saldo-valor");
	    var disponible = $("#disp-valor");
	    var cuentas = Vars.get("cuentas");
	    var indice = Vars.get("cta_consulta",0);
	    var indice_consulta = Vars.get("indice_consulta");
	    var btn_imprimir =  $("#imprimir_saldo");
	    var tipo_menu = Vars.get("tipo_menu")
	    var consulta_actual = Vars.get("consulta-actual","saldo")

	    //console.log("loadTicket",ticket);

	    if(tipo_menu == "ANSES" ||  tipo_menu == "TC" || tipo_menu == "RIAS" ){
	        if(consulta_actual == "saldo"){

	            if(ticket != undefined && ticket.saldo != undefined){
	                saldo.html(ticket.saldo.replace(/\s+/g, ' '));
	                disponible.html(ticket.disponible.replace(/\s+/g, ' '));
	                Vars.set("saldo", saldo.html())
	                Vars.set("disponible", disponible.html())
					$('#bt_saldos').css('display', 'none');
        			saldo.parent().fadeIn();
        			disponible.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                saldo.html("Sin informacion!");
	                disponible.html("Sin informacion!");
	            }
	        }else{

	            var saldo_anses = Vars.get("saldo");
	            var dispo_anses = Vars.get("disponible");

	            if(saldo_anses != undefined && dispo_anses != undefined){                
	                saldo.html(saldo_anses);
	                disponible.html(dispo_anses);
					$('#bt_saldos').css('display', 'none');
        			saldo.parent().fadeIn();
        			disponible.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                saldo.html("Sin informacion!");
	                disponible.html("Sin informacion!");
	            }

	        }

	    } else {

	        if(cuentas != undefined){

	            if(indice_consulta == indice && cuentas[indice].saldo == undefined && ticket != undefined && ticket.saldo != undefined){
	                saldo.html(ticket.saldo.replace(/\s+/g, ' '));
	                cuentas[indice].saldo = saldo.html();
	                disponible.html(ticket.disponible.replace(/\s+/g, ' '));
	                cuentas[indice].disponible = disponible.html();
	                Vars.set("cuentas", cuentas);
					$('#bt_saldos').css('display', 'none');
        			saldo.parent().fadeIn();
        			disponible.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {

		                if(cuentas[indice].saldo != undefined && cuentas[indice].disponible != undefined){
		                    saldo.html(cuentas[indice].saldo);
		                    disponible.html(cuentas[indice].disponible);
							$('#bt_saldos').css('display', 'none');
		        			saldo.parent().fadeIn();
		        			disponible.parent().fadeIn();
		        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
		        				btn_imprimir.fadeIn();
		                } else {
		                    saldo.html("Sin informacion!");
		                    disponible.html("Sin informacion!");
		                }

	            }
	        }
	    }
	},

	loadConsultaLimitesPagos: function(){
	    var ticket = Vars.get("comprobante");
	    var limite_pagos = $("#limite_pagos");
	    var disponible_pagos = $("#disponible_pagos");
	    var disponible_pagos = $("#disponible_pagos");
	    var cuentas = Vars.get("cuentas");
	    var indice = Vars.get("cta_indice");
	    var btn_imprimir =  $("#imprimir_limit_pag");

	    if(Vars.get("tipo_menu") == "ANSES"){
	        if(Vars.get("consulta-actual") == "limite_pagos"){

	            if(ticket != undefined && ticket.limitepago != undefined && ticket.disponiblepagos != undefined){
	                limite_pagos.html(ticket.limitepago.replace(/\s+/g, ' '));
	                disponible_pagos.html(ticket.disponiblepagos.replace(/\s+/g, ' '));
	                Vars.set("limite_pagos", limite_pagos.html());
	                Vars.set("disponible_pagos", disponible_pagos.html());
					$('#bt_limpagos').css('display', 'none');
        			limite_pagos.parent().fadeIn();
        			disponible_pagos.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                limite_pagos.html("Sin informacion!");
	                disponible_pagos.html("Sin informacion!");
	            }
	        }else{
	            var saldo_pagos_old = Vars.get("saldo_pagos");
	            var dispo_pagos_old = Vars.get("disponible_pagos");
	            if(saldo_pagos_old != undefined && dispo_pagos_old != undefined){                
	                limite_pagos.html(saldo_pagos_old);
	                disponible_pagos.html(dispo_pagos_old);
					$('#bt_limpagos').css('display', 'none');
        			limite_pagos.parent().fadeIn();
        			disponible_pagos.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                limite_pagos.html("Sin informacion!");
	                disponible_pagos.html("Sin informacion!");
	            }
	        }

	    } else {

	        if(cuentas != undefined){

	            if(cuentas[indice].limite_pagos == undefined && ticket != undefined && ticket.limitepago != undefined ){
	                limite_pagos.html(ticket.limitepago.replace(/\s+/g, ' '));
	                cuentas[indice].limite_pagos = limite_pagos.html();
	                disponible_pagos.html(ticket.disponiblepagos.replace(/\s+/g, ' '));
	                cuentas[indice].disponible_pagos = disponible_pagos.html();
	                Vars.set("cuentas", cuentas);
					$('#bt_limpagos').css('display', 'none');
        			limite_pagos.parent().fadeIn();
        			disponible_pagos.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                if(cuentas[indice].limite_pagos != undefined && cuentas[indice].disponible_pagos != undefined){
	                    limite_pagos.html(cuentas[indice].limite_pagos);
	                    disponible_pagos.html(cuentas[indice].disponible_pagos);
						$('#bt_limpagos').css('display', 'none');
	        			limite_pagos.parent().fadeIn();
	        			disponible_pagos.parent().fadeIn();
	        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
	        				btn_imprimir.fadeIn();
	                } else {
	                    limite_pagos.html("Sin informacion!");
	                    disponible_pagos.html("Sin informacion!");
	                }
	            }
	        }
	    }
	},


	loadConsultaLimitesCompra: function(){
	    var ticket = Vars.get("comprobante");
	    var limite_compra = $("#limite_compra");
	    var disponible_compra = $("#disponible_compra");
	    var cuentas = Vars.get("cuentas");
	    var indice = Vars.get("cta_indice");
	    var btn_imprimir =  $("#imprimir_limit_com");

	    if(Vars.get("tipo_menu") == "ANSES"){
	        if(Vars.get("consulta-actual") == "limite_compra"){

	            if(ticket != undefined && ticket.limitecompra != undefined && ticket.acumcompra != undefined){
	                limite_compra.html(ticket.limitecompra.replace(/\s+/g, ' '));
	                disponible_compra.html(ticket.acumcompra.replace(/\s+/g, ' '));
	                Vars.set("limite_compra", limite_compra.html());
	                Vars.set("disponible_compra", disponible_compra.html());
					$('#bt_limcompras').css('display', 'none');
        			limite_compra.parent().fadeIn();
        			disponible_compra.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                limite_compra.html("Sin informacion!");
	                disponible_compra.html("Sin informacion!");
	            }
	        }else{
	            var saldo_compra_old = Vars.get("saldo_compra");
	            var dispo_compra_old = Vars.get("disponible_compra");
	            if(saldo_compra_old != undefined && dispo_compra_old != undefined){                
	                limite_compra.html(saldo_compra_old);
	                disponible_compra.html(dispo_compra_old);
					$('#bt_limcompras').css('display', 'none');
        			limite_compra.parent().fadeIn();
        			disponible_compra.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                limite_compra.html("Sin informacion");
	                disponible_compra.html("Sin informacion!");
	            }
	        }

	    } else {

	        if(cuentas != undefined){

	            if(cuentas[indice].limite_compra == undefined && ticket != undefined && ticket.limitecompra != undefined){
	                limite_compra.html(ticket.limitecompra.replace(/\s+/g, ' '));
	                cuentas[indice].limite_compra = limite_compra.html();
	                // for (var i = cuentas.length - 1; i >= 0; i--) {
	                // 	cuentas[i].limite_compra = limite_compra.html()
	                // }
	                disponible_compra.html(ticket.acumcompra.replace(/\s+/g, ' '));
	                cuentas[indice].disponible_compra = disponible_compra.html();
	                Vars.set("cuentas", cuentas);
					$('#bt_limcompras').css('display', 'none');
        			limite_compra.parent().fadeIn();
        			disponible_compra.parent().fadeIn();
        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
        				btn_imprimir.fadeIn();
	            } else {
	                if(cuentas[indice].limite_compra != undefined && cuentas[indice].disponible_compra != undefined){
	                    limite_compra.html(cuentas[indice].limite_compra);
	                    disponible_compra.html(cuentas[indice].disponible_compra);
						$('#bt_limcompras').css('display', 'none');
	        			limite_compra.parent().fadeIn();
	        			disponible_compra.parent().fadeIn();
	        			if(CheckDevice.CheckHabilitado("ticket_usuario"))
	        				btn_imprimir.fadeIn();
	                } else {
	                    limite_compra.html("Sin informacion!");
	                    disponible_compra.html("Sin informacion!");
	                }
	            }
	        }
	    }
	},



	switchConsultaSaldo :function(data){
		var menu = Vars.get("tipo_menu")
		switch(menu) {
		    case "BANELCO":
		    	Consultas.setConsultaSaldo(data);
		    	break
		    case "JUBILADOS":
		    	Consultas.setConsultaSaldo(data);
		    	break
		    case "TC":
		    	Consultas.setConsultaSaldoTc(data);
				break
		    case "ANSES":
		    	Consultas.setConsultaSaldoAnses(data)
		    	break
		    case "LINK":
		    	Consultas.setConsultaSaldoLink(data)
		    	break
		     case "RIAS":
		    	Consultas.setConsultaSaldoRias(data)
		    	break
		    default:
		    	//console.log('next screen not defined')
		    	break
		}
		return data
	},

	switchParserConsulta :function(data){
		var menu = Vars.get("tipo_menu")
		switch(menu) {
		    case "BANELCO":
		    	Consultas.parseConsultas();
		    	break
		    case "JUBILADOS":
		    	Consultas.parseConsultas();
		    	break
		    case "TC":
		    	Consultas.parseConsultasTc();
				break
		    case "ANSES":
		    	Consultas.parseConsultas();
		    	break
		    case "LINK":
		    	Consultas.parseConsultas();
		    	break
		     case "RIAS":
		    	Consultas.parseConsultasRias();
		    	break
		    default:
		    	//console.log('next screen not defined')
		    	break
		}
		return data
	}
}

module.exports = Consultas;