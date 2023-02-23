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

test('Setear Consulta de Limite de Pagos - Cuenta 01 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIC D   ",
            buffer_B: "01",
            buffer_C: "4520333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",0)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - Cuenta 01 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIC C   ",
            buffer_B: "01",
            buffer_C: "4520333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",0)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */

test('Setear Consulta de Limite de Pagos - Cuenta 02 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIB D   ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",2)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - Cuenta 02 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIB C   ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",2)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */

test('Setear Consulta de Limite de Pagos - Cuenta 11 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BID D   ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",1)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - Cuenta 11 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BID C   ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",1)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */

test('Setear Consulta de Limite de Pagos - Cuenta 12 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIG D   ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",3)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - Cuenta 12 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIG C   ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",3)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */

test('Setear Consulta de Limite de Pagos - Cuenta 21 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIA D   ",
            buffer_B: "21",
            buffer_C: "4644433322221117",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",8)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - Cuenta 21 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BIA C   ",
            buffer_B: "21",
            buffer_C: "4644433322221117",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",8)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */

test('Setear Consulta de Limite de Pagos - Cuenta 22 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BII D   ",
            buffer_B: "22",
            buffer_C: "4674433322221117",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",9)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - Cuenta 22 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BII C   ",
            buffer_B: "22",
            buffer_C: "4674433322221117",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",9)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */

test('Setear Consulta de Limite de Pagos - ANSES - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BID D   ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","ANSES")
    Vars.set("cta_indice",1)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Limite de Pagos - ANSES - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BID C   ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","ANSES")
    Vars.set("cta_indice",1)
    expect(JSON.stringify(Consultas.setConsultaLimitePagos(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/****************************************************************************************** */