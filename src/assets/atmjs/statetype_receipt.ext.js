/**
    * @name Receipt
    * @namespace Receipt
    * @description Tipo de estado que maneja la impresion de recibos

    * @type {statetype}
*/
States.StateTypes["Receipt"] = function (statedata) {
	
	/* 	
	 TODO: ESTO GENERA ERROR EN PRISMA, REVISAR CON DESARROLLO NCR
	if (!Vars.get("module_ptr_available", false)) {
		States.handleEvent("print_ok");
		return;
	} */

    var ptr = new XFSDevice("ptr"); 
    var receipt_server = null;

    ptr.available()
            
    .then(function (data) {
        if (data.available == false) {
            throw "printer_error";
        }
    })

    .then(function () {
        return XFSHelpers.readRegistry("receipt_server");
    })

    .then(function (server) {
        receipt_server = server;
        /**
            * @memberof Receipt
            * @event displayScreen
            * @screens printing - Pantalla de aviso que se está imprimiendo
        */
        SSFramework.displayScreen(statedata.screens.printing);
        return ptr.extension("LoadSettings", null);
    })

    .then(function (settings) {
        /**
            * @memberof Receipt
            * @event buildReceipt
            * @build receipt - Construye el recibo correspondiente 
        */
        return SSFramework.buildReceipt(statedata.screens.receipt);
    })

    .then(function (result) {
        var host = SSUtil.getHost();
        if (receipt_server != "")
            host = receipt_server;
        result.url = host + result.url;
        
		//*** LA SIGUIENTE LINEA SE DESCOMENTO PARA QUE FUNCIONE EN PRISMA. VER CON DESARROLLO NCR
		return ptr.extension("PrintURL", result);
        
		//*** LAS SIGUIENTES LINEAS SE COMENTARON PARA QUE FUNCINE EN PRISMA. VER CON DESARROLLO NCR
		/* var data = {
            "method": "printWindows",
            "images": [{"url" : result.url,
        "dither" : false}]
          }
        return ptr.extension("WindowsPrinterGenericController", data); */
    })

    .then(function (result) {
        //result.hResult = 0;
        if (result.hResult != 0) {
            throw "printer_error";
        }
        return result;                   
    })
    .then(function(result) {
        /**
            * @memberof Receipt
            * @event handleEvent
            * @events print_ok - Evento disparado al finalizar la impresión
        */
        States.handleEvent("print_ok");                                   
    })

    .caught(function (ex) {
        States.handleStateError(ex, "hardware_error_ptr");
    });   
}