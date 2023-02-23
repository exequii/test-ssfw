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

test('Setear Consulta de Saldo Link - Cta 11', () => {
    var stateData = {
        properties: {
            opcode: "BCD     ",
            buffer_B: "11",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("tipo_cta_link",0)
    expect(JSON.stringify(Consultas.setConsultaSaldoLink(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo Link - Cta 01', () => {
    var stateData = {
        properties: {
            opcode: "BCC     ",
            buffer_B: "01",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("tipo_cta_link",1)
    expect(JSON.stringify(Consultas.setConsultaSaldoLink(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo Link - Cta 31', () => {
    var stateData = {
        properties: {
            opcode: "BCI     ",
            buffer_B: "31",
            buffer_C: "0000000000000000000",
            amount_buffer: "",
        },
    }
    Vars.set("tipo_cta_link",2)
    expect(JSON.stringify(Consultas.setConsultaSaldoLink(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/* 
    setConsultaSaldoLink : function(stateData){
		var indice = Vars.get("tipo_cta_link");

		var opcode_pesos = [
			"BCD     ",
			"BCC     ",
			"BCI     ",
		]
		var tipo = [
			"11",
			"01",
			"31",
		];
		stateData.properties.opcode  = opcode_pesos[indice];	
		stateData.properties.buffer_B = tipo[indice];
		stateData.properties.buffer_C = "0000000000000000000";
    },
*/