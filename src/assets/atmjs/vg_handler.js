var Vg_handler = {

//Funcion para iniciar la ejecucion del VG en la aplicacion
vg_init: function(){

    VG.enable= false;
    VG.reset(); //Esta funcion es la que establece el idioma del  VG, No se puede remover.
    VG.volumeUp();
    VG.volumeUp();
    VG.volumeUp();
    VG.volumeUp();

    //Funcion que chequea en cierto intervalo de tiempo si los audifonos han sido conectados o no, para asi poder establecer un mensaje (bien sea publico o privado)
    // y saber por que via sera transmitido (altavoz o auriculares)
    var check_registry = function() {
    var audio_state = VG.audioState();
    var sound_jack_state = States.getProperty("soundjack_state", 0);

        if(audio_state!=sound_jack_state) {

            States.setProperty("soundjack_state", audio_state);

            if(audio_state==1) {
                Vg_handler.audio_connected();
            }

            if(audio_state==2) {
                Vg_handler.audio_disconnected();
            }
        }
    }


   States.stateInterval(check_registry, 500);

        try{
            var datosCajero = JSON.parse(ndctools.retrieveScreen(48,5));
        }catch(e){
            console.error("[ERROR] de Parseo de datosCajero")
        }
        var grupo = datosCajero.grupo;

        grupo = grupo.substring(4,7); //se sustrae información del tipo de carga

        if((grupo != 500)&&(grupo != 505)){
            Vg_handler.cancelVG();
            States.setProperty("idle_txt"," "); //sí no corresponde a ningún valor, no debería decir nada
            Vars.set("carga_no_vidente",false, true);
        }else{
            if(ndcdata.getIntVal(1250)==4){
            States.setProperty("idle_msj", Vg_handler.setupVGPublic())
            Vars.set("carga_no_vidente",true,true);
            }
        }
},

audio_connected : function() { //funcion que establece los parametros para VG si los  audifonos son conectados
        try{
            var datosCajero = JSON.parse(ndctools.retrieveScreen(48,5));
        }catch(e){
            console.error("[ERROR] de Parseo de datosCajero")
        }

        var grupo = datosCajero.grupo;
        grupo = grupo.substring(4,7);
        if((grupo != 500)&&(grupo != 505)){
            console.log("VG Desactivado");
            VG.enable = false;
        }else{
            VG.enable = true
            States.setProperty("speak_idle_message", false);
            VG.cancel();
            VG.privateAudio().then(function() {
                VG.volumeUp();
                VG.volumeUp();
                VG.volumeUp();
                VG.volumeUp();
                //console.log("leyendo audio privado");
            });
    
            //return  "ssfw/vg/sta_ssfw_vg_config"
    
           actual_sc = ndcdata.getIntVal(1005); //siempre da 65
            if (actual_sc == 65 && ndcdata.getIntVal(1250) != 4 ){
                Vg_handler.setupVGOutService();
            }
            else if (actual_sc == 65 && ndcdata.getIntVal(1250) == 4 ) {
                States.setProperty("idle_msj", Vg_handler.setupTarjeta())
                States.getProperty('idle_msj')
            }
        }
    },

audio_disconnected: function() {  //funcion que establece los parametros para voz publica (VG no activo)

    States.setProperty("speak_idle_message", true);
    VG.cancel();
    VG.publicAudio().then(function() {
        VG.volumeUp();
        VG.volumeUp();
        VG.volumeUp();
        VG.volumeUp();

        if(ndcdata.getIntVal(1250)==4){ //Verifica que el cajero se encuentre en servicio

            try{
                var datosCajero = JSON.parse(ndctools.retrieveScreen(48,5));
            }catch(e){
                console.error("[ERROR] de Parseo de datosCajero")
            }
            
            var grupo = datosCajero.grupo;
            grupo = grupo.substring(4,7); //se sustrae información del tipo de carga

            if((grupo!=500)&&(grupo!=505)){
                Vg_handler.cancelVG();
                States.setProperty("idle_txt"," "); //sí no corresponde a ningún valor, no debería decir nada
            }else{
                States.setProperty("idle_msj", Vg_handler.setupVGPublic())
                States.getProperty('idle_msj')

            }
        }

    });


},

setupVGPublic: function(){
    this.cancelVG();
    this.timeoutID = window.setInterval(function() {
        VG.readText("Bienvenido a la red de cajeros Banelco. Este cajero cuenta con ayuda de voz, para iniciarla, insertá tus auriculares y seguí las instrucciones")
    }, 12000);
},

setupVGOutService: function(){
    this.cancelVG();
    this.timeoutID = window.setInterval(function() {
        VG.readText("Este cajero se encuentra fuera de servicio")
    }, 8000);
},

setupTarjeta: function(){
    this.cancelVG();
    this.timeoutID = window.setInterval(function(){
        VG.readText("Ingresá tu tarjeta para continuar")
    }, 8000)
},

setupRead: function(segundos){
    this.cancelVG();
    this.timeoutID = States.stateInterval(function(){VG.read(" ")}, segundos);

},

cancelVG: function() {
    if(typeof this.timeoutID == "number") {
      window.clearInterval(this.timeoutID);
      delete this.timeoutID;
    }
  }

}