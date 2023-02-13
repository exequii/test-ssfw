var Depositos = {

    denomBloq: {},

    updateDenomBloq: function(obj) {
        if (obj.inhab !== undefined) {
            //console.log("Actualizando denominaciones inhabilitadas");
            Depositos.denomBloq = {};
            for (var i = 0; i < obj.inhab.length; i++) {
                var di = obj.inhab[i]; //di = denominacion inhabilitada
                if (Depositos.denomBloq[di.c] === undefined)
                    Depositos.denomBloq[di.c] = [];
                Depositos.denomBloq[di.c].push(parseInt(di.d));
            }
            //console.log("Denominaciones bloqueadas: ", Depositos.denomBloq);
        }
    },

    setRejectedNotes: function(properties) {
        if (Depositos.denomBloq["ARS"] !== undefined) {

            properties.rejectedNotes = [];

            for (var i = 0, db = Depositos.denomBloq["ARS"]; i < db.length; i++) {
                properties.rejectedNotes.push({
                    currency: "ARS",
                    denom: db[i]
                });
            }

            ////console.log("properties.rejectedNotes: ",properties.rejectedNotes);
        }
        if (Depositos.denomBloq["USD"] !== undefined) {

            for (var i = 0, db = Depositos.denomBloq["USD"]; i < db.length; i++) {
                properties.rejectedNotes.push({
                    currency: "USD",
                    denom: db[i]
                });
            }


        }

        //console.log("to do properties.rejectedNotes: ", properties.rejectedNotes);
    },

    consultarCuentaPropia: function(stateData) {

        var events = {}
        var cuenta = Vars.get("cuenta_selected")
        stateData.properties.buffer_B = "C" + cuenta.t;
        stateData.properties.buffer_C = cuenta.n;
        stateData.properties.opcode = "D A G   ";
        events.nextA1O = function(){

            //Json with the account inside
            try{
                var titularidad = JSON.parse(ndctools.retrieveScreen(48, 75));
            }catch(error){
                console.error("[ERROR] de Parseo de Datos de Titularidad")
                Vars.set("msj_error", "No es posible realizar la operación en este momento. Por favor intente mas tarde.");
                return "ssfw/sta_ssfw_msj_error"
            }
            //Permite
            //efectivo y cheque = "0";
            //efectivo sin cheque = "1";
            //sin efectivo y cheque = "2";
            //sin efectivo y sin cheque = "3";


            //Type of deposit
            var typeDeposit = Vars.get("tipo_deposito");

            //Is typeDeposit is Efectivo and titularidad.titularidad.Permite is 0 or 1
            if(typeDeposit == "efectivo" && (titularidad.titularidad.permite == "0" || titularidad.titularidad.permite == "1")){
                //Go to
                return "ndc/tx_depositos/sta_ndc_ingreso_billetes"

            //Is typeDeposit is Cheque and titularidad.titularidad.Permite is 0 or 2
            }else if(typeDeposit == "cheques" && (titularidad.titularidad.permite == "0" || titularidad.titularidad.permite == "2")){
                //Go to
                return "ndc/tx_depositos/sta_ndc_ingreso_cheques"

            //Is Titularidad.Permite
            }else{
                //Error Message
                Vars.set("msj_error", "No es posible realizar la operación en esta cuenta. Por favor, verificá en la sucursal del banco el estado de esta cuenta.");
                //Go to
                return "ssfw/sta_ssfw_msj_error"
            }
        };
        //Add NextA10 event to the State
        stateData.events = $.extend(stateData.events, events)

    },

    depoSucCta:function(){
        var fiid = Vars.get("info_cajero").fiid
        if( fiid == "RIOP" || fiid == "FNCS"){
            return true
        }
        return false
    },

    consultarCuentaCardless: function(stateData) {
        var events = {}

        if (Vars.get("banco_dest") == "otro"  || (  Vars.exists("depositos") && Vars.get('depositos',{}).mod == "U") ) {
            stateData.properties.buffer_B = ( Vars.exists("send_track_2") && !Vars.get("send_track_2") ) ? "UO" :"U"
            stateData.properties.buffer_C = Vars.get("cbu");
        } else {
            var tipo = Vars.get("tipo_cuenta");
            tipos = [
                // "22",//"Cuenta especial en dolares",
                // "02",//"Cuenta corriente en dolares",
                // "12",//"Caja de ahorros en dolares",
                "21", //"Cuenta especial en pesos",
                "01", //"Cuenta corriente en pesos",
                "11" //"Caja de ahorros en pesos"
            ];

            if(tipos[tipo] == "21"){
                Vars.set("tipo_cuenta_especial", tipos[tipo]);
            }
            stateData.properties.buffer_B = "C" + tipos[tipo];
            stateData.properties.buffer_C = Vars.get("cuenta","");
        }
        stateData.properties.send_track_2 = Vars.exists("send_track_2") ? Vars.get("send_track_2") : false;
        stateData.properties.opcode = "D A G   ";

        events.nextA1O = function(){

            //Json with the account inside
            try{
                var titularidad = JSON.parse(ndctools.retrieveScreen(48, 75));
            } catch(error){
                console.error("[ERROR] de Parseo de Datos de Titularidad")
                Vars.set("msj_error", "No es posible realizar la operación en este momento. Por favor intente mas tarde.");
                return "ssfw/sta_ssfw_msj_error"
            }
            //Permite
            //efectivo y cheque = "0";
            //efectivo sin cheque = "1";
            //sin efectivo y cheque = "2";
            //sin efectivo y sin cheque = "3";

            //Type of deposit
            var typeDeposit = Vars.get("tipo_deposito");

            //If the typeDeposit not correspond with the Titularidad.titularidad.permite
            if((typeDeposit == "efectivo" && (titularidad.titularidad.permite == "3" || titularidad.titularidad.permite == "2")) || (typeDeposit == "cheques" && (titularidad.titularidad.permite == "3" || titularidad.titularidad.permite == "1"))) {
               //Error Message
                Vars.set("msj_error", "No es posible realizar la operación en esta cuenta. Por favor, verificá en la sucursal del banco el estado de esta cuenta.");
                //Go to
                return "ssfw/sta_ssfw_msj_error"
            }else{
                //Go to
                return "ssfw/cardless/tx_depositos/sta_ssfw_deposito_titularidad";
            }
        };

        //Add NextA10 event to the State
        stateData.events = $.extend(stateData.events, events)

    },

    titularidadCuentaPropia: function() {
        try{
            var titularidad = JSON.parse(ndctools.retrieveScreen(48, 75))
        }catch(error){
            console.error("[ERROR] de Parseo de Datos de Titularidad")
		}
        

        titularidad = titularidad.titularidad;
        //console.log(titularidad);
        Vars.set("titularidad", titularidad)
        Depositos.updateDenomBloq(titularidad);
    },

    paraCuentasTercerosSacaSaldo: function(obj) {
        /*//console.log("sin_saldo");
        //console.log(Vars.get("sin_saldo"));*/
        if (Vars.get("sin_saldo") == true) {
            delete obj.receipt[0]["SU SALDO ES [(][*][)]"];
            delete obj.receipt[0]["SU SALDO ES"];
            delete obj.receipt[0]["SALDO"];
        }
        return obj;
    },

    getReceipt: function(receiptdata, incluir_cheques) {
        //receiptdata es un arreglo de strings. Cada string representa un (1) ticket.
        //cada string del arreglo de "tickets" contiene separadores de linea (CR-LF),
        //que separan las lineas del ticket.
        var obj = {};
        obj.receipt = [];
        var fiid = Vars.get("info_cajero").fiid;
        ////console.log(JSON.stringify(receiptdata));
        //console.log("receiptdata", receiptdata);
        try {
            for (var i in receiptdata) {
                var data = {};
                data.lines = receiptdata[i].split("\n");
                obj.receipt.push(data);
            }
        } catch (e) {
            //console.log(e);
        }

        var paginas = obj.receipt.length;
        var ticketOK = data.lines;
        var comprobante = Vars.get("comprobante");

        //console.warn('ticketOK', ticketOK)

        //console.warn("paginas", paginas)
        //console.warn("obj.receipt", obj.receipt)

        if (comprobante == undefined)
            comprobante = {};

        var cardless = Vars.get("cardless");
        ////console.log("cardless ? "+(cardless ? "true" : "false"));
        var nroTarjRegEx = /^NUMERO DE TARJETA$/;
        var lineaTarjeta = -1;

        for (var i in obj.receipt) {
            ////console.log(obj.receipt);
            var data = parseTicketConsultas(obj.receipt[i]);
            //data.fromHost = "----------------------";
            data.ticket = ticketOK;
            for (var j = 0; j < data.ticket.length; j++) {
                var linea = data.ticket[j];
                if (linea.includes("CANT. DE CHEQUES")) {
                    ////console.log("Encontramos cantidad de cheques!: '{0}'".format(linea));
                    linea = Depositos.Cheques.manipularLineaCheques(linea);
                }
                if (cardless && linea.includes("NUMERO DE TARJETA")) {
                    lineaTarjeta = j;
                    ////console.log("Encontre numero de tarjeta en la linea!!");
                    //data.ticket[j] = formatTicketLine("NRO. DE TRANS.");
                    //j++;
                    //data.ticket[j] = formatTicketLine(data.TRANS);
                    data.ticket[j] = formatTicketLine(linea);
                } else {
                    data.ticket[j] = formatTicketLine(linea);
                }
            }
            obj.receipt[i] = data;
        }

        if (obj.receipt[0].CAJERO != undefined)
            comprobante.cajero = obj.receipt[0].CAJERO;
        if (obj.receipt[0].DOMICILIO != undefined)
            comprobante.direccion = obj.receipt[0].DOMICILIO;
        if (obj.receipt[0].FECHA != undefined)
            comprobante.fecha = obj.receipt[0].FECHA;
        if (obj.receipt[0].HORA != undefined)
            comprobante.hora = obj.receipt[0].HORA;
        if (obj.receipt[0].SALDO != undefined)
            comprobante.saldo = obj.receipt[0].SALDO;
        if (obj.receipt[0].DISPONIBLE != undefined)
            comprobante.disponible = obj.receipt[0].DISPONIBLE;
        if (obj.receipt[0].TRANS != undefined)
            comprobante.trans = obj.receipt[0].TRANS;
        if (fiid != undefined) {
            for (k= 0; k < obj.receipt.length; k++){
                obj.receipt[k].fiid = fiid;
            }
            comprobante.fiid = fiid;
        }
        ////console.log("comprobante: ");
        ////console.log(comprobante)

        Vars.set("comprobante", comprobante);

        obj.receipt[0].onus = (Vars.get("crd_fiid") == Vars.get("term_fiid"));

        obj.name = "banelcoTicketParserPlano.html";

        //Agrego los cheques que correspondan a cada recibo
        //Parsea los tickets y maneja las imagenes de los cheques
        if (incluir_cheques && Depositos.Cheques.CacheAceptados != undefined && Depositos.Cheques.CacheAceptados.length > 0) {
            var receiptObj = obj.receipt[0];
            var chequesPrimerTicket = 2;
            var chequesPorTicket = 4;
            var hash = null;

            //Busco el hash, desde la ultima linea hacia la primera
            for (var l = receiptObj.ticket.length - 1; l >= 0; l--) {
                var linea = receiptObj.ticket[l].trim();

                if (linea.search(/^[A-F0-9]{40}/i) >= 0) {
                    ////console.log("Consegui el hash!!! " + linea);
                    hash = linea;
                    receiptObj.HASH = linea;
                    receiptObj.ticket.splice(l++, 1);
                    break;
                }
            }


            //agrego los cheques a cada recibo
            for (var c = 0; c < Depositos.Cheques.CacheAceptados.length; c++) {
                var receipt_index = (c < chequesPrimerTicket ? 0 : Math.floor((c - chequesPrimerTicket + chequesPorTicket) / chequesPorTicket));

                if (obj.receipt[receipt_index] == undefined) {
                    //no existe el recibo. Lo creamos en base al primero,
                    // y solo con los campos que necesitamos
                    var newReceipt = {
                        FECHA: receiptObj.FECHA,
                        HORA: receiptObj.HORA,
                        CAJERO: receiptObj.CAJERO,
                        TRANS: receiptObj.TRANS,
                        fiid: fiid,
                        ticket: [
                            receiptObj.ticket[0], //esta linea contiene la fecha, hora y numero de cajero
                            " ",
                            "NRO. DE TRANS: " + receiptObj.TRANS,
                            " " //,
                            //hash
                        ]
                    };
                    if (lineaTarjeta >= 0) {
                        newReceipt.ticket.push(receiptObj.ticket[lineaTarjeta]);
                        newReceipt.ticket.push(receiptObj.ticket[lineaTarjeta + 1]);
                    }
                    obj.receipt[receipt_index] = newReceipt;
                    paginas++;
                }

                if (obj.receipt[receipt_index].CHEQUES_IMGS == undefined)
                    obj.receipt[receipt_index].CHEQUES_IMGS = [];

                //La siguiente truchada se heredo de RIOP
                //es trucho porque estamos armando (desde una libreria javascript) codigo HTML,
                //el cual llega a una vista (banelcoTicketParser, por ejemplo) que TAMBIEN arma
                //HTML. Lo ideal es que desde aca enviemos SOLO los parametros que necesita el HTML
                // (ejemplo: source de las imagenes, cantidad de cheques, etc)
                obj.receipt[receipt_index].CHEQUES_IMGS.push("<div class=\"fila\"><img class=\"img-cheque\" src=\"file:\\\\\\C:\\xfs\\cheque" + c + ".bmp\"></div>\n");
            }


            for (var r in obj.receipt) {
                obj.receipt[r].PAGINA = (parseInt(r) + 1) + "/" + paginas;
                if (hash != null)
                    obj.receipt[r].HASH = hash;
            }
        }

        return obj

    },

    pieDeTickets: function() {

        return Nrcpt.pieDeTicketsLeyenda() + "</br>" + Nrcpt.pieDeTicketsPie();
    },

    validarMontoCheque: function(cheques) {

        var total = "0"
        for (var i in cheques) {
            if (cheques[i].Monto != undefined)
                total = (parseFloat(total) + parseFloat(("" + cheques[i].Monto).replace(",", "."))).toFixed(2)
        }

        total = ("" + total).replace(".", "")
        //console.log("total", total)

        return total.length
    },

    Cheques: {

        dataCache: {},     //corresponde al get chequedata original

        Cache: null,        //corresponde a un get chequedata que luego es modificado
        CacheRechazados: null,
        CacheAceptados: null,
        NuevosRechazados: null,

        cache_monto: null,

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:44:10
         * @Desc: Realiza un get del chequedata y setea datacache.
         */
        cachedCheques: function() {
            this.dataCache = JSON.parse(chequedata.get());
        },

        getFrontImageURL: function(cheque_object) {
            var lastSlash = cheque_object.FrontImageReference.lastIndexOf("\\");
            var lastDot = cheque_object.FrontImageReference.lastIndexOf(".");
            if (lastSlash < 0) {
                //console.error("la ruta a la imagen del cheque no contiene backslash? " + cheque_object.FrontImageReference);
                lastSlash = cheque_object.FrontImageReference.lastIndexOf("/");
            }
            if (lastSlash > 0)
                cheque_object.FrontImageSrc = "chequeImage/" + cheque_object.FrontImageReference.substring(lastSlash + 1, lastDot + 4);
            else
                cheque_object.FrontImageSrc = cheque_object.FrontImageReference;
            return cheque_object.FrontImageSrc;
        },

        getFrontImageURLFull : function(array){

            var cheques = array;
            for (var cheque in cheques){
                var lastSlash = cheques[cheque].FrontImageReference.lastIndexOf("\\");
                var lastDot = cheques[cheque].FrontImageReference.lastIndexOf(".");
                if(lastSlash < 0){
                //  //console.error("la ruta a la imagen del cheque no contiene backslash? "+cheques[cheque].FrontImageReference);
                    lastSlash = cheques[cheque].FrontImageReference.lastIndexOf("/");
                }
                if(lastSlash > 0){
                    cheques[cheque].FrontImageSrc = "chequeImage/" + cheques[cheque].FrontImageReference.substring(lastSlash + 1, lastDot + 4);
                }
                else{
                    cheques[cheque].FrontImageSrc = cheques[cheque].FrontImageReference;
                }

                if (this.cache_monto != null && this.cache_monto[cheque])
                    this.Cache[cheque].Monto = this.cache_monto[cheque].Monto

            }

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:02:25
         * @Desc: Setea this.Cache que contiene un array de todos los cheques ingresados, invoca el seteo
         * de ceques aceptados y rechazados
         * @return: {array de objeto} devuelve this.Cache con todos los cheques ingresados
         */

        getChequesIngresados: function() {

        //this.Cache = null;
        this.CacheRechazados = null;
        this.CacheAceptados = null;
        this.NuevosRechazados = null;

            var obj = JSON.parse(chequedata.get());

            if (obj != null && obj.cheques != undefined) {
                //si ya se ha ingresado cheques previamente, ingresa en el objeto cache los que
                //no se han ingresado filtrandolo por el cmc7(codeline)
                if (this.Cache != null && this.Cache != undefined) {
                    cacheString = JSON.stringify(this.Cache);

                    for (var key in obj.cheques) {
                        var code = obj.cheques[key].CodeLine;

                        if (!cacheString.includes(code)) {
                            this.Cache.push(obj.cheques[key]);
                            // //console.log("code: ",code);
                        }
                    }

                } else {
                    this.Cache = obj.cheques;
                }

                this.getFrontImageURLFull(this.Cache);
                this.setCacheAceptados();
                this.setCacheRechazados();
            } else {
                this.Cache = [];
            }
            return this.Cache;
        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:31:18
         * @Desc: Setea la propiedad CacheAceptados que corresponde a un array de objetos de cheques aceptados
         */
        setCacheAceptados : function(){
            var data = this.Cache
            this.CacheAceptados = data.filter(function (cheque){
                return (cheque.Location == 0) ;
            });
        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:32:44
         * @Desc: Setea la propiedad CacheRechazados que corresponde a un array de objetos de cheques rechazados
         */
        setCacheRechazados : function(){
            var data = this.Cache
            this.CacheRechazados = data.filter(function (cheque){
                return (cheque.Location != 0) ;
            });
        },

        manipularLineaCheques: function(linea) {
            var end = -1;
            var start = -1;
            var valor = null;
            for (var i = linea.length - 1; i >= 0; i--) {
                var c = linea.charAt(i);
                if (c >= '0' && c <= '9') {
                    if (end < 0)
                        end = i;
                } else if (end >= 0) {
                    start = i;
                    valor = parseInt(linea.substring(start + 1));
                    //console.log("Cheques a depositar: ", valor);
                    return linea.substring(0, i + 1) + (valor /*- 1*/ );
                    break;
                }
            }
            return linea;
        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:33:19
         * @Desc: Setea el chequedata, este debe ejecutarse antes de confirmar el deposito.
         * Tomar en cuenta que se debe setear "CurrencyID": "", "Value": 0 para que no de error el chequedata.set
         */
        setChequeData: function() {

            var obj = JSON.parse(chequedata.get());
            var monto_cheque_img = Vars.get("monto_cheque_img", [])
            ////console.warn(Vars.get("monto_cheque_img"));
            if (obj != null && obj.cheques != undefined) {
                for (var c in obj.cheques) {
                    obj.cheques[c]["ConsumerEnteredAmount"] = monto_cheque_img[c];
                    ////console.warn(monto_cheque_img[c]);
                    //La siguiente tizado de las imagenes escaneadas al banco
                    ////console.error("Cheque Object:", obj);
                    ////console.warn("rai test" + JSON.stringify(obj.cheques[c]["ConsumerEnteredAmount"]));
                    //chequedata.set(JSON.stringify(obj));
                    ////console.error("chequedata.set exitoso!");
                }
                //La siguiente tizado de las imagenes escaneadas al banco
                chequedata.set(JSON.stringify(obj));
                //console.log("chequedata.set exitoso!");
            } else {
                //console.error("chequedata.get NO devolvio cheques!");
            }

        },

        transformImages: function() {

            if (this.CacheAceptados != null && this.CacheAceptados != undefined) {
                for (var cheque in this.CacheAceptados) {
                    //A continuación genero, asincronamente, las imagenes convertidas para los recibos de pago
                    var reqparams = {
                        path: this.CacheAceptados[cheque].FrontImageReference.replace(/,/g, ""),
                        index: cheque
                    };
                    SSFramework.grabResource("transformImages", reqparams).then(
                        function() {
                            Depositos.Cheques.CacheAceptados[cheque].transformed = true;
                            Depositos.Cheques.CacheAceptados[cheque].FrontImageTransformed = "  " + cheque + ".bmp";
                            //console.log("Image transformed")
                        },
                        function() {
                            //console.log("Cannot transform Image")
                        }
                    );

                }
            }

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:34:56
         * @Desc:  Setea los segundos del timer4
         */
        setTimer4: function(segundos) {
            ndcdata.putStringVal(3130, segundos);
        },


        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:35:43
         * @Desc:  Metodo para obtener el valor de los segundos del timeout del timer4
         */
        getTimer4: function() {
             return ndcdata.getIntVal(3130);
        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:37:28
         * @Desc: Se utiliza para inicializar los objetos y revomer variables, para que no se solapen con
         * datos de un nuevo deposito en la misma sesión
         */
        limpiarObjetos: function() {

            this.dataCache = {};
            this.Cache = null;
            this.CacheRechazados = null;
            this.CacheAceptados = null;
            this.NuevosRechazados = null;
            this.cache_monto = null;
            Vars.remove("cheque_actual")
            Vars.remove("cheques_imagenes")
            Vars.remove("cheques_rechazados");
            Vars.remove("devolver_cheque_rechazado");

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:38:52
         * @Desc: Retorna el numero de cheques aceptados
         * @return: {number}
         */
        getChequesAceptados: function(){

            if(this.CacheAceptados == null){
                return 0;
            } else {
                return this.CacheAceptados.length;
            }

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 11:39:30
         * @Desc:  Retorna el numero de cheques rechazados y si es un nuevo rechazo luego de un
         * ingreso de cheque previo.
         * @return: {number}
         */
        //devuelve 0 o la cantidad total de rechazados por intento
        getChequesRechazados: function(){

            if(this.CacheRechazados == null){
                return 0;
            } else {
                if(!Vars.exists("cheques_rechazados")){
                    Vars.set("cheques_rechazados", this.CacheRechazados.length);
                }
                else {
                    if (Vars.get("cheques_rechazados") < this.CacheRechazados.length){
                        this.NuevosRechazados = true;
                    } else {
                        this.NuevosRechazados = false;
                    }
                	Vars.set("cheques_rechazados", this.CacheRechazados.length);
                }
                return this.CacheRechazados.length;
            }

        },
        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:37:57
         * @Desc: Metodo que se encarga de discernir el flujo siguiente de la operacion, segun la validacion
         * de los cheques. Se debe ejecutar en el good del estado NDC de ingreso cheques
         */
        logicaIngresoCheques : function(){

            var chequesAceptados = Depositos.Cheques.getChequesAceptados();
            var chequesRechazados = Depositos.Cheques.getChequesRechazados();

            if (Depositos.Cheques.Cache.length >= 15) {
                Vars.set("scrow_full", true);
            }

            // algunos aceptados y algunos rechazados primer ingreso
            if (chequesAceptados > 0 && chequesRechazados > 0 && Depositos.Cheques.NuevosRechazados != false) {
                //console.log("Cheques aceptados + rechazados y sin nuevos rechazos");
                States.runState("ssfw/tx_depositos/cheques/sta_ssfw_aviso_cheque_no_reconocido");
            }
            else if  (chequesAceptados > 0 && chequesRechazados > 0 && Depositos.Cheques.NuevosRechazados == false) {
                //console.log("Cheques aceptados + rechazados y con nuevos rechazos")
                States.runState("ssfw/tx_depositos/cheques/sta_ssfw_ingresar_monto_cheque");
            }
            else if  (chequesAceptados > 0 && chequesRechazados == 0) {
                //console.log("Todos los cheques fueron aceptados");
                States.runState("ssfw/tx_depositos/cheques/sta_ssfw_ingresar_monto_cheque");
            }
            else if  (chequesAceptados == 0 && chequesRechazados > 0) {
                if(Vars.get("devolver_cheque_rechazado") == true){
                    //console.log("Cheques rechazados");
                    Vars.set("devolver_cheque_rechazado", false);
                    States.repeatState();
                } else {
                    //console.log("Cheques rechazados y muestra que no fueron reconocidos");
                    Vars.set("devolver_cheque_rechazado", false);
                    States.runState("ssfw/tx_depositos/cheques/sta_ssfw_aviso_cheque_no_reconocido");
                }
            }
            else {
                //console.log("6")
                //console.log("La logica de ingreso de cheques no se pudoo ejecutar, se cancela la operacion")
                States.runState("ndc/tx_depositos/sta_ndc_cancelar_devolver_cheques");
            }

        },
        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:33:26
         * @Desc: Utilizado en el diebold para obtener la orientacion en que se introdujo el cheque
         * Setea dos array de cheques (Aceptados con la orientacion 17 y Rechazados con la orientacion
         * distinta de 17
         * @param: {array de objetos} un array con un merge de chequedata+capability de IPM
         */

		getChequesDiebold : function(chequesMerge){

			if(chequesMerge != null && chequesMerge != undefined){
				this.CacheAceptados = chequesMerge.filter(function (cheque){
					return (cheque.fwInsertOrientation == 17 && cheque.Location != 2) ;
				});
				this.CacheRechazados = chequesMerge.filter(function (cheque){
					return (cheque.fwInsertOrientation != 17 || cheque.Location == 2);
				});
			} else {
				//console.log("No se implemento el getChequesDiebold");
            }

		},
        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:08:53
         * @Desc: Setea el chequedata, se debe ejecutar antes de enviar al host.
         * data.cheques[key]["ConsumerEnteredAmount"] = {"CurrencyID" : "", "Value" : 0 }
         * se debe setear para que no de error al hacer un chequedata.set
         */

        //
        setChequeDataLocation : function(){
		var data = this.dataCache;
		if(data.cheques != null && data.cheques != undefined){

			for (var key in data.cheques) {
				for (var cheque in this.CacheAceptados) {
					if(data.cheques[key].CodeLine == this.CacheAceptados[cheque].CodeLine ){
						if(this.CacheAceptados[cheque].Location == 0){
						data.cheques[key].Location = 0;
						}
					}
				}
				for (var cheque in this.CacheRechazados) {
					if(data.cheques[key].CodeLine == this.CacheRechazados[cheque].CodeLine ){
						data.cheques[key].Location = 2;
						// this.CacheRechazados[cheque].Location = 2;
					}
                }

                data.cheques[key]["ConsumerEnteredAmount"] = {"CurrencyID" : "", "Value" : 0 };
			}
			chequedata.set(JSON.stringify(data));
			//console.log("Chequedata.set realizado con exito en un diebold");
		}
	},
        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:18:16
         * @Desc: Realiza un merge del array del chequedata con el array de las capability del modulo IPM
         * @param: void
         * @retun: {array de objetos} Returna un array de los cheques ingresados con los datos del chequedata
         * y las capability del modulo IPM
         */

		getChequesMerge : function(){

			Depositos.Cheques.getFrontImageURLFull(this.dataCache.cheques);
			var arrayChequeData = this.dataCache.cheques;
            var chequesMerge = Vars.get("deposito_ipm");

			if(chequesMerge.length === arrayChequeData.length){
				for(var i = 0; i < chequesMerge.length; i++){
					chequesMerge[i]= Object.assign(chequesMerge[i],arrayChequeData[i]);
				}
			} else {
				//console.log("Hubo un error al ejecutar el Merge, se debe cancelar la operacion");
				return "ndc/tx_depositos/sta_ndc_cancelar_devolver_cheques";
            }
            //Si se han ingresado mas cheques antes de confirmar el deposito, entra en el if
            if (this.Cache != null && this.Cache != undefined) {
                cacheString = JSON.stringify(this.Cache);

                for (var key in chequesMerge) {
                    var code = chequesMerge[key].CodeLine;

                    if (!cacheString.includes(code)) {
                        this.Cache.push(chequesMerge[key]);
                    }
                }
            } else {
            this.Cache = chequesMerge;
            }
            return this.Cache;

		},

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:30:11
         * @Desc: Consulta al modulo IPM y ejecuta un merge de array para luego obtener
         * los cheques aceptados y rechazados. Se debe ejecutar solamente en equipos diebold
         * y en el evento good del estado NDC de ingreso cheques
         */
		startChequesMerge : function() {

			var ipm =  new XFSDevice("ipm");
			ipm.getInfo("WFS_INF_IPM_TRANSACTION_STATUS").then(
				function(data){
					Vars.set("deposito_ipm", data.lpBuffer.lppMediaInfo);
					var chequesMerge = Depositos.Cheques.getChequesMerge();
					Depositos.Cheques.getChequesDiebold(chequesMerge);

				}).caught(function(err) {
					//console.log("startChequesMerge IPM error ",err);
					States.runState("ndc/tx_depositos/sta_ndc_cancelar_devolver_cheques");
                });

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 10:05:49
         * @Desc:  Metodo para setear el location de los cheques rechazados por orientacion en las terminales
         * Se debe ejecutar cuando se confirma el deposito pero antes de viajar al host.
         * @param: void
         */
        setCacheRechazadosDiebold : function(){

            if(this.CacheRechazados != null && this.CacheRechazados != undefined ){
                for(var cheque in this.CacheRechazados){
                    this.CacheRechazados[cheque].Location = 2
                }
            }
            this.setChequeDataLocation(); //incluye un set chequedata

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 09:56:13
         * @Desc:  Metodo que debe ejecutarse en el run del estado NDC de ingreso de cheques.
         * Si es un Dieblod, debe setear el timer4 a 60 segundos.
         * En terminales wincor o diebold, si no devuelve un cheque rechazado y ya fue seteada la variable
         * "devolver_cheque_rechazado", debe solicitar insertar mas cheques
         * @param: void
         */
        runIngresoCheques : function(){

            if (Hardware.vendor == "D") {
                Depositos.Cheques.setTimer4("60");
            } else if (Hardware.vendor != "N") {
                if(Vars.get("devolver_cheque_rechazado") == false){
                    SSFramework.displayScreen("please_insert_cheques");
                }
            } else {
                //console.log("Hardware Vendor ", Hardware.vendor);
                return false
            }

        },

        /**
         * javascript comment
         * @Author: fguzman
         * @Date: 2019-07-04 15:44:32
         * @Desc:  Se ejecuta cuando se dispara el evento good del estado NDC de ingreso de cheques
         */
        startIngresoCheques : function(){
            if (Hardware.vendor == "D") {
                Depositos.Cheques.setTimer4("20");
                Depositos.Cheques.cachedCheques();
                Depositos.Cheques.startChequesMerge();
                Depositos.Cheques.transformImages();

                //Caso cajeros diebold: reconoce los cheques, pero se los queda hasta el final de la tr
                setTimeout(function(){
                    Depositos.Cheques.logicaIngresoCheques();
                }, 1000);
                return false;
            } else {
                Depositos.Cheques.getChequesIngresados();
                Depositos.Cheques.transformImages();
                //console.log("Se ha cargado con exito la cache de cheques...");
                Depositos.Cheques.logicaIngresoCheques();
            // //console.log("Cargando Cache de cheques...");
            if(Depositos.Cheques.Cache!=null)
                Depositos.Cheques.cache_monto=Depositos.Cheques.Cache
            else
                this.cache_monto=null

            }
        }

    }, //fin de cheques

}
