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

test('Setear Consulta de Saldo Anses - Cta 11 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "ABA  C  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    expect(JSON.stringify(Consultas.setConsultaSaldoAnses(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo Anses - Cta 11 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "ABA  D  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1);
    expect(JSON.stringify(Consultas.setConsultaSaldoAnses(stateDataInicial))).toBe(JSON.stringify(stateData));
});


test('Setear Consulta de Saldo Anses - Cta 11 - No Imprime Ticket - Sin Cuenta', () => {
    var stateData = {
        properties: {
            opcode: "ABA  D  ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",0);
    expect(JSON.stringify(Consultas.setConsultaSaldoAnses(stateDataInicial))).toBe(JSON.stringify(stateData));
});
