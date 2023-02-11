function table_umov_init() {

	var tabla = $("#tabla-umov");
	var cuentas = Vars.get("cuentas");
	var cta_indice = Vars.get("cta_indice");
	var comprobante = Vars.get("comprobante");

	var hoy = new Date();
	var ayer = new Date();;
	ayer.setDate(hoy.getDate() - 1);

	var fecha_hoy = hoy.getDate().toString() + "/" + pad2((hoy.getMonth()+1).toString());
	var fecha_ayer = ayer.getDate().toString() + "/" + pad2((ayer.getMonth()+1).toString());



	if(comprobante == undefined){
		comprobante = {};
		comprobante.umov = [];


		for (i = 0; i < comprobante.umov.length; i++) {
			var importe = "";
			var fecha = "";
			var descripcion = '<td class="bold font_55 collumn-13"><span>' + comprobante.umov[i].substring(5,17) + '</span></td>';
			importe = '<td class="bold collumn-14"><span>' + comprobante.umov[i].substring(17,30) + '</span></td></tr>';
			fecha = '<tr><td class="bold font_55 collumn-9"><span>' + comprobante.umov[i].substring(0,5) + '</span></td>';			
			tabla.html(tabla.html() + fecha + descripcion + importe);
		}
		return;
	}


    if(Vars.get("tipo_menu") == "ANSES" && Vars.get("consulta-actual") == "umov"){

		for (i = 0; i < comprobante.umov.length; i++) {
			var importe = "";
			var fecha = "";
			var descripcion = '<td class="bold font_55 collumn-13"><span>' + comprobante.umov[i].substring(5,17) + '</span></td>';

			if(comprobante.umov[i].substring(17,30).indexOf("-") == -1){
				importe = '<td class="bold verde collumn-14"><span>' + comprobante.umov[i].substring(17,30) + '</span></td></tr>';
			}else{
				importe = '<td class="bold rojo collumn-14"><span>' + comprobante.umov[i].substring(17,30) + '</span></td></tr>';
			}

			if(comprobante.umov[i].substring(0,5) == fecha_hoy){
				fecha = '<tr><td class="bold font_55 collumn-9"><span>Hoy</span></td>';
			}else{
				if(comprobante.umov[i].substring(0,5) == fecha_ayer){
					fecha = '<tr><td class="bold font_55 collumn-9"><span>Ayer</span></td>';
				}else{
					fecha = '<tr><td class="bold font_55 collumn-9"><span>' + comprobante.umov[i].substring(0,5) + '</span></td>';
				}
			}
			tabla.html(tabla.html() + fecha + descripcion + importe);
		};
		return;

	};


	if(cuentas[cta_indice].umov == undefined && comprobante != undefined && comprobante.umov != undefined ){
		cuentas[cta_indice].umov = comprobante.umov;
		Vars.set("cuentas", cuentas);
	};
    if(cuentas[cta_indice].umov != undefined){
		for (i = 0; i < cuentas[cta_indice].umov.length; i++) {
			var importe = "";
			var fecha = "";
			var descripcion = '<td class="bold font_55 collumn-13"><span>' + cuentas[cta_indice].umov[i].substring(5,17) + '</span></td>';

			if(cuentas[cta_indice].umov[i].substring(17,30).indexOf("-") == -1){
				importe = '<td class="bold verde collumn-14"><span>' + cuentas[cta_indice].umov[i].substring(17,30) + '</span></td></tr>';
			}else{
				importe = '<td class="bold rojo collumn-14"><span>' + cuentas[cta_indice].umov[i].substring(17,30) + '</span></td></tr>';
			}

			if(cuentas[cta_indice].umov[i].substring(0,5) == fecha_hoy){
				fecha = '<tr><td class="bold font_55 collumn-9"><span>Hoy</span></td>';
			}else{
				if(cuentas[cta_indice].umov[i].substring(0,5) == fecha_ayer){
					fecha = '<tr><td class="bold font_55 collumn-9"><span>Ayer</span></td>';
				}else{
					fecha = '<tr><td class="bold font_55 collumn-9"><span>' + cuentas[cta_indice].umov[i].substring(0,5) + '</span></td>';
				}
			}
			tabla.html(tabla.html() + fecha + descripcion + importe);

		};
	};
		
	

}
