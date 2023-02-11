var EMV = {

	//esta funcion debe usarse en la primera transaccion que se realiza en el cajero
	StartEMV : function(nextState){
        Vars.set("chip", true);
		Vars.set("nextState", nextState);
		return "ndc/emv/sta_ndc_begin_icc_init";
	},

	//esta funcion debe usarse cada vez que se quiera llamar a un transaction request
	GoOnTx : function(nextState){

		if(Vars.get("chip")){
			Vars.remove("reinitilized");
			Vars.set("nextState", nextState);
			//console.log(nextState);
			//console.log(Vars.get("nextState"));
			return "ndc/emv/sta_ndc_set_icc_transaction_data_state";
		}

		return nextState;
	},

	Reinitialize : function(nextState, amount=0){
		// This condition is used to use the default logic when the card is Devito Local Visa or the flag was set.
		if(Vars.get("tipo_menu") != "BANELCO" || States.getProperty("flagRead", false) == true){
			if(Vars.get("chip")){
				Vars.set("reinitilized", true);
				Vars.set("nextState", nextState);
				if(amount){
					// se setea el amount_buffer antes de la reinicializacion del chip para que se envie correctamente el monto en el CAM
					var imp_formateado = Extraccion.formatoAmountBuffer(amount.toString(), 12);
					ndcdata.putStringVal(2000, ""+imp_formateado);
				}
				return "ndc/emv/sta_ndc_reinitialization_icc";
			}	
		}	
		return nextState;
	},


	//retorna el siguiente estado para sincronizar con EMV
	returnNextState : function(chip){
		Vars.set("chip",  chip != undefined ? chip : false );

		var nextState = Vars.get("nextState") != undefined ? Vars.get("nextState") : false;
		Vars.remove("nextState");

		if(nextState != false){
			return nextState;
		}
		return "ndc/sta_ndc_start";
	},


	asciiConvert : function(str, lang){
			var arr1 = [];
			for (var n = 0; n < str.length; n ++){
				var dec = (Number(str.charCodeAt(n)+128).toString(16));
				dec = lang[dec.toUpperCase()]
				var conver = String.fromCharCode("0x"+dec)
				arr1.push(conver);
			}
			return arr1.join('');
	},

	deco : function(string){
		var array = string.split("(")
		var arr1 = [];
		for (i=0; i<array.length; i++){
			var res = "";
			var langIndicator = array[i].charAt(0);
			switch (langIndicator){
				case "b":
				case "c":
					// Latin 1(West European)
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part1);
					break;
				case "d":
				case "e":
					// Latin 2(East European)
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part2);
					break;
				case "f":
				case "g":
					// Latin 3(South European)
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part3);
					break;
				case "h":
				case "i":
					// Latin 4(North European)
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part4);
					break;
				case "j":
				case "k":
					// Latin/Cyrillic
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part5);
					break;
				case "l":
				case "m":
					// Latin/Arabic
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part6);
					break;
				case "n":
				case "o":
					// Latin/Greek
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part7);
					break;
				case "p":
				case "q":
					// Latin/Hebrew
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part8);
					break;
				case "r":
				case "s":
					// Turkish
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part9);
					break;
				case "t":
				case "u":
					// Nordic
					res = EMV.asciiConvert(array[i].substr(1).trim(), Iso8859.part10);
					break;
				case "`":
				case "a":
					//regreso a la codificacion normal
					res = array[i].substr(1);
					break;
				default :
					res = array[i]
			}
			arr1.push(res)
		}
		return arr1.join(' ');
	},

	setSeleccionScreen : function (data){
		try{
			var txt = ndctools.retrieveScreen(48,101);
		}catch(error){
                console.error("[ERROR] de Mensaje ndcTools")
            }
		//var txt = "101(1P000;0\N1P2022\N3MAS(`P000;0\E0P2022\E0(j2XaP(` (j:`UTXb F2 (`1         (`P000;0\H0P2022\H0(j2XaP(` (j4UQUb(` 1I3          (`P000;0\K0P2022\K0(j2XaP(` (j:`UTXb L3(`2  "
	    var regex = [
	        {
				"reg1" : /N3(MAS)/g,
				"ndcKey": "d"
			},
			{
				"reg1" : /(ATRAS)/g,
				"ndcKey": "f"
			},
			{
				"reg1" : /\x0fE0([^\x0f]{10,})\x0f/g,
				"reg2" : /\x0fF2(.*?)((?=\x1b[^\(])|$)/g,
				"ndcKey": "a"
			},
			{
				"reg1" : /\x0fH0([^\x0f]{10,})\x0f/g,
				"reg2" : /\x0fI3(.*?)((?=\x1b[^\(])|$)/g,
				"ndcKey": "b"
			},
			{
				"reg1" : /\x0fK0([^\x0f]{10,})\x0f/g,
				"reg2" : /\x0fL3(.*?)((?=\x1b[^\(])|$)/g,
				"ndcKey": "c"
			},
			{
				"reg1" : /\x0fM0([^\x0f]{10,})\x0f/g,
				"reg2" : /\x0fN3(.*?)((?=\x1b[^\(])|$)/g,
				"ndcKey": "d"
			},
	    ];

	    var arrBotones = [];
	        regex.forEach(function(regElem){
	            aux = regElem.reg1.exec(txt);
	            if(aux != null){
	                var nombre = "";
	                nombre = aux[1];
	                if(regElem.reg2 != undefined){
	                    aux = regElem.reg2.exec(txt);
	                    if(aux != null){
	                        nombre += aux[1];
	                    }
	                }
	                var boton = {
	                    "click" : regElem.ndcKey,
	                    "texto" : nombre,
	                    "class" : "btn azul block"
	                }

	                arrBotones.push(boton)
	            }
	        })
	    arrBotones = arrBotones.sort(function(a, b){return a.click.localeCompare(b.click)})
	    obj = arrBotones.find(function(o){ return o.texto === 'MAS' || o.texto === 'ATRAS'} );
	    if(obj){
	        data.carrousel_falso.mas=obj.texto
	        arrBotones.pop()
	    }

		var arrai = [];

	    for( j = 0 ; j <= arrBotones.length - 1 ; j++ ){

	    	var deco =  EMV.deco(arrBotones[j].texto);
	    	arrBotones[j].texto = deco ;
	    }

	    data.carrousel_falso.botonera = arrBotones;
	},
	
}