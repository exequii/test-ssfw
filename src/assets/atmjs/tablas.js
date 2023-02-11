function scroll_table(top_default){
	//Sacar stripped si hay 2
	if ($(".tabla tr").length < 4) {
		$(".tabla tr").addClass("no-stripped");
	};
	
	if(top_default!=undefined || top_default!=null){
		$('.tabla').scrollTop(top_default);
	}
	// variables 
	var tableH = $('.tabla').height(),
		tableW = $('.tabla').width(),
		trH = $('.tabla tr').height(),
		trL = $('.tabla tr').length,
		numOfTrVisible = tableH / trH;


	//function datavalue() {
	var esteData = $(".tabla_select").data("tabla-scroll");
	if (esteData == undefined) {
		datalenght = 4;
	} else {
		datalenght = esteData;
	}
	//};

	// scroll con botones
	$('a.abajo').click( function(filas) {
		SSFramework.initTimeout()
		var scrollPosition = $('.tabla').scrollTop();
		if ($('.tabla').scrollTop() + $('.tabla').innerHeight() < $('.tabla')[0].scrollHeight) {
			$('.tabla').animate({scrollTop: scrollPosition + (trH * datalenght) }, 50, 'linear');
		}
	});
	$('a.arriba').click( function(filas) {
		SSFramework.initTimeout()
		var scrollPosition = $('.tabla').scrollTop();
		if (scrollPosition != 0) {
			$('.tabla').animate({scrollTop: scrollPosition - (trH * datalenght) }, 50, 'linear');
		}
	});

	// Sombra
	$('.tabla').on('scroll', function() {
	    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
	        $(".fade-shadow").fadeOut(10);
	        States.handleEvent('ev_ssfw_scroll_down')
	    } else {
	      $(".fade-shadow").fadeIn(10);
	    }
	})

	// si hay 5 o menos movimientos, ocultar flechas, ensancha tabla y quita sombra	 
	if ((trL * trH) <= tableH) { 
		$('.tabla .right').hide(); 
		$('.tabla').css('height', 'auto');
		$('.tabla').css('width', '100%');
		$('.t-header').css('width', '100%');
		$('.fade-shadow').css('width', '100%');
		$('.tableScrollBlocker').css('width', '100%');
		$(".fade-shadow").remove();
		$(".tableScrollBlocker").remove();
	};  

	$('tr').click(function(){
		if($(this).find('td input[type="radio"]').val()){
			SSFramework.initTimeout();
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			$(this).find('td input[type=radio]').prop( "checked", true );
			var num=$(this).find('td input[type=radio]').val();
			Vars.set('cta_index',num);
            States.handleEvent('ev_ssfw_checked_cta');
		}
	});

}

function scroll_top(){
	return $('.tabla').scrollTop()
}

function scroll_only(){
	var ScrollableHeight = $(".scrollable").height()
	var checkHeight=$('#check-height').height()
	//console.log(checkHeight)
	$("#scrollUpClick").click(function(){
		SSFramework.initTimeout()
		var top= $(".scrollable").scrollTop()
	   	if(top-ScrollableHeight != 0  ){
		    $(".scrollable").animate({
		         scrollTop:  top-ScrollableHeight
		    })
	   	}
	})

  	$("#scrollDownClick").click(function(){
  		SSFramework.initTimeout()
   		var top= $(".scrollable").scrollTop()
 	    if(top+ScrollableHeight <= checkHeight){
	        $(".scrollable").animate({
	           scrollTop:  top+ScrollableHeight
	        })
 	    }
    })
}
