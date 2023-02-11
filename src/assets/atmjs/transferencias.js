var Transferencias={
	arreglo : ["Caja de ahorro en Pesos","Cuenta corriente en Pesos","Caja de ahorro en Dolares","Cuenta corriente en Dolares"],
	tipo : function(){
		var tipo = ["11","01","12","02"]
		tipo_origen = tipo[Vars.get("cta_origen",0)]
		return tipo_origen
	},
	dest_rias :function(){
		var dest =  ["Caja de ahorro en Pesos","Cuenta corriente en Pesos","Caja de ahorro en Dolares","Cuenta corriente en Dolares"]
	 	dest.splice(Vars.get("cta_origen",0),1)
       

        return dest
	},
	dest_tipo :function () {
		var tipo = ["11","01","12","02"]
		tipo.splice(Vars.get("cta_origen",0),1)
		tipo_dest = tipo[Vars.get("cta_dest",0)]
		return tipo_dest
	},
	rias_currency :function(){
		var origen = this.tipo()
		var dest = this.dest_tipo()
		if(origen.slice(-1) == dest.slice(-1) && origen.slice(-1) == "1")
            return "$"
        else if (origen.slice(-1) == dest.slice(-1) && origen.slice(-1) == "2")
            return "u$s"
	},

	setTipoDest : function(data,tipo_d){
		switch(tipo_d) {
		    case "cbu":
			    var usr_info = Vars.get('tf_usr_info');
				Transferencias.dest_infoset(data,"cta_de_terceros",Vars.get('cbu_dest'),usr_info.nombre,"CUIL/CUIT",usr_info.cuit,usr_info.bco);
				if( Vars.get('cbu_add_acc')!=undefined){ //agregar cuenta a agenda si esta checkeado
					//console.log('se agrega cuenta');
					Vars.remove('cbu_add_acc');
				}
				data.footer.boton_siguiente.deshabilitado=undefined;
				break;
		    case "CUIT":
		    	data.transferencia_panel.destino.tipo ="CUIT";
		    	data.transferencia_panel.modal_flag.teclado_tipo="borrador";
		    	if(Vars.get('cuil')!=undefined){
		    		data.footer.boton_siguiente.deshabilitado=undefined;
		    	}
		    	break;
		    default:
		    	//console.log('next screen not defined');
		    	break;
		}
	},
	getTipoDest:function(modaltyp){
		switch(modaltyp){
			case "cbu":
				if (Vars.get('cta_indice') != undefined && Vars.get('cta_indice') != 0) {
						Vars.set('dest_acc_type',Vars.get('cta_indice'));
				}else{
						Vars.set('dest_acc_type',0);
				}
				Vars.set('tipo_dest','cbu');
				return modaltyp
				break;
			case "misma_tarjeta":
				Transferencias.setCurrency()
				if ( Vars.get('tf_index_cta_ppia')!= undefined || Vars.get('tf_index_cta_ppia') == "" ) {
					Vars.set('tipo_dest','misma_tarjeta');
					return modaltyp
				}
				break;
			case "CUIT":
				Vars.set('tf_next_flag',true);
				return modaltyp
				break;
			default:
				//console.log('error');
		}
	},
	setCurrency:function(){
		var origen=Vars.get('cuentas')[Vars.get('cta_origen')];
		var destino=Vars.get('cuentas')[Vars.get('tf_index_cta_ppia')];
		if(origen.t.slice(-1)=="1" && destino.t.slice(-1)=="1" || origen.t.slice(-1)=="2" && destino.t.slice(-1)=="2"){
			if(origen.t.slice(-1)=="1"){
				Vars.set('currency','$')
			}else{
				Vars.set('currency','u$s')
			}
			Vars.set('no_cruzada',true);
			return true
		}
		return false
	},
	setMonto:function(monto){
		if(monto.length>"0" && Vars.get('monto')==undefined){
			var dec=monto.split(',');
			if(dec.length==1){
				monto_fixed=monto+'00';
			}else{

                monto_fixed=dec[0]+(dec[1]+'00').slice(0,2);
			}
			Vars.set('monto',monto_fixed);
		}
		var monto=Vars.get('monto');
        var dec=monto.slice(-2);
        var int=monto.slice(0,-2);
        return int+','+dec;
	},
	confirmacion: function(data,tipo_dest){
		switch(tipo_dest){
			case "cbu":
				dest=Vars.get('tf_usr_info');
					dest.tipo_cta=Vars.get('cbu_dest');
					data.transferencia_panel.confirmacion.destino=dest;
				break;
			case "misma_tarjeta":
				var destino=Vars.get('cuentas')[Vars.get('tf_index_cta_ppia')]
					Vars.remove('tf_usr_info');
					Vars.remove('concepto');
					var dest={}
					dest.nombre=destino.tipo_letras+' '+destino.moneda+' '+destino.n
					data.transferencia_panel.confirmacion.destino=dest
				break;
			case "CUIT":
				var dest={}
					dest.cbu=Vars.get('cbu_dest')
					dest.cuit=Vars.get('cuil')
					data.transferencia_panel.confirmacion.destino=dest;
				break;
			default:
				//console.log('error');
		}
	},
	dest_infoset: function(data,tipo_dest,tipo_cuen,nomb_titu,tdoc_titu,nuid_titu,banc_orig) {
		data.transferencia_panel.destino.tipo ="resumen";
		data.transferencia_panel.destino.op_type=tipo_dest;
		data.transferencia_panel.destino.cbu=tipo_cuen;
		data.transferencia_panel.destino.dest_titular=nomb_titu;
		data.transferencia_panel.destino.dest_tipo_id=tdoc_titu;
		data.transferencia_panel.destino.dest_titu_id=nuid_titu;
		data.transferencia_panel.destino.dest_banco=banc_orig;
	}
}