function dropdown_init(textDefault, preselect,isFastCash) {
    var open = false;
    $('.dropdown').prepend('<span><span></span></span>');

    //console.log("inicializando drop en: " + preselect)
    if (preselect == null){
      Vars.set("cta_indice", preselect);
    } else {
      if(preselect > 0){
          Vars.set("cta_indice", parseInt(preselect)-1);
      } else {
          Vars.set("cta_indice",0);
      }
    }
    // cuando hago click en el boton del dropdown
    $('.dropdown').click(function(){
        clickea(this.id);
    });
    function clickea(idHtml){
        if(!open){
            $("body").append("<div class='dropdown-blocker'>");
            $('#'+idHtml+' > .contenedor').addClass("active"); //$('div',$('#'+idHtml+' > div')).fadeToggle(300);
            $('#'+idHtml).addClass("active");
            open = true;
        }
    }

    // cuando hago click en la opciÃ³n
    $('.dropdown div[data-dd]').click(function(e){
        $('#'+this.parentElement.parentElement.id+' div[data-dd].active').removeClass("active");
        $(this).addClass("active");
        if(open){
            cerrar(e,isFastCash);
            open = false;
        }
    });

    //cuando hago click en la pamtalla
    $(window).click(function(e) {
        if(open){
            cerrar();   
            open = false;
        }
    });

    $('.dropdown').click(function(event){
        if(open){
            event.stopPropagation();
        }
    });

    if((preselect!=null || preselect!=undefined)){
        $(".dropdown div[data-dd]:nth-child("+preselect+")").addClass("active");
        if(isFastCash){
            $('.dropdown span span').each(function(eachIndex){
                eachOption = $('.dropdown span span')[eachIndex];
                var cuentaEnPantalla = $("#"+eachOption.parentElement.parentElement.id+" div[data-dd]:nth-child("+preselect+")").text();
                cuentaEnPantalla = formatearNumeroCuenta(cuentaEnPantalla)
                $(eachOption).html(cuentaEnPantalla);
            })
        }else{
            $('.dropdown span span').each(function(eachIndex){
                eachOption = $('.dropdown span span')[eachIndex];
                $(eachOption).html($("#"+eachOption.parentElement.parentElement.id+" div[data-dd]:nth-child("+preselect+")").text());
            })
        }
    }

    if(textDefault!=null || textDefault!=undefined && textDefault.lenght>0){
        $(".dropdown span span").html(Idioma.txt(textDefault));
    }

    //funcion agregada por pato 
    $('#tipo').click(function(){
       var childs = $('#tipo > .contenedor').children().length;


       if(childs > 3) {
           var resto = (childs - childs/2) * 62;
           $('#tipo > .contenedor').css("top", -78 - resto + "px")
       }
    });

}

function formatearNumeroCuenta(cuentaEnPantalla){
    var arrayCuentaPantalla = cuentaEnPantalla.split(" ");
    if(arrayCuentaPantalla[3].length > 12){
        var numerosIniciales = arrayCuentaPantalla[3].slice(0,6);
        var numerosFinales = arrayCuentaPantalla[3].slice(-4);
        arrayCuentaPantalla[3] = " " + numerosIniciales + "..." + numerosFinales;
        cuentaEnPantalla = arrayCuentaPantalla.join(" ")
    }
    return cuentaEnPantalla;
}


function cerrar(e,isFastCash) {
    $(".dropdown-blocker").remove();
    if(e){
        e.stopPropagation();
        $('#'+ e.currentTarget.parentElement.parentElement.id +' .contenedor').toggleClass('active',function(e){
            if(isFastCash) e.target.textContent = formatearNumeroCuenta(e.target.textContent)
            $('#'+ e.currentTarget.parentElement.parentElement.id +' span span').html(e.target.textContent);
            $('#'+ e.currentTarget.parentElement.parentElement.id +' span span').attr("indice",e.target.attributes['indice'].value);
            Vars.set("cta_indice", parseInt(e.target.attributes['indice'].value));
            Vars.set('drop_type',e.currentTarget.parentElement.parentElement.id);
            States.handleEvent("ev_ssfw_cambio_cta");
        }(e));
    }else{
        $('.dropdown .contenedor').toggleClass('active');
    }
    $('.dropdown').removeClass("active");
    $('.dropdown > .contenedor').removeClass("active");
}


function owl_carrousel(){
    $(".rubros").owlCarousel({
      items: 1,
      center: true,
      loop: false   ,
      autoplay: false,
      autoWidth:true,
      slideBy: 6,
      smartSpeed: 100,
      nav: true,
      dots: false,
      // dots: true,
      navText: [
          "<i id='slider-prev' class='prisma izquierda'></i>",
          '<i id="slider-next" class="prisma derecha"></i>'
      ],
      // loop: true,
      animateOut: 'fadeOut'
    });

    $(".empresas").owlCarousel({
      items: 1,
      autoplay: false,
      slideBy: 6,
      smartSpeed: 100,
      nav: true,
      dots: false,
      // dots: true,
      navText: [
          "<i id='slider-prev' class='prisma izquierda'></i>",
          '<i id="slider-next" class="prisma derecha"></i>'
      ],
      // loop: true,
      animateOut: 'fadeOut',
    });

}

function false_carrousel(posi){
    $(".empresas").owlCarousel({
      startPosition:posi,
      items: 1,
      autoplay: false,
      slideBy: 0,
      smartSpeed: 100,
      nav: true,
      dots: false,
      // dots: true,
      navText: [
          "<i id='slider-prev' class='prisma izquierda'></i>",
          '<i id="slider-next" class="prisma derecha"></i>'
      ],
      // loop: true,
      animateOut: 'fadeOut',
    });

}

