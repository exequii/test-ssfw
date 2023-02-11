var fallasATM = {
	sinDineroSinPapel : function(screen){
		var tipo_menu = Vars.get("tipo_menu","BANELCO")
		var sin_papel = !CheckDevice.CheckHabilitado("ticket_usuario");
		var sin_dinero = !CheckDevice.CheckHabilitado("dispensador");
		if(sin_papel == true && sin_dinero == true){
			screen.panel_info.contenido = [
				{
					"texto":"msj_sin_dinero_y_papel"
				},
				{
					"texto":"¿Querés ver otros cajeros cercanos?",
					"class":"small_8 mg-t-10 mg-b-10"
				}
			];
			screen.panel_info.img = "sin_dineronipapel";
		} else {
			if (sin_papel == true){
				screen.panel_info.contenido = [
					{
						"texto":"msj_sin_papel"
					}
				];
				screen.panel_info.img = "sin_papel";
			} else {
				if(sin_dinero == true){
					screen.panel_info.contenido = [
						{
							"texto":"msj_sin_dinero"
						},
						{
							"texto":"¿Querés ver otros cajeros cercanos?",
							"class":"small_8 mg-t-10 mg-b-10"
						}
					];
					screen.panel_info.img = "sin_dinero";
				}				
			}
		};
		if(Usuario.esBiometria() && sin_dinero ){
			screen.panel_info.boton_continuar = undefined 
		}

		if (tipo_menu == "BIOMETRIA" || Usuario.esBiometria()){
			screen.panel_info.contenido.splice(1,1);
			delete screen.panel_info.boton;
		}
	},

	errorSinDineroSinPapel : function(screen){
		var sin_papel = !CheckDevice.CheckHabilitado("ticket_usuario");  
		var sin_dinero = !CheckDevice.CheckHabilitado("dispensador"); 
		if(sin_papel == true && sin_dinero == true){
			screen.panel_info.contenido = [
					{
						"texto":"error_cajero_sin_dinero_y_papel"
					},
					{
						"texto":"¿Querés ver otros cajeros cercanos?",
						"class":"small_8 mg-t-10 mg-b-10"
					}
				]; 
			screen.panel_info.img = "sin_dineronipapel";
		} else {
			if (sin_papel == true){
				
				screen.panel_info.contenido = [
					{
						"texto":"error_cajero_sin_papel"
					},
					{
						"texto":"¿Querés ver otros cajeros cercanos?",
						"class":"small_8 mg-t-10 mg-b-10"
					}
				]; 
				screen.panel_info.img = "sin_papel";
			} else {
				// Vars.set("sin_dinero", true);
				if(sin_dinero == true){
					screen.panel_info.contenido = [
					{
						"texto":"error_cajero_sin_dinero"
					}/*,
					{
						"texto":"¿Querés ver otros cajeros cercanos?",
						"class":"small_8 mg-t-10 mg-b-10"
					}*/
				];
					screen.panel_info.img = "sin_dinero";	
				}				
			}
		};
	}

}