function organizar_claves() { 	 
	var count_options = $(".otras_claves_option").length;
	var slides = Math.ceil(count_options / 6);
	var cantidadVisible = Math.ceil(count_options / slides);
	$('.owl-nav').css('height', 1 );
    $('.owl-nav').css('width', 1 ); 


	if(count_options <= 6) {  
		return wrapper(6);
	} else { 
		return coolWrapper(cantidadVisible,count_options);
	} 
} 

function wrapper(reque) {
	var i = 0, 
	    quotes = $(".claves_otras_claves").children('a'),
	    group;

	while ((group = quotes.slice(i, i += reque)).length) {
	    group.wrapAll('<div class="claves_otras_claves_slide" />');
	}
}

function coolWrapper(req,count_options) {   
	$(".claves").parent().css("width", "100%");
	$(".claves_otras_claves").addClass("owl-carousel");
	wrapper(req);
	clavesCarousel();

	if ( count_options == 16 || count_options == 13) {  
		if($(".mas_claves").length == 0) {
			$(".claves_otras_claves .owl-item:nth-of-type(2) .claves_otras_claves_slide")
				.children('a')
				.last() 
				.appendTo($(".owl-item:last-of-type .claves_otras_claves_slide"));
		} else {
			$(".claves_otras_claves .owl-item:nth-of-type(2) .claves_otras_claves_slide")
				.children('a')
				.last() 
				.insertBefore($(".mas_claves")) 
		}
	} 
}

function clavesCarousel(){
	$(".claves_otras_claves").owlCarousel({
	  items: 1,
	  autoplay: false,  
	  slideBy: 6,
	  smartSpeed: 100,
	  nav: true,
	  dots: false,   
	  navText: [
	      "<i id='slider-prev' class='prisma izquierda'></i>",
	      '<i id="slider-next" class="prisma derecha"></i>'
	  ],
	  // loop: true 
	}); 
}

function idAlfaOption(texto){
	var txt_letra = $("#txt_letra");
	var texto_ini = $("#texto_ini");
	var texto_fin = $("#texto_fin");
	var clave_alfa = Vars.get("clave_alfa");

	if(clave_alfa == undefined || clave_alfa == ""){
		clave_alfa = texto;
		Vars.set("clave_alfa", clave_alfa);
		txt_letra.html("segunda_letra");
		Idioma.agregarTexto("txt_letra");
		texto_ini.html("*");
		texto_fin.html("_");

	} else if(clave_alfa.length == 1){
		clave_alfa = clave_alfa + texto;
		Vars.set("clave_alfa", clave_alfa);
		txt_letra.html("tercera_letra");
		Idioma.agregarTexto("txt_letra");
		texto_ini.html("**");
		texto_fin.html("");

	} else if(clave_alfa.length == 2){
		clave_alfa = clave_alfa + texto;
		Vars.set("clave_alfa", clave_alfa);
		States.handleEvent("ev_ssfw_fin_alfa");
	}			
}


function idAlfaVG(texto){

	var clave_alfa = Vars.get("clave_alfa");

	if(clave_alfa == undefined || clave_alfa == ""){
		clave_alfa = texto;
		Vars.set("clave_alfa", clave_alfa);
		if(VG.enable)
			window.setTimeout(function(){
				States.refreshState()
			},3000)
		else
			States.refreshState()
	} else {
		clave_alfa =  texto;
		Vars.set("clave_alfa0", clave_alfa);
		States.handleEvent("ev_ssfw_fin_alfa");
	} 	
}

// Mayúsculas y minúsculas 
$(".btn-text").each(function() {
	//console.log("pato");
	var btnText = $(this).text();  

	// Reset todo a minúsculas
	var lowercase = btnText.toLowerCase();

	// Capitalizar primer letra
	String.prototype.ucfirst = function() {
	    return this.charAt(0).toUpperCase() + this.substr(1);
	} 
	$(this).text(lowercase.ucfirst());
	var btnTextNew = $(this).text(); 

	// Palabras o siglas específicas a mayúsculas
	var btnTextFinal = btnTextNew;     
    var diccionario = ['hsbc', 'icbc', 'afip', 'agip', 'anses'];
    
    for (var i = 0; i < diccionario.length; i++) {
        if (lowercase.indexOf(diccionario[i]) != -1) { 
            $(this).text(btnTextFinal.replace(diccionario[i],diccionario[i].toUpperCase())); 
        }
    } 
});