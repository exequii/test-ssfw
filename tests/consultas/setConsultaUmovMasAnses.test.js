const Consultas = require("../../src/libs/consultas");
const {Vars} = require("../../src/libs/utils/globals")

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

test('Setear setConsultaUMovMasAnses - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDC  C  ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    expect(JSON.stringify(Consultas.setConsultaUMovMasAnses(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear setConsultaUMovMasAnses - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "BDC  D  ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    expect(JSON.stringify(Consultas.setConsultaUMovMasAnses(stateDataInicial))).toBe(JSON.stringify(stateData));
});