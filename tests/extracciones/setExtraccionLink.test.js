const Extraccion = require("../../src/libs/extraccion");
const {Vars} = require("../../src/libs/utils/globals")
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

//TESTEAR ESTAS FUNCIONES IMPLICA EL RETURN STATE DATA.
//AGREGAR EN LOS INDICES EL DEFAULT VALUE EN 0 PORQUE POR EL MOMENTO NO LOS TOMA.

test('Setear Extraccion RIAS - Tipo Cta X', () => {
    var stateData = {
        properties: {
            opcode: "ADC     ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("tipo_cta_link",0) //cuenta 
    expect(JSON.stringify(Extraccion.setExtraccionLink(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta X', () => {
    var stateData = {
        properties: {
            opcode: "ACC     ",
            buffer_B: "01",
            buffer_C: "0000000000000000000",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("tipo_cta_link",1) //cuenta 
    expect(JSON.stringify(Extraccion.setExtraccionLink(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta X', () => {
    var stateData = {
        properties: {
            opcode: "AIC     ",
            buffer_B: "31",
            buffer_C: "0000000000000000000",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("tipo_cta_link",2) //cuenta 
    expect(JSON.stringify(Extraccion.setExtraccionLink(stateDataInicial))).toBe(JSON.stringify(stateData));
});
