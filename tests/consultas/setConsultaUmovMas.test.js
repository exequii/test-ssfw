const Consultas = require("../../src/libs/consultas");
const {Vars, cuentas} = require("../../src/libs/utils/globals")

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

test('Setear Consulta de UMOV Mas - Cta Pesos - Imprime Ticket', () => {
var stateData = {
    properties: {
        opcode: "BDC  C  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de UMOV Mas - Cta Pesos - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDC  C  ",
            buffer_B: "01",
            buffer_C: "5424333322221115",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",4);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************* */

test('Setear Consulta de UMOV Mas - Cta Pesos - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDC  C  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de UMOV Mas - Cta Pesos - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDC  C  ",
            buffer_B: "01",
            buffer_C: "5424333322221115",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",4);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************* */

test('Setear Consulta de UMOV Mas - Cta Dolares - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDG  C  ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",2);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de UMOV Mas - Cta Dolares - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDG  C  ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/********************************************************************************************* */

test('Setear Consulta de UMOV Mas - Cta Dolares - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDG  C  ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",2);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de UMOV Mas - Cta Dolares - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDG  C  ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3);
    expect(JSON.stringify(Consultas.setConsultaUMovMas(stateDataInicial))).toBe(JSON.stringify(stateData));
});