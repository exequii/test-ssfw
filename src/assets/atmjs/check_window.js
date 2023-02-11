var Check_window = {


   check_status:  function(){ //Funcion no implementada que sirve para verificar si la aplicacion fue minimizada o no.
        //Compruebo si está soportada la API de visibilidad
        if (typeof(document.hidden) != undefined) {
            //defino un manejador para el evento visibilitychange
            document.addEventListener("visibilitychange", cambiaVisibilidad, false);
        
        }
        else
            console.log("¡¡Este navegador no soporta la API de visibilidad!!");
    },
    
    cambiaVisibilidad: function(){
        if(document.hidden){

            //console.log("Se ha OCULTADO a las: " + new Date().toLocaleTimeString());
        }
        else {
            //console.log("Se ha MOSTRADO a las: " + new Date().toLocaleTimeString());
        }
 
    }



}