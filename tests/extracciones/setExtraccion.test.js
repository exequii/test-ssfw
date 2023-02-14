const Extraccion = require("../../src/libs/extraccion");
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

//TESTEAR ESTAS FUNCIONES IMPLICA EL RETURN STATE DATA.
//AGREGAR EN LOS INDICES EL DEFAULT VALUE EN 0 PORQUE POR EL MOMENTO NO LOS TOMA.

test('Setear Extraccion - CA Pesos => Pesos - Imprime ticket - DEBITO DOMESTICA - $ $', () => {
    var stateData = {
        properties: {
            opcode: "AAB  C  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    Vars.set("fastcash",false)
    Vars.set("ticket","true");
    Vars.set("moneda","pesos")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Pesos => Dolares - Imprime ticket - DEBITO DOMESTICA - $ $', () => {
    var stateData = {
        properties: {
            opcode: "A D CC  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    Vars.set("fastcash",false)
    Vars.set("ticket","true");
    Vars.set("moneda","dolares")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Dolares => Pesos - Imprime ticket - DEBITO DOMESTICA - $ $ u$s u$s', () => {
    var stateData = {
        properties: {
            opcode: "A D BC  ",
            buffer_B: "21",
            buffer_C: "4520333322221114",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3);
    Vars.set("fastcash",false)
    Vars.set("ticket","true");
    Vars.set("moneda","pesos")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Dolares => Dolares - Imprime ticket - DEBITO DOMESTICA - $ $ u$s u$s', () => {
    var stateData = {
        properties: {
            opcode: "D A BC  ",
            buffer_B: "21",
            buffer_C: "4520333322221114",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3);
    Vars.set("fastcash",false)
    Vars.set("ticket","true");
    Vars.set("moneda","dolares")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Pesos => Pesos - No Imprime ticket - DEBITO DOMESTICA - $ $', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    Vars.set("fastcash",false)
    Vars.set("ticket","false");
    Vars.set("moneda","pesos")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Pesos => Dolares - No Imprime ticket - DEBITO DOMESTICA - $ $', () => {
    var stateData = {
        properties: {
            opcode: "A D CD  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    Vars.set("fastcash",false)
    Vars.set("ticket","false");
    Vars.set("moneda","dolares")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Dolares => Pesos - No Imprime ticket - DEBITO DOMESTICA - $ $ u$s u$s', () => {
    var stateData = {
        properties: {
            opcode: "A D BD  ",
            buffer_B: "21",
            buffer_C: "4520333322221114",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3);
    Vars.set("fastcash",false)
    Vars.set("ticket","false");
    Vars.set("moneda","pesos")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion - CA Dolares => Dolares - No Imprime ticket - DEBITO DOMESTICA - $ $ u$s u$s', () => {
    var stateData = {
        properties: {
            opcode: "D A BD  ",
            buffer_B: "21",
            buffer_C: "4520333322221114",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3);
    Vars.set("fastcash",false)
    Vars.set("ticket","false");
    Vars.set("moneda","dolares")
    expect(JSON.stringify(Extraccion.setExtraccion(stateDataInicial))).toBe(JSON.stringify(stateData));
});