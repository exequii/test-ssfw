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

//TESTEAR ESTAS FUNCIONES IMPLICA EL RETURN STATE DATA ANTES DEL NEXTA10 POR AHORA NO SE PUEDE REPLICAR ESA PARTE.
//AGREGAR EN LOS INDICES EL DEFAULT VALUE EN 0 PORQUE POR EL MOMENTO NO LOS TOMA.

test('Setear Consulta Cuenta Cardless Depositos - Banco Destino Conocido - Tipo cuenta 01 - Send Track en true', () => {
    var stateData = {
        properties: {
            opcode: "D A G   ",
            buffer_B: "C01",
            buffer_C: "4520333322221112",
            amount_buffer: "",
            send_track_2: true,
        },
    }
    Vars.set("banc_dest","BBVA")
    Vars.set("tipo_cuenta",1)
    Vars.set("send_track_2",true)
    Vars.set("cuenta","4520333322221112")
    //Vars.set("cbu","1234567891234567")
    expect(JSON.stringify(Depositos.consultarCuentaCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta Cuenta Cardless Depositos - Banco Destino Conocido - Tipo cuenta 21 - Send Track en true', () => {
    var stateData = {
        properties: {
            opcode: "D A G   ",
            buffer_B: "C21",
            buffer_C: "4520333322221112",
            amount_buffer: "",
            send_track_2: true,
        },
    }
    Vars.set("banc_dest","BBVA")
    Vars.set("tipo_cuenta",0)
    Vars.set("send_track_2",true)
    Vars.set("cuenta","4520333322221112")
    //Vars.set("cbu","1234567891234567")
    expect(JSON.stringify(Depositos.consultarCuentaCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta Cuenta Cardless Depositos - Banco Destino Conocido - Tipo cuenta 01 - Send Track en true', () => {
    var stateData = {
        properties: {
            opcode: "D A G   ",
            buffer_B: "C11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
            send_track_2: true,
        },
    }
    Vars.set("banc_dest","BBVA")
    Vars.set("tipo_cuenta",2)
    Vars.set("send_track_2",true)
    Vars.set("cuenta","4520333322221112")
    //Vars.set("cbu","1234567891234567")
    expect(JSON.stringify(Depositos.consultarCuentaCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

//NO SE PUEDEN PROBAR POR PROBLEMAS CON LOS VALORES FALSIE EN LOS VARS.SET

// test('Setear Consulta Cuenta Cardless Depositos - Banco Destino Conocido - Tipo cuenta 01 - Send Track en false', () => {
//     var stateData = {
//         properties: {
//             opcode: "D A G   ",
//             buffer_B: "C11",
//             buffer_C: "4520333322221112",
//             amount_buffer: "",
//             send_track_2: true,
//         },
//     }
//     Vars.set("banc_dest","BBVA")
//     Vars.set("tipo_cuenta",2)
//     Vars.set("send_track_2",false)
//     Vars.set("cuenta","4520333322221112")
//     //Vars.set("cbu","1234567891234567")
//     expect(JSON.stringify(Depositos.consultarCuentaCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
// });

// test('Setear Consulta Cuenta Cardless Depositos - Banco Destino OTRO - Tipo cuenta 01 - Send Track en false', () => {
//     var stateData = {
//         properties: {
//             opcode: "D A G   ",
//             buffer_B: "UO",
//             buffer_C: "1234567891234567",
//             amount_buffer: "",
//             send_track_2: true,
//         },
//     }
//     Vars.set("banc_dest","otro")
//     //Vars.set("tipo_cuenta",2)
//     Vars.set("send_track_2",true)
//     //Vars.set("cuenta","4520333322221112")
//     Vars.set("cbu","1234567891234567")
//     expect(JSON.stringify(Depositos.consultarCuentaCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
// });

// test('Setear Consulta Cuenta Cardless Depositos - Banco Destino OTRO - Tipo cuenta 01 - Send Track en TRUE', () => {
//     var stateData = {
//         properties: {
//             opcode: "D A G   ",
//             buffer_B: "U",
//             buffer_C: "1234567891234567",
//             amount_buffer: "",
//             send_track_2: true,
//         },
//     }
//     Vars.set("banc_dest","otro")
//     //Vars.set("tipo_cuenta",2)
//     Vars.set("send_track_2",true)
//     //Vars.set("cuenta","4520333322221112")
//     Vars.set("cbu","1234567891234567")
//     expect(JSON.stringify(Depositos.consultarCuentaCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
// });

/*
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
----------------------------RETURRRNNN STATE DATAAAAAA--------------------------------  
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
*/