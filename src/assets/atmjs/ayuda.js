var Ayuda = {
	activarAyudaVisual : function(){
		$("body").toggleClass("bnlc ayuda");
		if((States.CurrentState == "ATM/ndc/sta_ndc_start" || States.CurrentState == "ndc/sta_ndc_start") && $("body").hasClass("ayuda")){
			setTimeout(function(){ 
				if((States.CurrentState == "ATM/ndc/sta_ndc_start" || States.CurrentState == "ndc/sta_ndc_start") && $("body").hasClass("ayuda")){
					$("body").toggleClass("bnlc ayuda");
				}
			}, 10000);
		}
    },
    formatoAmountBuffer : function(importe, largo){
		var total = largo;
		if(importe.includes(',')){
			importe=importe.split(',')
			decimal=importe[1]+"00"
			decimal=decimal.slice(0,2)
			importe=importe[0]+decimal
		}else{
			importe=importe+"00"
		}
		var len_importe = importe.length;
		while ( total > len_importe )
		{
			importe = "0" + importe;
			total--;
		};	
		return importe;
	},
	reimprimirBuffer_b:function(indice,limit){
			var indice= parseFloat(indice) + 1
			var pagina = indice / limit

			if(pagina % 1 != 0)
				pagina= Math.floor(pagina)
			else
				pagina= parseFloat(pagina) - 1

			indice=parseFloat(indice) - (parseFloat(pagina) * limit) 

			var hm="00" + pagina
			var hs="00" + indice

			pagina= hm.slice(-2)

			indice= hs.slice(-2)

			var objeto={}
			objeto.indice = indice
			objeto.pagina = pagina

			return objeto 


	},

	
} 