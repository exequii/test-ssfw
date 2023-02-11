var Cancelar = {

	inicializar : function(){
		var info_cajero=Vars.get("info_cajero")
		Vars.clearSession();
		Cancelar.resetearAyudaVisual();
		Vars.set("info_cajero",info_cajero)
	},

	resetearAyudaVisual : function(){
		$("body")[0].className = "bnlc";
	},

	claves : function(){
		Vars.remove("doc")
		Vars.remove("cuil")
		Vars.remove("phone")
		Vars.remove("code")
		Vars.remove('clave');
		Vars.remove("carga_doc")
		Vars.remove("index_telf")
		Vars.remove("index_doc")
		Vars.remove('doc_tipo');
		Vars.remove('stateData');
	},

	transferencias:function(){
		Vars.remove('index');
		Vars.remove('currency');
		Vars.remove('monto');
		Vars.remove('monto_dummie');
		Vars.remove('concepto');
		Vars.remove('indet');
		Vars.remove('cta_origen');
		Vars.remove('tf_usr_info');
		Vars.remove('modal_type');
		Vars.remove('show');
		Vars.remove('referencia_input');
		Vars.remove('agendada_disabled');
		Vars.remove('no_cruzada');

	},

	setEndScreen : function(data){

		var cardless = Vars.get("cardless");
		var saco_dinero = Vars.get("saco_dinero");
		var saco_ticket = Vars.get("saco_ticket");
		var salida_exitosa = Vars.get("salida_exitosa");
		var biometria_anses = Vars.get("tipo_menu") == "BIOMETRIA";
		var biom_opfinancieras = Usuario.esBiometria();

		var imagen = "error_cajero";
		var texto = "";

		var espera = {};
		var vg_text = {};
		espera.titulo = "listo";
		espera.icono = "confirmar";
		espera.subtexto = "gracias_por_operar";
		
		if(!salida_exitosa){
			espera.alerta = "Tu operación fue cancelada";
		}
		
		if(!cardless && !biom_opfinancieras){
			imagen = "retire_";
			texto = "retirar";
			imagen = imagen + (!cardless?"tarjeta":"") + (saco_ticket?"ticket":"") + (saco_dinero?"dinero":"");
			texto = texto + (!cardless?"_tarjeta":"") + (saco_ticket?"_ticket":"") + (saco_dinero?"_dinero":"");
			espera.imagen = imagen;
			espera.texto = texto;
			vg_text.text = Idioma.txt(texto);
			data.vg_text = vg_text;
			data.espera=espera;
		}else if(!biometria_anses && cardless && ( saco_ticket || saco_dinero ) ){
			var operacion_exitosa={}
			operacion_exitosa.titulo="operacion_exitosa"
			operacion_exitosa.ticket=true
			data.operacion_exitosa=operacion_exitosa
		}else if(!biometria_anses && !biom_opfinancieras && (cardless && (!CheckDevice.CheckHabilitado("efectivo") && !CheckDevice.CheckHabilitado("cheque") && !CheckDevice.CheckHabilitado("dispensador")) || !CheckDevice.CheckHabilitado("ticket_usuario"))){
			var botonera = {}
			botonera.titulo="operaciones_sin_tarjeta" 
        	botonera.icono="sin-tarjeta"
			botonera.container = true
       		botonera.container_class = "flex"
            botonera.texto = "<strong>En este momento</strong> el cajero no puede realizar <br> operaciones sin tarjeta. Disculpá las molestias."
			data.botonera=botonera
		} else if(salida_exitosa){
			espera.cardless_end = undefined;
			espera.cardless_text = "gracias_por_operar2";
			espera.subtexto = undefined;
			espera.icono = "mano-despedida";
			espera.titulo = "hasta_pronto";
			espera.imagen = "gracias";
			data.espera=espera
			espera.alerta = undefined;
		}else{
			espera.cardless_end = "Tu operación fue cancelada";
			espera.imagen = "cancelar_operación_sin_tarjeta";
			espera.texto = "";
			data.espera=espera;
			espera.alerta = undefined;
		}
		try{
			var datosCajero = JSON.parse(ndctools.retrieveScreen(48,5));
		} catch(error){
			console.error("[ERROR] de Parseo de datosCajero")
		}

        var grupo = datosCajero.grupo;
        grupo = grupo.substring(4,7); 

		if((grupo!=500)&&(grupo!=505))
		 data.vg_text = {};
   

		return data;
	},

	seguros:function(){
		Vars.remove('seguros_baja')
		Vars.remove('seguros_tipo')
		Vars.remove('index')
		Vars.remove('step')
		Vars.remove('terms')
		Vars.remove('seguros')
	},
	
	limpiarMenu:function(){
		var onus = Vars.get("on-us")
		var cuentas = Vars.get("cuentas")
		var crd_fiid = Vars.get("crd_fiid")
		var term_fiid = Vars.get("term_fiid")
		var modulos = Vars.get("modulos")
		var last_check = Vars.get("last_check")
		var check = Vars.get("check")
		var estado_ok = Vars.get("estado_ok")
		var tipo_menu = Vars.get("tipo_menu")
		var chip = Vars.get("chip")
		var app=Vars.get("app")
		var appconfig=Vars.get("appconfig")
		var idioma=Vars.get("idioma")
		var cajero_con_dolares=Vars.get("cajero_con_dolares")
		var info_cajero=Vars.get("info_cajero")
		var biom_of = Vars.get("biom_of",false)
		var cuenta_link = Vars.get('cuenta_link')
		var dni = Vars.get("dni_biometria");
		var isBiom = Vars.get("isBiom");

		if(tipo_menu == "LINK"){
			var comprobante=Vars.get("comprobante")
		}

		Vars.clearSession();

		if(tipo_menu == "LINK"){
			Vars.set('comprobante',comprobante)
		}
		
		Vars.set('cuentas',cuentas)
		Vars.set('on-us',onus)
		Vars.set('crd_fiid',crd_fiid)
		Vars.set('term_fiid',term_fiid)
		Vars.set('modulos',modulos)
		Vars.set('last_check',last_check)
		Vars.set('check',check)
		Vars.set('estado_ok',estado_ok)
		Vars.set('tipo_menu',tipo_menu)
		Vars.set('chip',chip)
		Vars.set('app',app)
		Vars.set('appconfig',appconfig)
        Vars.set("idioma",idioma);
        Vars.set("cajero_con_dolares",cajero_con_dolares)
        Vars.set("info_cajero",info_cajero)
        Vars.set("biom_of",biom_of)
        Vars.set("cuenta_link",cuenta_link)
        Vars.set("dni_biometria", dni);
		Vars.set("isBiom", isBiom)
	}
}