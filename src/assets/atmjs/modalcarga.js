var ModalCarga = {

	 cargaDinamico : function(nextState,info_modal){

		var info_modal = JSON.parse(info_modal);
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarTarjeta : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingrese_tarjeta";
		var empresa = Vars.get("empresa_seleccionada");
		switch(empresa.desc) {
		    case "VISA":
				info_modal.maxLen = 16;
				info_modal.minLen = 16;
		    	break
		    case "MASTER":
				info_modal.maxLen = 16;
				info_modal.minLen = 16;
		    	break
		    case "AMEX":
				info_modal.maxLen = 15;
				info_modal.minLen = 15;
		    	break
		    default:
		    	//console.log("Error en max/min del input")
		}
		info_modal.tipo_teclado = "cero_grande";
		info_modal.error = "error_tajeta_invalida";
		info_modal.storename = "tarjeta_cuenta";
		info_modal.next_state = nextState;
		info_modal.on_cancel = States.CurrentState;
		Vars.set("modal_carga_info", info_modal);
		//console.log("LALALA",info_modal)
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarCuenta : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingrese_cuenta";
		info_modal.maxLen = 19;
		info_modal.minLen = 1;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.error = "error_cuenta_invalida";
		info_modal.storename = "tarjeta_cuenta";
		info_modal.next_state = nextState;
		info_modal.on_cancel = States.CurrentState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarDNI : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingrese_documento";
		info_modal.maxLen = 12;
		info_modal.minLen = 6;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.error = "error_doc_invalido";
		info_modal.storename = "doc";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarCodigo : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresa_codigoarea";
		info_modal.maxLen = 4;
		info_modal.minLen = 1;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "error_cod_invalido";
		info_modal.storename = "code";
		info_modal.ayuda = "ejemplo_cod_area";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarCBU : function(nextState){

		var info_modal = {};
		info_modal.cbu = true;
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresar_cbu";
		info_modal.maxLen = 22;
		info_modal.minLen = 22;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "err_cbu_lenght";
		info_modal.storename = "cbu";
		info_modal.next_state = nextState;
		info_modal.on_cancel = States.CurrentState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

	cargarCodigoPago : function(nextState,titulo){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = titulo;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "error_cod_invalido";
		info_modal.storename = "code";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarTelefono : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresa_celular";
		info_modal.maxLen = 8;
		info_modal.minLen = 5;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "error_tlf_invalido";
		info_modal.storename = "phone";
		// info_modal.style = "padding-left: 110px";
		info_modal.texto_input = Vars.get("code") + " 15";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},
	cargarNumeroSube : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresa_tarjeta";
		info_modal.maxLen = 16;
		info_modal.minLen = 16;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "error_sube_invalida";
		info_modal.storename = "sube";
		// info_modal.style = "padding-left: 110px";
		info_modal.texto_input = "";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

    cargarTelefonoMau : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresa_telefono";
		info_modal.maxLen = 12;
		info_modal.minLen = 1;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "error_tlf_invalido";
		info_modal.storename = "phone";
		// info_modal.style = "padding-left: 110px";
		info_modal.texto_input = Vars.get("code") + " ";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

	cargarCuil : function(nextState){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresa_cuil";
		info_modal.maxLen = 11;
		info_modal.minLen = 11;
		info_modal.tipo_teclado = "cero_grande";
		info_modal.cero_valid = true;
		info_modal.error = "error_cuil_invalido";
		info_modal.storename = "cuil";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

	timeout_modal : function(nextState){

		var timeout = {};
		timeout.pantalla_fondo = States.CurrentStateData.screens.default;
		timeout.next_state = nextState;
		Vars.set("timeout_modal", timeout);
		return "ssfw/sta_ssfw_timeout";

	},

	cargarImporte : function(nextState, imagen_cheque){

		var info_modal = {};
		info_modal.tipo="importe"
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingresa_importe";
		info_modal.maxLen = 10;
		info_modal.minLen = 1;
		info_modal.decimal = true;
		//info_modal.cero_valid = true;
		info_modal.error = "Ingresaste un monto incorrecto";
		info_modal.storename = "monto";
		info_modal.next_state = nextState;
		info_modal.imagen= imagen_cheque;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

	cargarImporteRecarga : function(nextState,ayuda){

		var info_modal = {};
		info_modal.tipo="importe"
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingrese_importe_recarga";
		info_modal.maxLen = 10;
		info_modal.minLen = 2;
		info_modal.cero_valid = true;
		info_modal.error = 'El monto debe de ser un múltiplo de '+ ayuda;
		info_modal.storename = "monto";
		info_modal.ayuda = info_modal.error;
		info_modal.check_multiplo=ayuda
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

	cargarCuotas : function(nextState,ayuda){

		var info_modal = {};
		info_modal.pantalla_fondo = States.CurrentStateData.screens.default;
		info_modal.titulo = "ingrese_cuotas";
		info_modal.maxLen = 10;
		info_modal.minLen = 1;
		info_modal.error="ingresa un valor"
		info_modal.tabla={}
		info_modal.tabla.class="fijo-100 align-center justify-center btn-chico gris width-120"
		info_modal.tabla.value=[1,3,6,9,12,18,24,36]
		info_modal.tabla.texto="cuotas"
		info_modal.storename = "cuotas";
		info_modal.next_state = nextState;
		Vars.set("modal_carga_info", info_modal);
		return "ssfw/sta_ssfw_carga_datos";

	},

	menu_jubilados : function(data){
		data.footer.menu_jubilados={
			"titulo":"Cerrá esta ventana para ver más opciones.",
			"boton_texto":"jubilados",
			"botones":[
				{
					"texto":"consultar",
					"icono":"consultas",
					"event":"ev_ssfw_btn_consultar"
				},
				{
					"texto":"imprimir_cpp",
					"icono":"cpp2",
					"event":"ev_ssfw_btn_cpp"
				},
				{
                    "texto":"obt_prestamos",
                    "icono":"prestamos",
					"event":"ev_ssfw_btn_prestamos"
				}
			]
		}
		if(Vars.get("on-us") != true)
			data.footer.menu_jubilados.botones.splice(2, 1);
		return data
	},

/*--------------------------------------------------------------------------------------------------------------------------*/
//PanelCarga  a partir de aqui


	cargarDNIyCuenta:function(nextState){
		this.cargarNroCuenta(nextState)
		Vars.set("carga_panel_info_temp",Vars.get("carga_panel_info"));
		return this.cargarDNI("SIGUIENTE");
	},

	cargarDNIDeposito:function(nextState,titulo,opcional){
		var info_modal={}
			if(titulo==undefined)
				info_modal.titulo = "depositos"
			else
				info_modal.titulo = titulo
			info_modal.titulo_class = "titulo mg-b-20"
			if(opcional != undefined){
				info_modal.subtitulo = "Ingresá tu DNI (opcional)"
				info_modal.opcional=true
				info_modal.minLen = 0
				Vars.set('dni_opcional',true);
				//aqui hacer logica para el boton
			}else{
				info_modal.subtitulo = "Ingresá tu DNI"
				info_modal.minLen = 1
			}
			info_modal.subtitulo_class = "mg-b-20"
			info_modal.icono = "deposito"
			info_modal.maxLen = 16
			info_modal.storename = "doc"
			info_modal.next_state = nextState
			info_modal.left_col_class = "min-450 mg-r-10"

			Vars.set('carga_panel_info',info_modal)

		return "ssfw/sta_ssfw_panel_carga"
	},
	cargarNroCuentaDeposito:function(nextState){
		var info_modal={}
			info_modal.titulo = "depositos"
			info_modal.titulo_class = "titulo mg-b-20"
			//console.log(Vars.get("depositos"))
			if(Vars.get("tipo_deposito")=="efectivo"){
				if(Vars.get("depositos").p2 == undefined){
					info_modal.subtitulo = "Ingresá el número de cuenta de destino:"
				}else
					info_modal.subtitulo = Vars.get("depositos").p2.replace(/\s+/g, ' ').replace(/^ +/g, "").replace(/ +$/g, "");
			}else if(Vars.get("tipo_deposito")=="cheques"){
				if(Vars.get("depositos").p2 == undefined){
					info_modal.subtitulo = "Ingresá el número de cuenta de destino:"
				}else
					info_modal.subtitulo = Vars.get("depositos").p2.replace(/\s+/g, ' ').replace(/^ +/g, "").replace(/ +$/g, "");
			}
			if(info_modal.subtitulo == "INGRESE EL NUMERO DE CUENTA DESTINO")
				info_modal.subtitulo = "Ingresá el número de cuenta de destino:"
			info_modal.subtitulo_class = "mg-b-20"
			info_modal.icono = "deposito"
			info_modal.maxLen = 19
			info_modal.minLen = 1
			info_modal.cero_valid=true
			info_modal.storename = "cuenta"
			info_modal.next_state = nextState
			info_modal.left_col_class = "max-400 mg-r-50"
			info_modal.drop_tipos_titulo = "Seleccioná el tipo de cuenta:"
			info_modal.drop_tipos_storename = "tipo_cuenta"
			info_modal.drop_tipos = [
				"Cuenta especial en pesos",
				"Cuenta corriente en pesos",
				"Caja de ahorros en pesos"
			];

			Vars.set('carga_panel_info',info_modal)

		return "ssfw/sta_ssfw_panel_carga"
	},
	cargarImporteAfip : function(nextState,array_ctas){

		var info_modal = {}
		info_modal.titulo = "Pagos AFIP"
		info_modal.icono = "rubros_tarjeta-credito"
		info_modal.titulo_class = "titulo mg-b-20"
		info_modal.subtitulo = "ingresa_importe"
		info_modal.subtitulo_class = "mg-b-20"
		info_modal.maxLen = 10
		info_modal.minLen = 1
		info_modal.decimal = true
		info_modal.error = ""
		info_modal.storename = "monto_afip"
		info_modal.icono_class=true
		info_modal.left_col_class = "min-450 mg-r-10"
		info_modal.next_state = nextState
		info_modal.drop_tipos_storename = "tipo_cuenta_afip"
		info_modal.drop_tipos_titulo = "Seleccioná el tipo de cuenta:"
		info_modal.drop_tipos = array_ctas

		Vars.set("carga_panel_info", info_modal)

		return "ssfw/sta_ssfw_panel_carga"

	},

}


