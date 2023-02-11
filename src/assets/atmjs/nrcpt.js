var Nrcpt = {
	dp : "",
	
	getTickets: function(){
		try{
			var config = JSON.parse(parsePRDH(ndctools.retrieveScreen(48,0), "", ""));
			Nrcpt.dp = "";
			for ( var i in config.nrcpt.dp ){
				Nrcpt.dp += parsePRDH(ndctools.retrieveScreen(48,parseInt(config.nrcpt.dp[i])), "", "");
			}
		}catch(e){
			console.error("[ERROR] de Parseo de Tickets")
		}
	},
	
	parseTicketPlano : function(ticket){
		for(var line in ticket.lines){
			ticket.lines[line] = ticket.lines[line].replace("(>", "<b>")
			ticket.lines[line] = ticket.lines[line].replace("(1", "</b>")
			ticket.lines[line] = ticket.lines[line].replace("\n", "<br>")
			ticket.lines[line] = ticket.lines[line].replace("?", "")
		}
		return ticket;
	},

	devolverTicketPlano: function(receiptdata){
		var obj = {};
		obj.receipt = [];
		try{

			for (var i in receiptdata){
				var data = {};
				var ticket = receiptdata[i];
				data["lines"] = ticket.split("\n");
				obj.receipt.push(data);
			}
		}
		catch(e){
			//console.log(e);
		}
		for (var i in obj.receipt){
			var data  = Nrcpt.parseTicketPlano(obj.receipt[i]);
			data.fromHost = "GRACIAS POR OPERAR CON SANTANDER RIO";
			obj.receipt[i] 	= data;
		}
		obj.name 			= "banelcoTicketParserPlano.html";
		//console.log("TIKCET-- " + obj);
		return obj;	
	},


	parsearTicket: function(receiptdata){
		var obj = {};
		obj.receipt = [];
		//console.log(JSON.stringify(receiptdata));
		//console.log(receiptdata);
		try{
			for (var i in receiptdata){
				var data = {};
				data["lines"] = receiptdata[i].split("\n");
				obj.receipt.push(data);
			}
		}
		catch(e){
			//console.log(e);
		}

		var ticketOK = data.lines;

		var comprobante = Vars.get("comprobante");
		if(comprobante==undefined)
			comprobante = {};


		if(ticketOK != undefined){
			var regex = /[0-9]{2}\/[0-9]{2}.*[\$][ ]*[-]?[0-9]+\,[0-9]{2}/g;
			for (var i = 0; i < ticketOK.length; i++) {
				var tmp = ticketOK[i].match(regex);

				if(tmp != undefined){
					if(comprobante.umov == undefined)
						comprobante.umov = [];
					comprobante.umov.push(tmp[0]);
				}
			}
		}

		if(ticketOK != undefined){
			var regex = /([0-9]{2}\/[0-9]{2}) ([^\s]*) ([^\s]*) ([\$][ ]*[-]?[0-9]+\,[0-9]{2})/;
			for (var i = 0; i < ticketOK.length; i++) {
				var tmp = regex.exec(ticketOK[i]);

				if(tmp != undefined){
					//console.log(tmp)
					if(comprobante.transferencias == undefined)
						comprobante.transferencias = [];
					var tran = {};
					tran.fecha = tmp[1];
					tran.origen = tmp[2];
					tran.destino = tmp[3];
					tran.monto = tmp[4];
					comprobante.transferencias.push(tran);
				}	
			}
		}

		for (var i in obj.receipt){
			//console.log(obj.receipt);
			var data  = parseTicketConsultas(obj.receipt[i]);
			data.fromHost = "----------------------";
			data.ticket = ticketOK;
			for(var linea in data.ticket){
				data.ticket[linea] = formatTicketLine(data.ticket[linea]);
			}
			obj.receipt[i] = data;

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

		var regex = /(?:^LIMITE PAGO(?:\s)*\$(?:\s)*)((?:[0-9]+)(?:(?:,|.)(?:[0-9]{2})))/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
			var tmp = obj.receipt[0].extra_data[i].match(regex);

			if(tmp != undefined){
				comprobante.limitepago = tmp[1];
			}
		}

		var regex = /(?:^DISPONIBLE PAGO(?:\s)*\(\*\)(?:\s)*\$(?:\s)*)((?:[0-9]+)(?:(?:,|.)(?:[0-9]{2})))/;
		for (var i = 0; i < obj.receipt[0].extra_data.length; i++) {
			var tmp = obj.receipt[0].extra_data[i].match(regex);

			if(tmp != undefined){
				comprobante.disponiblepagos = tmp[1];
			}
		}


		Vars.set("comprobante", comprobante);
		
		obj.receipt[0].onus = (Vars.get("crd_fiid")==Vars.get("term_fiid"));

		// obj.name = "banelcoTicketParser.html";
		obj.name = "banelcoTicketParserPlano.html";
		return obj;
	},

}

