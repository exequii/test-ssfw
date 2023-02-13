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

test('Setear Extraccion RIAS - Tipo Cta Recargable - No Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBB D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","false")
    Vars.set("tipo_cta",0) //cuenta recargable
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta Credito - No Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBC D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","false")
    Vars.set("tipo_cta",1) //cuenta credito
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta Corriente - No Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBH D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","false")
    Vars.set("tipo_cta",2) //cuenta corriente
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta Ahorro - No Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBG D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","false")
    Vars.set("tipo_cta",3) //caja ahorro
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************ */


test('Setear Extraccion RIAS - Tipo Cta Recargable - Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBB C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","true")
    Vars.set("tipo_cta",0) //cuenta recargable
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta Credito - Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBC C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","true")
    Vars.set("tipo_cta",1) //cuenta credito
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta Corriente - Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBH C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","true")
    Vars.set("tipo_cta",2) //cuenta corriente
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion RIAS - Tipo Cta Ahorro - Imprime ticket', () => {
    var stateData = {
        properties: {
            opcode: "  CBG C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("ticket","true")
    Vars.set("tipo_cta",3) //caja ahorro
    expect(JSON.stringify(Extraccion.setExtraccionRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});
