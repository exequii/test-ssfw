var Pagos = {
	TC : {

		enmascararNroTC : function(nro_tc){
			var result = "";
			if(typeof nro_tc != "string")
				nro_tc = nro_tc + '';
			for(var i = 0, left = nro_tc.length; i < nro_tc.length; i++, left--){
				if(i == 4 || i == 8 || i == 12)
					result += ' ';
				if(i < 4 || left <= 4)
					result += nro_tc[i];
				else
					result += 'X';
			}
			return result;
		},

		getScreenSubtitle : function(){
			var tipo_tc_a_pagar = Vars.get("tipo_tc_a_pagar").charAt(0).toUpperCase();
			////console.log("Subtitulo = "+ screen.titulos_icbc.subtitulo);
			if(tipo_tc_a_pagar == "V")
				return "pagar_tc_visa_icbc";
			else if(tipo_tc_a_pagar == "M")
				return "pagar_tc_master_icbc";
			else
				return "pagar_tc_amex_icbc";
		},

		resetDeudas : function(){
			Vars.set('deudas_tc',[]);
		},

		filtrarDeudas : function(tipo_tc){
			tipo_tc = tipo_tc.toUpperCase().charAt(0);
			var deudas_tc = Vars.get('deudas_tc') || [];
			var result = deudas_tc.filter(function(deuda_tc){
				return deuda_tc.fiid.charAt(0) == tipo_tc;
			});
			return result;
		},

		parsearDeudas : function(dh_msg){
			var cont_consultas_deudas = (Vars.exists("cont_consultas_deudas") ? Vars.get("cont_consultas_deudas") : 1);
			//var dh_msg = ndctools.retrieveScreen(48, 75);
			var respuesta = null;
			try{
				respuesta = JSON.parse(dh_msg);
			}
			catch(parseExc){
				//console.error("Error parseando el json de deudas TC: "+parseExc.message);
				//console.error("JSON crudo del DH: "+dh_msg);
				return false;
			}
			
			var deudas_tc = respuesta.r.d;

			var aux_deudas_tc = Vars.get('deudas_tc') || [];

			for(var d in deudas_tc){
				var deuda = deudas_tc[d];
				//Trimeo los strings
				for(var f in deuda){
					if(typeof deuda[f] == "string")
						deuda[f] = deuda[f].trim();
				}
				
				deuda.aceptaOtroImporte = (deuda.oi != undefined && (deuda.oi == 'S' || deuda.oi == 's'));

				if(typeof deuda.vto == "string" && !deuda.vto.includes('/')){
					var year = deuda.vto.slice(0,2);
					var month = deuda.vto.slice(2,4);
					var day = deuda.vto.slice(4,6);
					deuda.vto = day + '/' + month + '/' + year;
				}

				if(typeof deuda.i == "string"){
					deuda.importe = parseInt(deuda.i) / 100.0;
				}

				//Agrego a deudas existentes, pero antes verifico que NO exista ya
				var existe = false;
				for(var e in aux_deudas_tc){
					var deuda_existente = aux_deudas_tc[e];
					if(JSON.stringify(deuda) == JSON.stringify(deuda_existente)){
						existe = true;
						break;
					}
				}
				if(!existe)
					aux_deudas_tc.push(deuda);
			}

			//console.log("deudas tc: ",aux_deudas_tc);
			Vars.set('deudas_tc',aux_deudas_tc);
			return (respuesta.r.m == 1);
		}
	},

	/* rubros: arrecglo de rubros */
	Servicios : {

		Empresas : {},

		//Obtener descripcion del servicio a pagar
		getServiceDesc : function(){
			var deuda = Vars.get('deuda_seleccionada');
			var desc = (deuda.ds_e !== undefined ? deuda.ds_e : deuda.desc).trim();
			var result = (esp[desc] !== undefined ? esp[desc] : desc);
			return result;
		},

		getScreenSubtitle : function(incluir_importe){
			var deuda = Vars.get('deuda_seleccionada');
			var result = "";
			if(Vars.get("pagando_tarjeta_o_servicio") == "tarjeta")
			{
				result = Pagos.TC.getScreenSubtitle();
				if(esp[result] !== undefined)
					result = esp[result];
			}
			else
			{
				result = 'Pagar servicio: '+Pagos.Servicios.getServiceDesc();
				if( incluir_importe && deuda.i !== undefined){
					if(deuda.importe === undefined)
						deuda.importe = (parseInt(deuda.i) / 100.0);
					//if(deuda.importe !== undefined)
					if(deuda.importe > 0)
						result += ' $'+formatNumber(deuda.importe);
					//else
					//	result += '$ '+deuda.i_mostrar;
				}
			}
			return result;
		},

		agregarRubros : function(rubros){
			var array=[]
			var filter={}
			var obtenidos = Vars.get('rubros_servicios') || []
			obtenidos=obtenidos.concat(rubros)
			for (var i in obtenidos){
				filter[obtenidos[i].ind]=obtenidos[i]
			}

			for (var i in filter){
				array.push(filter[i])
			}

			array.sort(function(a,b){
				return a.ind.localeCompare(b.ind);
			});


			Vars.set('rubros_servicios', array)

		},

		agregarEmpresas : function(array_empresas,rubro){
			// var array=[]
			// var filter={}
			// var obtenidos = Vars.get('empresas_rubros') || []
			// obtenidos=obtenidos.concat(array_empresas)
			// for (var i in obtenidos){
			// 	filter[obtenidos[i].fiid]=obtenidos[i]
			// }

			// for (var i in filter){
			// 	array.push(filter[i])
			// }

			// Vars.set('empresas_rubros', array);
			// //console.log(array)
			// return array;

			var obtenidos = Vars.get('empresas_rubros') || [];
			//var rubro = Vars.get('rubro_seleccionado');
			var repetidos = 0;
			var agregadas = 0;

			for(var e in array_empresas){
				var empresa_nueva = array_empresas[e];
				//optimizo la data
				if(empresa_nueva.desc)
					empresa_nueva.desc = empresa_nueva.desc.trim()//.capitalize();
				//Busco en los obtenidos previamente
				var ya_existe = false;
				for(var o in obtenidos){
					var existente = obtenidos[o];
					if(empresa_nueva.fiid == existente.fiid || empresa_nueva.desc == existente.desc)
					{
						ya_existe = true;
						break;
					}
				}
				if(ya_existe){
					repetidos++;
				}
				else{
					obtenidos.push(empresa_nueva);
					agregadas++;
				}
			}
			//obtenidos.sort(function(a,b){
			//	return a.fiid.localeCompare(b.fiid);
			//});
			Vars.set('empresas_rubros', obtenidos);
			return (repetidos < array_empresas.length);

		},


		agregarRubrosAFIP : function(rubros){
			var obtenidos = Vars.get('subrubros_afip') || [];
			for(var r in rubros){
				var rubro_nuevo = rubros[r];
				//optimizo la data
				if(rubro_nuevo.desc)
					rubro_nuevo.desc = rubro_nuevo.desc.trim()//.capitalize();
					//console.log("rubros"+rubro_nuevo.desc);
				//Busco en los obtenidos previamente
				var ya_existe = false;
				for(var o in obtenidos){
					var existente = obtenidos[o];
					if(rubro_nuevo.ind == existente.ind || rubro_nuevo.desc == existente.desc)
					{
						ya_existe = true;
						break;
					}
				}
				if(!ya_existe){
					obtenidos.push(rubro_nuevo);
				}
			}
			Vars.set('subrubros_afip', obtenidos);
		},
	}
};