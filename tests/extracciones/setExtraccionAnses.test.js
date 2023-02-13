const Extraccion = require("../../src/libs/extraccion");
const {Vars, cuentas, CheckDevice} = require("../../src/libs/utils/globals")
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

test('Setear Extraccion ANSES - $ $ - Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "AAB  C  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cta_indice",1) //cuenta 
    Vars.set("cuentas", cuentas)
    CheckDevice.set("ticket_usuario", true);
    expect(JSON.stringify(Extraccion.setExtraccionANSES(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion ANSES - $ $ - No Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cta_indice",1) //cuenta 
    Vars.set("cuentas", cuentas)
    CheckDevice.set("ticket_usuario", false);
    expect(JSON.stringify(Extraccion.setExtraccionANSES(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion ANSES - Sin Cuentas - No Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cta_indice",1) //cuenta 
    Vars.set("cuentas", [])
    CheckDevice.set("ticket_usuario", false);
    expect(JSON.stringify(Extraccion.setExtraccionANSES(stateDataInicial))).toBe(JSON.stringify(stateData));
});
