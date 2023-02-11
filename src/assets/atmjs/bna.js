var BNA = {
	isGBRU : function(){
		return InternalData.GBRU;
	},

	getCapacity : function(){
		return (BNA.isGBRU() ? 200 : 40);
	},

	getNoteType : function(){
        if (Vars.get("bank_note_types") == undefined){   
            SSUtil.setBankNoteType().then(function(){console.log("--------note type loaded-------------------------")});
        }
	},

	setBilletesIngresados : function(){
		
	},

	/* La siguiente funcion carga los tipos de billetes que acepta el cajero.
	Es una replica de SSUtil.setBankNoteType, pero se ejecuta de
	manera SINCRONA (se bloque hasta completar la operacion) */
	setBankNoteTypeSync : function(){
		var bankNoteTypes = []
        for (var i = 0; i < 50; i++) {
            var result = ndcdata.getStringVal(2090 + i);
            var type        = ""
            var denom       = "";

            if (result != ""){
                type        = result.substr(0, 3); //Hay q ver si todos tienen 3 caracteres
                auxIndex    = result.indexOf("-") - 3;
                denom       = parseInt(result.substr(3, auxIndex));
            }
            var aux = 2090 + i;
            //console.log("ID " +aux + " : " + result );
            bankNoteTypes[i] = {
                type : type,
                denom : denom
            }
        };
        Vars.set("bank_note_types", bankNoteTypes);
	},

	getBilletesIngresados : function(){
		
		if(Vars.get("bank_note_types") == undefined)
			BNA.setBankNoteTypeSync();

		var notes = Vars.get("bank_note_types");

        var billetes_ingresados = [];
        
        for (var c = 0; c < notes.length && c < 50; c++) {
            var id = 3225 + c;
            var count = ndcdata.getIntVal(id);
            var note_desc = notes[c];
            note_desc.cantidad  = count;
            if (note_desc.cantidad > 0)
            {
                billetes_ingresados.push(note_desc); 
            }
        }

        return billetes_ingresados;
	},	

	getCantBilletesIngresados : function(){
		
		if(Vars.get("bank_note_types") == undefined)
			BNA.setBankNoteTypeSync();

		var notes = Vars.get("bank_note_types");

        var billetes_ingresados = [];
        var total = 0;
        for (var c = 0; c < notes.length && c < 50; c++) {
            var id = 3225 + c;
            var count = ndcdata.getIntVal(id);
            var note_desc = notes[c];
            note_desc.cantidad  = count;
            if (note_desc.cantidad > 0)
            {
                total += note_desc.cantidad; 
            }
        }

        return total;
	},

	

	/* Identifica los billetes del BNA, y lo guarda como un arreglo de objetos
	 en la variable de sesion con el nombre referenciado por varname */
	identificarBilletesIngresados : function(varname){
		
		if(varname == undefined)
			varname = "billetes_ingresados";

        SSUtil.setBankNoteType().then(
        	function(){
        		var notes = Vars.get("bank_note_types");      
			    var billetes = [];
			    var total    = 0;
			    var cantidad_billetes = 0;
			    
			    for (var c = 0; c < notes.length; c++) {
			        var id = 3225 + c;
			        var count = ndcdata.getIntVal(id);
			        
			        if (c < notes.length){
			            
			            var note_desc        = notes[c];
			            note_desc.cantidad   = count;
			            note_desc.denominacion   = note_desc.denom;
			            total += count * (note_desc.denominacion);
			            billetes[c] = note_desc;
			            if (count > 0)
			            	cantidad_billetes += count 
			        }
			    }

			    Vars.set(varname,billetes);
        		//console.log("------------ Billetes Identificados --------------");
        	}
        );  
	},

	getCantidadDeBilletes : function(){
		var initBilletes = 50;
		if (BNA.isGBRU())
			initBilletes = 200;
		
		var ingresados = (Vars.get("cantidad_billetes") != undefined) ? Vars.get("cantidad_billetes")  : 0;
		if (BNA.isGBRU() && ingresados < initBilletes){
			return initBilletes;
		}
		return 40;
	},

}
