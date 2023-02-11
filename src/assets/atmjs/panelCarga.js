var panelCarga={
	cargarDNIyCuenta:function(nextState){
		this.cargarNroCuenta(nextState)
		Vars.set("carga_panel_info_temp",Vars.get("carga_panel_info"));
		return this.cargarDNI("SIGUIENTE");
	},
	cargarDNI:function(nextState,titulo,opcional){
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
	cargarNroCuenta:function(nextState){
		var info_modal={}
			info_modal.titulo = "depositos"
			info_modal.titulo_class = "titulo mg-b-20"
			//console.log(Vars.get("depositos"))
			if(Vars.get("tipo_deposito")=="efectivo"){
				info_modal.subtitulo = Vars.get("depositos").p1.replace(/\s+/g, ' ').replace(/^ +/g, "").replace(/ +$/g, "");
			}else if(Vars.get("tipo_deposito")=="cheques"){
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
	cargarImporte2 : function(nextState,array_ctas){

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