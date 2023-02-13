var Usuario = {
  /*
		crd_fiid = cf
		term_fiid = tf
		dol = d
		cuentas = ctas
		tipo = t
		num = n
		estado = e
		tipo_m = tm
		mensaje = m
	*/

  mauUnicef: function (data) {
    var mau = {};
    mau.tipo = "U";
    mau.titulo = "LA EDUCACIÓN ES UN DERECHO";
    mau.monto = 300;
    mau.contenido = [
      {
        texto:
          "Para continuar con sus estudios, las chicas y los chicos te necesitan",
      },
      {
        texto: "¡Doná $300 a UNICEF y transformá sus vidas!",
        class: "bold italic mg-t-10 mg-b-20",
      },
    ];
    Vars.set("dona_text", mau);

    return false;
  },


	filtrarCuentas : function(cuentas){
		return cuentas.filter(function(e) {
		  		if ((e.e == "1" || e.e == "3" || e.e == "4") && (e.t == "01" || e.t == "11" || e.t == "02" || e.t == "12" || e.t == "21" || e.t == "22")){
		  			return true
		  		}
		  		return false
		})
	},

	filtrarCuentasPorTipo : function(cuentas,tipo){
		return cuentas.filter(function(e) {
		  		if ((e.e == "1" || e.e == "3" || e.e == "4") && (e.t==tipo)){
		  			return true
		  		}
		  		return false
		})
	},

	ordenarCuentas : function(cuentas){
		cuentas = cuentas.sort(function(a, b){
			if(a.e == "3")
				return -1
			if(b.e == "3")
				return 1
			return 0
		})
		return cuentas
	},
	
	// ordenarCuentas : function(cuentas){
	// 	cuentas = cuentas.sort(function(a, b){
	// 		if(a.e == "3" && b.e == "3"){
	// 			if(a.t[1] == "1" && b.t[1] != "1")
	// 				return -1
	// 			if(b.t[1] == "1" && a.t[1] != "1" )
	// 				return 1
	// 		}else{
	// 			if(a.e == "3")
	// 				return -1
	// 			if(b.e == "3")
	// 				return 1
	// 		}
	// 		return 0
	// 	})
	// 	return cuentas
	// },

	setCuentas : function(cuentas){
		for (i = 0, len = cuentas.length; i < len; ++i) {
	    	if(cuentas[i].t == "01"){
	    		cuentas[i].moneda = "$"
	    		cuentas[i].tipo_letras = "CC"
	    	} else if(cuentas[i].t == "11"){
	    		cuentas[i].moneda = "$"
	    		cuentas[i].tipo_letras = "CA"
	    	} else if(cuentas[i].t == "02"){
	    		cuentas[i].moneda = "u$s"
	    		cuentas[i].tipo_letras = "CC"
	    	} else if(cuentas[i].t == "12"){
	    		cuentas[i].moneda = "u$s"
	    		cuentas[i].tipo_letras = "CA"
	    	} else if(cuentas[i].t == "21"){
	    		cuentas[i].moneda = "$"
	    		cuentas[i].tipo_letras = "CE"
	    	} else if(cuentas[i].t == "22"){
	    		cuentas[i].moneda = "u$s"
	    		cuentas[i].tipo_letras = "CE"
	    	// } else if(cuentas[i].t == "31"){
	    	// 	cuentas[i].moneda = "u$s"
	    	// 	cuentas[i].tipo_letras = "CRE"
	    	// } else if(cuentas[i].t == "32"){
	    	// 	cuentas[i].moneda = "$"
	    	// 	cuentas[i].tipo_letras = "CRE"
	    	}else{
	    		cuentas[i].moneda = " "
	    		cuentas[i].tipo_letras = "  "
	    	}
	   	}
		return cuentas
	},

	getNombreCuenta : function (tipo_cuenta) {

		switch(tipo_cuenta) {
		    case "22":
		        nombre = "Cuenta especial en dólares";
		        break;
		    case "02":
		        nombre = "Cuenta corriente en dólares";
		        break;
		    case "12":
		        nombre = "Caja de ahorros en dólares";
		        break;
		    case "21":
		        nombre = "Cuenta especial en pesos";
		        break;
		    case "01":
		        nombre = "Cuenta corriente en pesos";
		        break;
		    case "11":
		        nombre = "Cuenta caja de ahorros en pesos";
		        break;
		    default:
		        nombre = "Cuenta especial";
					}
		return nombre;
	},

	getTipoCuentas : function(cuentas){
		var array=[]
		var array_tipo=[]
		var filter={}
		for (i = 0, len = cuentas.length; i < len; ++i) {
			var account=cuentas[i].t.slice(0,1)
	    	if(account == "0"){
	    		filter[account]={"array":"cta_cte","tipo": account,}
	    	} else if(account == "1"){
	    		filter[account]={"array":"caja_ahorro","tipo": account} 
	    	} else if(account == "2"){
	    		filter[account]={"array":"cta_esp","tipo": account}
	    	} else if(account == "3"){
	    		filter[account]={"array":"cta_credito","tipo": account}
	    	}
	   	}
	   	for(var j in filter){
	   		array.push(filter[j].array)
	   		array_tipo.push(filter[j].tipo)
	   	}
	   	var cuentas={}
	   	cuentas.array=array
	   	cuentas.tipo=array_tipo
		return cuentas
	},

	getTipoCuentasPesos : function(cuentas){
		var array=[]
		var array_tipo=[]
		var filter={}
		for (i = 0, len = cuentas.length; i < len; ++i) {
			var account=cuentas[i].t.slice(0,1)
	    	if(cuentas[i].t == "01"){
	    		filter[account]={"array":"cta_cte","tipo": cuentas[i].t}
	    	} else if(cuentas[i].t == "11"){
	    		filter[account]={"array":"caja_ahorro","tipo": cuentas[i].t} 
	    	} else if(cuentas[i].t == "21"){
	    		filter[account]={"array":"cta_esp","tipo": cuentas[i].t}
	    	} else if(cuentas[i].t == "31"){
	    		filter[account]={"array":"cta_credito","tipo": cuentas[i].t}
	    	}
	   	}
	   	for(var j in filter){
	   		array.push(filter[j].array)
	   		array_tipo.push(filter[j].tipo)
	   	}
	   	var cuentas={}
	   	cuentas.array=array
	   	cuentas.tipo=array_tipo
		return cuentas
	},
	getTipoCuentasPesosX : function(cuentas){
		var array=[]
		var array_tipo=[]
		var filter={}
		for (i = 0, len = cuentas.length; i < len; ++i) {
			var account=cuentas[i].t.slice(0,1)
	    	if(cuentas[i].t == "01"){
	    		filter[account]={"array":"cuenta_corriente_pesos","tipo": cuentas[i].t}
	    	} else if(cuentas[i].t == "11"){
	    		filter[account]={"array":"caja_ahorros_pesos","tipo": cuentas[i].t} 
	    	} else if(cuentas[i].t == "21"){
	    		filter[account]={"array":"cuenta_especial_pesos","tipo": cuentas[i].t}
	    	} else if(cuentas[i].t == "31"){
	    		filter[account]={"array":"cuenta_credito_pesos","tipo": cuentas[i].t}
	    	}
	   	}
	   	for(var j in filter){
	   		array.push(filter[j].array)
	   		array_tipo.push(filter[j].tipo)
	   	}
	   	var cuentas={}
	   	cuentas.array=array
	   	cuentas.tipo=array_tipo
		return cuentas
	},

	getTipoCuentasDolares : function(cuentas){
		var array=[]
		var array_tipo=[]
		var filter={}
		for (i = 0, len = cuentas.length; i < len; ++i) {
			var account=cuentas[i].t.slice(0,1)
	    	if(cuentas[i].t == "02"){
	    		filter[account]={"array":"cuenta_corriente_dolares","tipo": cuentas[i].t}
	    	} else if(cuentas[i].t == "12"){
	    		filter[account]={"array":"caja_ahorros_dolares","tipo": cuentas[i].t} 
	    	} else if(cuentas[i].t == "22"){
	    		filter[account]={"array":"cuenta_especial_dolares","tipo": cuentas[i].t}
	    	} else if(cuentas[i].t == "32"){
	    		filter[account]={"array":"cuenta_credito_dolares","tipo": cuentas[i].t}
	    	}
	   	}
	   	for(var j in filter){
	   		array.push(filter[j].array)
	   		array_tipo.push(filter[j].tipo)
	   	}
	   	var cuentas={}
	   	cuentas.array=array
	   	cuentas.tipo=array_tipo
		return cuentas
	},
	getTipoCuentasTodas: function (cuentas) {
		var tcuentas = []
		    tcuentas_p= this.getTipoCuentasPesosX(cuentas);
		    tcuentas_d= this.getTipoCuentasDolares(cuentas);
		    tcuentas.array = tcuentas_p.array.concat(tcuentas_d.array);
		   	tcuentas.tipo = tcuentas_p.tipo.concat(tcuentas_d.tipo);

		return tcuentas;
	},
	initCuentas : function(){
		var cuentas = Vars.get("cuentas")
		if (cuentas == undefined){
			try{
				var msj_dh = JSON.parse(ndctools.retrieveScreen(48,75))

				if(msj_dh == undefined){
					console.error("[ERROR] en Cuentas recibidas")
				}
				Vars.set("crd_fiid", msj_dh.cf)				
				Vars.set("term_fiid", msj_dh.tf)
				if(msj_dh.cf==msj_dh.tf){
					Vars.set("on-us", true)
					Vars.set("cajero_con_dolares", (msj_dh.d=="S"?true:false))
				}
				var cuentas = Usuario.filtrarCuentas(Usuario.setCuentas(msj_dh.ctas))
				Usuario.ordenarCuentas(cuentas)

				if(cuentas.length < 1){
					Vars.set("nohaycuentas", true)
					States.handleEvent("ev_ssfw_error_en_cuentas")
				}

				Vars.set("cuentas", cuentas)

			}catch(e){
				console.error("[ERROR] de Parseo de initCuentas")
				States.handleEvent("ev_ssfw_error_en_cuentas")
			}
		}else{
			for (var i = 0; i < cuentas.length; i++) {
				cuentas[i].saldo = undefined
				cuentas[i].disponible = undefined
				cuentas[i].cbu = undefined
				cuentas[i].umov = undefined
			}
			Vars.set("cuentas", cuentas)
		}
	},



	getTrueIndex : function(cuentas,cuenta){
			var pos = cuentas.map(
				function(e){ return (e.n + e.t);
				}).indexOf(cuenta.n + cuenta.t);

			return pos
	},

	setTipoMenu : function(data){
		var menu = Vars.get("tipo_menu","BANELCO")
		var grupo = Vars.get("info_cajero")
    	var es_biom = this.esBiometria() 
		switch(menu) {
		    case "BANELCO":
		    	data.menu.banelco = true
		    	data.menu.biometria = es_biom
		    	if(!es_biom){
			    	Usuario.initCuentas()	
		    	}
			    if(VG.enable){
			    	this.setMenuVg(data)
			    }
		    	break
		    case "JUBILADOS":
		    	data.menu.banelco = true
				data.menu.extraccion_rapida.main_panel=true
				Usuario.initCuentas()
				ModalCarga.menu_jubilados(data)
		    	break
		    case "TC":
		    	if(Vars.get("idioma")=="ESP"){
		    		data.menu.extraccion_rapida.tc = true
			    	data.menu.tc = true
		    	}else{
			    	data.menu.link = true
			    	data.menu.tipos = [
						"cta_credito",
						"cta_cte",
						"caja_ahorro"
					],
			    	data.footer.boton_claves = undefined
		    	}
				break
		    case "ANSES":
		    	data.menu.anses = true
			    data.footer.boton_claves.texto = "cambio_clave"
		    	break
		    case "LINK":
		    	data.footer.boton_claves = undefined
			    data.menu.link = true
			    data.menu.biometria = es_biom
		    	break
		    case "RIAS":
		    	data.menu.rias = true
		    	Vars.set("cajero_con_dolares",(grupo.d==true?true:false))
		    	data.footer.boton_claves.texto = "cambio_clave"
		    	break
		    default:
		    	//console.log('next screen not defined')
		    	States.handleEvent("ev_ssfw_salir")
		    	break
		}

		if(es_biom)
    		data.footer.boton_claves = undefined

		return data
	},

	setMenuHabilitado:function(data){
		var menu = Vars.get("tipo_menu","BANELCO")
		var status_dispensador = CheckDevice.CheckHabilitado("dispensador")
		var status_ticket = CheckDevice.CheckHabilitado("ticket_usuario")

		if(menu != "TC"){

			if(!status_dispensador){
				data.menu.extraccion_rapida.sin_dinero = true
			}

			if(!status_ticket){
				data.menu.extraccion_rapida.sin_papel = true
				data.footer.boton_claves = undefined
				data.menu.botones_menu.sin_papel = true
			}

		}else{

			if(!status_dispensador){
				data.menu.extraccion_rapida.sin_papel_tc = "sin_dinero"
			}

			if(!status_ticket){
				data.footer.boton_claves = undefined
			}

			if(!status_dispensador && !status_ticket){
				data.menu.extraccion_rapida.sin_papel_tc = "sin_dineronipapel"
			}

		}

		return data;

	},


	setMenuVg:function(data){

		data.vg_text={}
		var VG_habilitado = VG.enable || false
		var primer_ingreso = Vars.get("primer_ingreso",false)
		var status_dispensador = CheckDevice.CheckHabilitado("dispensador")
		var status_ticket = CheckDevice.CheckHabilitado("ticket_usuario")
		var titulo = "Has ingresado correctamente.";


		if(!status_dispensador){
			titulo = "El cajero no tiene dinero. No vas a poder hacer extracciones.";
			var listable = vghelper.buildList([["Sí deseas consultar tu saldo presioná 2 en el teclado numérico.","ev_ssfw_btn_consulta_vg",2],["Sí deseas modificar tu clave, presioná 3.","ev_ssfw_cambio_pin",3],["Para salir, presioná la tecla cancelar.","ev_ssfw_salir",8]])
			data.vg_list = {}
			data.vg_list.listable  = listable;
		}

		if(!status_ticket){
			titulo = "El cajero no tiene papel. No vas a poder imprimir comprobantes.";
			var listable = vghelper.buildList([["Para extraer dinero presioná 1.","ev_ssfw_otro_importe",1],["Sí deseas consultar tu saldo presioná 2.","ev_ssfw_btn_consulta_vg",2],["Para salir, presioná la tecla cancelar.","ev_ssfw_salir",8]])
			data.vg_list = {}
			data.vg_list.listable  = listable;
		}

		if(!status_dispensador && !status_ticket){
			titulo = "El cajero no tiene dinero ni papel. No vas a poder imprimir comprobantes ni realizar extracciones.";
			var listable = vghelper.buildList([["Para oir tu saldo, presiona 2.","ev_ssfw_btn_consulta_vg",2],["Para salir, presioná la tecla cancelar.","ev_ssfw_salir",8]])
			data.vg_list = {}
			data.vg_list.listable  = listable;
		}

		if(primer_ingreso){
			data.vg_text.text = titulo
			Vars.remove("primer_ingreso");
		}else{
			data.vg_text.text = "Estas en el menu principal "
		}

		if(VG_habilitado){
			var icono_sin_vg = "<i class='prisma volumen_off right naranja'></i>"
			data.menu.botones_menu.boton_transferir.texto = Idioma.txt("transferir")+" "+icono_sin_vg;
			data.menu.botones_menu.boton_depositar.texto = Idioma.txt("depositar")+" "+icono_sin_vg;
			data.menu.botones_menu.boton_mas_operaciones.texto = Idioma.txt("mas_operaciones")+" "+icono_sin_vg;
			data.menu.botones_menu.boton_pagar.texto = Idioma.txt("pagar")+" "+icono_sin_vg;

			Vg_handler.setupRead(15000);

		}

		return false;
	},

	esBiometria: function(){
		return Vars.get("biom_of",false)
	},


	esBiomAnses: function(){
		return Vars.get("tipo_menu", "BIOMETRIA") == "BIOMETRIA" ? true : false;
	},


	swtichTipoBiometria: function(data){
		var dni = Vars.get("dni_biometria", "");
		var menu = Vars.get("tipo_menu", "BANELCO");
		switch(menu) {
		    case "BANELCO":
		    	data.properties.opcode = "ABBB    ";
		    	break
		    case "LINK":
		    	data.properties.opcode = "CBBB    ";
		    	this.setTrackIIBiometriaLink(dni);
		    	break
		    case "BIOMETRIA":
		    	data.properties.opcode = "G       ";
				break
		    default:
		    	console.log("se fue por un default... ")
		    	break
		}


		data.properties.send_track_1 = false;
		data.properties.buffer_B = dni;

		return data;

	},


	setTrackIIBiometria: function(tarjeta_seleccionada){
		var track_2 = tarjeta_seleccionada.trim()
		track_2 = ";" + track_2 + "=000000000000000000?"

		ndcdata.putStringVal(2043, track_2)
		
		return false 

	},

	setTrackIIBiometriaLink: function(dni){
		var dni;
		var control = "00000000";
		var track_2 = ";99995892" + control.slice(dni.length) + dni
		track_2 = track_2 + "=00000000000000000000?"

		ndcdata.putStringVal(2043, track_2)
		
		return false 

	},

	setTarjetaVirtual : function(){
		XFSHelpers.readRegistry("Track 2 Data", undefined, "SOFTWARE\\NCR\\Advance NDC\\Extensions\\Cardless Transaction").then(function(data){
			console.error("tarjeta virtual ",data);
			track_2 = data;
			ndcdata.putStringVal(2043, track_2);
		});
		return false
	},

	switchPinBiometrico:function(){
		var cuenta_seleccionada = Vars.get('cuenta_link')

		if(cuenta_seleccionada.seg_f == "S")
			return "ndc/tx_biometria_opfinanceras/sta_ndc_ingreso_pin_biometrico"
		
		return "ndc/tx_extraccion/sta_ndc_tr_extraccion_link_biom"
	
	}
}
