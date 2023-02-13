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

test('Setear Extraccion Cardless - Tipo Doc DNI', () => {
    var stateData = {
        properties: {
            opcode: "FACCC   ",
            buffer_B: "",
            buffer_C: "DNI",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("doc_tipo", 0)
    Vars.set("doc","DNI")
    expect(JSON.stringify(Extraccion.setExtraccionCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Cardless - Tipo Doc DNI', () => {
    var stateData = {
        properties: {
            opcode: "FBCCC   ",
            buffer_B: "",
            buffer_C: "DNI",
            amount_buffer: "000000004321",
        },
    }
    Vars.set("importe","4321")
    Vars.set("doc_tipo",1)
    Vars.set("doc","DNI")
    expect(JSON.stringify(Extraccion.setExtraccionCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Cardless - Tipo Doc LC', () => {
    var stateData = {
        properties: {
            opcode: "FCCCC   ",
            buffer_B: "",
            buffer_C: "LC",
            amount_buffer: "000000001234",
        },
    }
    Vars.set("importe","1234")
    Vars.set("doc_tipo",2)
    Vars.set("doc","LC")
    expect(JSON.stringify(Extraccion.setExtraccionCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Cardless - Tipo Doc LE', () => {
    var stateData = {
        properties: {
            opcode: "FHCCC   ",
            buffer_B: "",
            buffer_C: "LE",
            amount_buffer: "000000040000",
        },
    }
    Vars.set("importe","40000")
    Vars.set("doc_tipo",3)
    Vars.set("doc","LE")
    expect(JSON.stringify(Extraccion.setExtraccionCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Cardless - Tipo Doc LC', () => {
    var stateData = {
        properties: {
            opcode: "FICCC   ",
            buffer_B: "",
            buffer_C: "LC",
            amount_buffer: "000000035500",
        },
    }
    Vars.set("importe","35500")
    Vars.set("doc_tipo",4)
    Vars.set("doc","LC")
    expect(JSON.stringify(Extraccion.setExtraccionCardless(stateDataInicial))).toBe(JSON.stringify(stateData));
});
