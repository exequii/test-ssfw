function parseTicket(ticket){

	var patterns = {
		"reg" : [
 			{	
 				"name" : "FECHA",
 				"regexp" : /[0-9]{2}\/[0-9]{2}\/[0-9]{2}/
 			},
 			{
 
 				"name" : "HORA",
 				"regexp"  : /[0-9]{2}:[0-9]{2}/
 			},
 			{
 				"name" : "CAJERO",
 				"regexp" : /S1.*/
 			},
 			{
 				"name" : "SUCURSAL",
 				"regexp" : /<.*>|\[.*\]/
 			},
 			{
 				"name" : "ADVERTENCIA",
 				"regexp" : /\*\*[^\*]*\*\*/
 			},
 			// {
 			// 	"name" : "CHEQUES_IMGS",
 			// 	"regexp" : /p[0-9]{8}/g
 			// },
 			// {
 			// 	"name" : "PAGINA",
 			// 	"regexp" : /[0-9]\/[0-9]/

 			// }
 		],
 		"pegados" : [ 
 			// {
 			// 	"name" : "DNI",
 			// 	"reg" : "DNI",
 			// 	"linesNext" : 1
 			// }, 	 			
 			// {
 			// 	"name" : "IMPORTE CONFORMADO",
 			// 	"reg" : "IMPORTE CONFORMADO",
 			// 	"linesNext" : 1
 			// }, 
 			// {
 			// 	"name" : "IMPORTE",
 			// 	"reg" : "IMPORTE",
 			// 	"linesNext" : 1
 			// }, 
 			{
 				"name" : "SALDO",
 				"reg" : "^SU SALDO ES",
 				"linesNext" : 1
 			}, 
			{
 				"name" : "DISPONIBLE",
 				"reg" : "DISPONIBLE",
				"linesNext" : 1
 			}, 
			// {
			// 	"name" : "SU SALDO ES [(][*][)]",
			// 	"reg" : "SU SALDO ES [(][*][)]",
			// 	"linesNext" : 1
			// },
			// {
			// 	"name" : "CANT. DE CHEQUES", 
			// 	"reg" : "CANT. DE CHEQUES", 
			// 	"linesNext" : 2
			// }
		],

 		"sameLine" : ["DOMICILIO"],
 		"sameLine" : ["DOMICILIO" ,"NRO"],
 		// "abajo" : [ "TARJETA", "NRO.DE TRANS."],
 	// 	"operations" : [ 
		// 	{
		// 		"name" : "DEPOSITO",
		// 		"lines" : 4
		// 	},
		// 	{
		// 		"name" : "PAGO",
		// 		"lines" : 1
		// 	},
		// 	{
		// 		"name" : "EXTRACCION",
		// 		"lines" : 2
		// 	} 
		// ]
	}

	var stopwords = [":", "$", "\\." ];

	//var ticket = {"lines":["26/01/16\u000e911:18\u000e:S1JRI000","","DOMICILIO: MEXICO 444 2 PISO        ","<072>","NUMERO DE TARJETA\u000e:NRO.DE TRANS.","","XXXXXXXXXXXXXXXXXXX\u000e< 500","","DEPOSITO EN CTA. CTE. EN PESOS     ","","EFECTIVO            ","","EN CUENTA NRO. 03641730           ","                                                                ","","IMPORTE\u000e? $           10.00","","S.E.U.O.","REG GAR PTO 6 OPASI 2 IX - BCRA","\f"],"name":"banelcoTicket"};
	//var ticket = {"lines":["29/02/16\u000e915:31\u000e:S1JRI000","","DOMICILIO: MEXICO 444 2 PISO        ","<072>","NUMERO DE TARJETA\u000e:NRO.DE TRANS.","XXXXXXXXXXXXXX0001-001\u000e;9702","DEPOSITO EN CTA. CTE. EN PESOS     ","CHEQUES             ","EN CUENTA NRO.03641730           ","","CANT. DE CHEQUES:\u000e8\u000e<  1","IMPORTE\u000e? $           80.00","","S.E.U.O. - **OPERACION A CONFIRMAR**","REG GAR PTO 6 OPASI 2 IX - BCRA","SUJETO A VALIDACION. DESPUES DE","LAS 15 HS. Y/O DIA INHABIL","BANCARIO SERA CONSIDERADO","EL DIA HABIL BANCARIO SIGUIENTE","<div class=\"fila \"><img class=\"img-cheque\" src=\"file:\\\\\\C:\\xfs\\cheque0.bmp\"></div>","\u000e?\u000e41/1"],"name":"banelcoTicket"};
	var data = { "extra_data" : []};
	var usedLines = [];
	for(var line in ticket.lines){
		ticket.lines[line] = ticket.lines[line].replace("(>", "<b>")
		ticket.lines[line] = ticket.lines[line].replace("(1", "</b>")
	}	
	var newLines = []
	for(var line in ticket.lines){
		if (ticket.lines[line] != "")
			newLines.push(ticket.lines[line]);
		
	}
	ticket.lines = newLines;

	for(var line in ticket.lines){
		var strLine = ticket.lines[line];
		
		var rx  = /./
		var separations = strLine.split(rx);
		
		for(var i in separations){
			var texto = separations[i];
			var found = false;
			for (var index in patterns["reg"]){
				var obj = patterns["reg"][index];

				if ( texto.match(obj["regexp"]) != null ){
					var result = texto.match(obj["regexp"]);
					data[obj["name"]] = result[0];
					if (result.length > 1)
						data[obj["name"]] = result;
					patterns["reg"].splice(index, 1);
					found = true;
					break;
				}
			}
			if (found)
				continue;
			
			for (var index in patterns["pegados"]){
				if ( texto.match(patterns["pegados"][index].reg) != null ){

					var text = separations[parseInt(i) + patterns["pegados"][index].linesNext];
					data[patterns["pegados"][index].name] = (text != undefined) ? text : "";
					//patterns["pegados"].splice(index, 1);
					usedLines.push(parseInt(line));
					found = true;
					break;
				}	
			}

			if (found)
				continue;


			var reg = /^NUMERO DE TARJETA$/
			if ( texto.match(reg) != null ){
				if (ticket.lines[parseInt(line)+1] != undefined){
					
					var sep = ticket.lines[parseInt(line)+1].split(rx);
					data["TARJETA"] = sep[i];
				}
			}	
			reg = /^NRO.DE TRANS.$/
			if ( texto.match(reg) != null ){
				if (ticket.lines[parseInt(line)+1] != undefined){
					
					var sep = ticket.lines[parseInt(line)+1].split(rx);
					data["TRANS"] = sep[i];

					if(Vars.get("tipo_menu") == "RIAS"){
						var sep = ticket.lines[parseInt(line)].split(".").pop();
						data["TRANS"] = sep.slice(2);
					}
				}
			}	
			
			if (found)
				continue;
			
			for (var index in patterns["sameLine"]) {
				if ( texto.indexOf( patterns["sameLine"][index]) > -1 ){
					var aux = texto.slice(texto.indexOf( patterns["sameLine"][index]))
					for (var k = 0; k < stopwords.length ; k++) {
						var re = new RegExp(stopwords[k]);
						var nSeparations = aux.split(re);
						
						if (nSeparations.length > 1){
							data[patterns["sameLine"][index]] = nSeparations[1];
							found = true;
							break;
						}
					}

				}	
			}
			if (found)
				continue;

			// for (var index in patterns["operations"]){
			// 	if ( texto.match(patterns["operations"][index].name) != null ){
			// 		var description = [];
			// 		for(var c = 0; c < patterns["operations"][index].lines; c ++){
			// 			description.push (ticket.lines[parseInt(line)+c]);
			// 			usedLines.push(parseInt(line)+c);
			// 		}
			// 		data["OPERACION"] = patterns["operations"][index].name;
			// 		data["DESCRIPCION_OPERACION"] = description;
			// 		patterns["operations"].splice(index, 1);
			// 		found = true;
			// 		break;
			// 	}	
			// }
			if (found)
				continue;

			if ($.inArray( parseInt(line), usedLines ) < 0){
				data["extra_data"].push(texto);
			}

		} 
	}
	
	// //Fix por error con tarjeta que no muestra nombre
	// if (data.TARJETA != undefined && Vars.get("tipo_deposito_state") == "cheque"){
	// 	if ( !(data.TARJETA.indexOf("---") > -1 )){
	// 		if(data.DESCRIPCION_OPERACION != undefined){
	// 			data.DESCRIPCION_OPERACION.pop();
	// 		}
	// 	}
	// }
  

	if(data.extra_data!= undefined ){
		//console.log("1-----" + data.extra_data);
		if ( (data.extra_data.indexOf(" (*)") > -1 )){
		    data.extra_data.splice(data.extra_data.indexOf(" (*)"), 1);;
		}
	}
	return data;
}




function parseTicketConsultas(ticket){

	var patterns = {
		"reg" : [
 			{	
 				"name" : "FECHA",
 				"regexp" : /[0-9]{2}\/[0-9]{2}\/[0-9]{2}/
 			},
 			{
 
 				"name" : "HORA",
 				"regexp"  : /[0-9]{2}:[0-9]{2}/
 			},
 			{
 				"name" : "CAJERO",
 				"regexp" : /S1.*/
 			},
 			{
 				"name" : "SUCURSAL",
 				"regexp" : /<.*>|\[.*\]/
 			},
 			{
 				"name" : "ADVERTENCIA",
 				"regexp" : /\*\*[^\*]*\*\*/
 			},
 			// {
 			// 	"name" : "CHEQUES_IMGS",
 			// 	"regexp" : /p[0-9]{8}/g
 			// },
 			// {
 			// 	"name" : "PAGINA",
 			// 	"regexp" : /[0-9]\/[0-9]/

 			// }
 		],
 		"pegados" : [ 
 			// {
 			// 	"name" : "DNI",
 			// 	"reg" : "DNI",
 			// 	"linesNext" : 1
 			// }, 	 			
 			// {
 			// 	"name" : "IMPORTE CONFORMADO",
 			// 	"reg" : "IMPORTE CONFORMADO",
 			// 	"linesNext" : 1
 			// }, 
 			// {
 			// 	"name" : "IMPORTE",
 			// 	"reg" : "IMPORTE",
 			// 	"linesNext" : 1
 			// }, 
 			{
 				"name" : "SALDO",
 				"reg" : "^SU SALDO ES",
 				"linesNext" : 1
 			}, 
			{
 				"name" : "DISPONIBLE",
 				"reg" : "^DISPONIBLE $",
				"linesNext" : 1
 			},  
			// {
			// 	"name" : "SU SALDO ES [(][*][)]",
			// 	"reg" : "SU SALDO ES [(][*][)]",
			// 	"linesNext" : 1
			// },
			// {
			// 	"name" : "CANT. DE CHEQUES", 
			// 	"reg" : "CANT. DE CHEQUES", 
			// 	"linesNext" : 2
			// }
		],

 		"sameLine" : ["DOMICILIO"],
 		// "sameLine" : ["DOMICILIO" ,"NRO"],
 		"abajo" : [ "TARJETA", "TRANS","TRANS.NUMBER"],
 	// 	"operations" : [ 
		// 	// {
		// 	// 	"name" : "DEPOSITO",
		// 	// 	"lines" : 4
		// 	// },
		// 	// {
		// 	// 	"name" : "PAGO",
		// 	// 	"lines" : 1
		// 	// },
		// 	{
		// 		"name" : "EXTRACCION",
		// 		"lines" : 2
		// 	},
		// 	{
		// 		"name" : "CONS.DE SALDO",
		// 		"lines" : 2
		// 	},
		// 	{
		// 		"name" : "CONSULTA DE CBU",
		// 		"lines" : 2
		// 	},
		// ]
	}

	if(Vars.get("tipo_menu")=="LINK"){
		var patterns = {
			"reg" : [
	 			{	
	 				"name" : "FECHA",
	 				"regexp" : /[0-9]{2}\/[0-9]{2}\/[0-9]{2}/
	 			},
	 			{
	 
	 				"name" : "HORA",
	 				"regexp"  : /[0-9]{2}:[0-9]{2}/
	 			},
	 			{
	 				"name" : "CAJERO",
	 				"regexp" : /S1.*/
	 			},
	 			{
	 				"name" : "SUCURSAL",
	 				"regexp" : /<.*>|\[.*\]/
	 			},
	 			{
	 				"name" : "ADVERTENCIA",
	 				"regexp" : /\*\*[^\*]*\*\*/
	 			},
	 		],
	 		"pegados" : [ 
 

			],

	 		"sameLine" : ["DOMICILIO","LOCALIZACAO","LOCATION"],
	 		"abajo" : [ "TARJETA", "TRANS"],
		}

	}

	var stopwords = [":", "$", "\\." ];

	var data = { "extra_data" : []};
	var usedLines = [];
	for(var line in ticket.lines){
		ticket.lines[line] = ticket.lines[line].replace("(>", "<b>")
		ticket.lines[line] = ticket.lines[line].replace("(1", "</b>")
	}	
	var newLines = []
	for(var line in ticket.lines){
		if (ticket.lines[line] != "")
			newLines.push(ticket.lines[line]);
		
	}
	ticket.lines = newLines;

	for(var line in ticket.lines){
		var strLine = ticket.lines[line];
		
		var rx  = /./
		var separations = strLine.split(rx);
		
		for(var i in separations){
			var texto = separations[i];
			var found = false;
			for (var index in patterns["reg"]){
				var obj = patterns["reg"][index];

				if ( texto.match(obj["regexp"]) != null ){
					var result = texto.match(obj["regexp"]);
					data[obj["name"]] = result[0];
					if (result.length > 1)
						data[obj["name"]] = result;
					patterns["reg"].splice(index, 1);
					found = true;
					break;
				}
			}
			if (found)
				continue;
			
			for (var index in patterns["pegados"]){
				if ( texto.match(patterns["pegados"][index].reg) != null ){

					var text = separations[parseInt(i) + patterns["pegados"][index].linesNext];
					data[patterns["pegados"][index].name] = (text != undefined) ? text : "";
					//patterns["pegados"].splice(index, 1);
					usedLines.push(parseInt(line));
					found = true;
					break;
				}	
			}

			if (found)
				continue;

			var reg = /^NUMERO DE TARJETA$/
			if ( texto.match(reg) != null ){
				if (ticket.lines[parseInt(line)+1] != undefined){
					
					var sep = ticket.lines[parseInt(line)+1].split(rx);
					data["TARJETA"] = sep[i];
				}
			}	
			reg = /^NRO.DE TRANS.$/
			if ( texto.match(reg) != null ){
				if (ticket.lines[parseInt(line)+1] != undefined){
					
					var sep = ticket.lines[parseInt(line)+1].split(rx);
					data["TRANS"] = sep[i];

					if(Vars.get("tipo_menu") == "RIAS"){
						var sep = ticket.lines[parseInt(line)].split(".").pop();
						data["TRANS"] = sep.slice(2);
					}
				}
			}	
			
			if (found)
				continue;
			
			for (var index in patterns["sameLine"]) {
				if ( texto.indexOf( patterns["sameLine"][index]) > -1 ){
					var aux = texto.slice(texto.indexOf( patterns["sameLine"][index]))
					for (var k = 0; k < stopwords.length ; k++) {
						var re = new RegExp(stopwords[k]);
						var nSeparations = aux.split(re);
						
						if (nSeparations.length > 1){
							data[patterns["sameLine"][index]] = nSeparations[1];
							found = true;
							break;
						}
					}

				}	
			}
			if (found)
				continue;


			if(Vars.get("tipo_menu")=="LINK"){
				reg = /^DINERO DISPONIBLE.*(\$[ 0-9\.\,]+)/
				var ex = texto.match(reg);
				if ( ex != null ){
					//console.log("ENCONTRE : "+ex[1])
					data["DISPONIBLE"] = ex[1];
				}
			}

			if(Vars.get("tipo_menu")=="LINK"){
				reg = /^SU SALDO \(S\.E\.U\.O\.\).*(\$[ 0-9\.\,]+)/
				var ex = texto.match(reg);
				if ( ex != null ){
					//console.log("ENCONTRE : "+ex[1])
					data["SALDO"] = ex[1];
				}
			}

			if(Vars.get("tipo_menu")=="LINK"){
				reg = /^INTERESES GANADOS.*(\$[ 0-9\.\,]+)/
				var ex = texto.match(reg);
				if ( ex != null ){
					//console.log("ENCONTRE : "+ex[1])
					data["INTERESES"] = ex[1];
				}
			}

			// for (var index in patterns["operations"]){
			// 	if ( texto.match(patterns["operations"][index].name) != null ){
			// 		var description = [];
			// 		for(var c = 0; c < patterns["operations"][index].lines; c ++){
			// 			description.push (ticket.lines[parseInt(line)+c]);
			// 			usedLines.push(parseInt(line)+c);
			// 		}
			// 		data["OPERACION"] = patterns["operations"][index].name;
			// 		data["DESCRIPCION_OPERACION"] = description;
			// 		patterns["operations"].splice(index, 1);
			// 		found = true;
			// 		break;
			// 	}	
			// }
			if (found)
				continue;

			if ($.inArray( parseInt(line), usedLines ) < 0){
				data["extra_data"].push(texto);
			}

		} 
	}
	
	// //Fix por error con tarjeta que no muestra nombre
	// if (data.TARJETA != undefined && Vars.get("tipo_deposito_state") == "cheque"){
	// 	if ( !(data.TARJETA.indexOf("---") > -1 )){
	// 		if(data.DESCRIPCION_OPERACION != undefined){
	// 			data.DESCRIPCION_OPERACION.pop();
	// 		}
	// 	}
	// }
  

	if(data.extra_data!= undefined ){
		//console.log("1-----" + data.extra_data);
		if ( (data.extra_data.indexOf(" (*)") > -1 )){
		    data.extra_data.splice(data.extra_data.indexOf(" (*)"), 1);;
		}
	}
	return data;
}


function parseNewTicket(ticket){
	    var ticket = ticket.split('').pop()
	    ////console.log(ticket)
        encabezado= ticket.split('')
        ////console.log(encabezado)
        ticket=encabezado[2].slice(9)
        ////console.log(ticket)
        ticket=ticket.match(/.{1,40}/g)
        ////console.log(ticket)
        var old_ticket=Vars.get("new_ticket")
        array=[]
        for (var i in ticket){
        	array.push(ticket[i].replace(/\s/g,"&nbsp;"))
        }
       	var newObject={}
        newObject.fecha=encabezado[0].slice(3)
        newObject.hora=encabezado[1].slice(1)
        newObject.cajero=encabezado[2].slice(1,9)
        newObject.ticket= old_ticket != undefined ? old_ticket.ticket.concat(array) : array
        if(Vars.get("info_cajero").fiid != undefined){
        	newObject.fiid= Vars.get("info_cajero").fiid;
        } 
        Vars.set('new_ticket',newObject)
        Vars.set('comprobante',newObject)
        //console.log(newObject)
}


function parseUMOV(ticket){
	var ticket = ticket.split('').pop()
    //console.log(ticket)
    encabezado= ticket.split('')
    //console.log(encabezado)
    if(encabezado.length == 1){
        ticket = encabezado[0]
    }else{
        ticket = encabezado[4].slice(70)
    }
    //console.log(ticket)
    ticket=ticket.match(/.{1,30}/g)
    //console.log(ticket)
    var old_ticket=Vars.get("new_ticket")
    array=[]
    for (var i in ticket){
        array.push(ticket[i]/*.replace(/\s/g,"&nbsp;")*/)
    }
    var newObject={}
    newObject.fecha = encabezado[0].slice(3)
    newObject.hora = encabezado[1].slice(1)
    newObject.cajero = encabezado[2].slice(1,9)
    newObject.tarjeta = encabezado[3].slice(14)
    newObject.trans = encabezado[4].slice(1,5)
    newObject.titulo = encabezado[4].slice(40,70)
    newObject.ticket= old_ticket != undefined ? old_ticket.ticket.concat(array) : array
    //newObject.fiid= Vars.get("info_cajero").fiid;
    if(Vars.get("info_cajero").fiid != undefined){
        	newObject.fiid= Vars.get("info_cajero").fiid;
        } 
    Vars.set('new_ticket',newObject)
    Vars.set('comprobante',newObject)
    //console.log(newObject)

}


function parseTransf(msg){
	var concat_ticket = Vars.get("concat-ticket") || {};
	////console.log("concat-ticket: ",concat_ticket);
	//console.error("ticket crudo: ",msg);
	var ticket = null;
	if(msg.includes("@@"))
		ticket = msg.substr(msg.indexOf("@@") + 6).split('').pop();
	else if(msg.includes("@?"))
		ticket = msg.substr(msg.indexOf("@?") + 7).split('').pop();
	else
		msg.split('').pop();

    var rawlines = ticket.splitU();
    //console.error("rawlines: ",rawlines);
    if(rawlines.length >= 3 && concat_ticket.fecha == undefined){
    	concat_ticket.fecha = rawlines[0];
		concat_ticket.hora = rawlines[1];
		concat_ticket.cajero = rawlines[2];
		if(rawlines.length > 4){
			//concat_ticket.HASH = rawlines.pop();
			concat_ticket.bigline = rawlines.pop();
		}
    }
    if(rawlines.length >= 7 && concat_ticket.tarjeta == undefined){
    	concat_ticket.tarjeta = rawlines[5];
		concat_ticket.trans = rawlines[6];
    }
    for(var l = 0; l < rawlines.length; l++){
    	var line = rawlines[l];
    	if(line.length >= 36)
    	{
    		if(concat_ticket.bigline == undefined)
    			concat_ticket.bigline = line;
    		else
    			concat_ticket.bigline += line;
    	}
    }
	if(Vars.get("info_cajero").fiid != undefined){
		concat_ticket.fiid= Vars.get("info_cajero").fiid;
	} 
    Vars.set("concat-ticket",concat_ticket);
    //console.log("concat-ticket: ",concat_ticket);
}