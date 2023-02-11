var Xfs_handler ={

    idc_start: function(){ //funcion que se encarga de saber si una tarjeta fue introducida o no ( verifica el modulo )
    var idc = new XFSDevice("idc");
    idc.getInfo("WFS_INF_IDC_CAPABILITIES").then(
        function(data){

            if (data.hResult == 0 ){
                Vars.set("idc_type", data.lpBuffer.fwType);
                Vars.set("card_in", true);

                if (data.lpBuffer.fwType != 1){
                    Vars.set("card_in", false);
                }
            }
        }).caught(function(err) {
            //console.error("Modulo IDC ",err);
            States.runState("ndc/sta_ndc_start");
        });
    },

    start: function(){  //se encarga de iniciar las funciones verificadoras de XFS

        this.idc_start();

    },


}