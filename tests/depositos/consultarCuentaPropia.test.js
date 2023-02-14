const Depositos = require("../../src/libs/depositos");
const {cuentas, Vars} = require("../../src/libs/utils/globals")
var {stateDataInicial} = require("../../src/libs/utils/globals")

beforeEach(() => {
    stateDataInicial = {
        properties: {
            opcode: "",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.clear()
    return
});

test('Setear Consulta Cuenta Propia Depositos - ', () => {
    var stateData = {
        properties: {
            opcode: "D A G   ",
            buffer_B: "C11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("cuenta_selected",cuentas[1])
    expect(JSON.stringify(Depositos.consultarCuentaPropia(stateDataInicial))).toBe(JSON.stringify(stateData));
});

//TESTEAR ESTAS FUNCIONES IMPLICA EL RETURN STATE DATA ANTES DEL NEXTA10 POR AHORA NO SE PUEDE REPLICAR ESA PARTE.
//AGREGAR EN LOS INDICES EL DEFAULT VALUE EN 0 PORQUE POR EL MOMENTO NO LOS TOMA.

/*
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
*/