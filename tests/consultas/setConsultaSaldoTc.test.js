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

test('Setear Consulta de Saldo TC - Cta 1 - ESP', () => {
    var stateData = {
        properties: {
            opcode: " A AA  A",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ESP")
    Vars.set("cta_index",0)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 2 - ESP', () => {
    var stateData = {
        properties: {
            opcode: " A AB  A",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ESP")
    Vars.set("cta_index",1)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 3 - ESP', () => {
    var stateData = {
        properties: {
            opcode: " A AC CA",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ESP")
    Vars.set("cta_index",2)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 4 - ESP', () => {
    var stateData = {
        properties: {
            opcode: " A AD CA",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ESP")
    Vars.set("cta_index",3)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/* ********************************************************************************* */

test('Setear Consulta de Saldo TC - Cta 1 - ENG', () => {
    var stateData = {
        properties: {
            opcode: "        ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ENG")
    Vars.set("cta_index",0)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 2 - ENG', () => {
    var stateData = {
        properties: {
            opcode: "   DB  B",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ENG")
    Vars.set("cta_index",1)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 3 - ENG', () => {
    var stateData = {
        properties: {
            opcode: "   DC CB",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ENG")
    Vars.set("cta_index",2)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 4 - ENG', () => {
    var stateData = {
        properties: {
            opcode: "   DD CB",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","ENG")
    Vars.set("cta_index",3)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/* ********************************************************************************* */

test('Setear Consulta de Saldo TC - Cta 1 - POR', () => {
    var stateData = {
        properties: {
            opcode: "        ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","POR")
    Vars.set("cta_index",0)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 2 - POR', () => {
    var stateData = {
        properties: {
            opcode: "   DB  C",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","POR")
    Vars.set("cta_index",1)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 3 - POR', () => {
    var stateData = {
        properties: {
            opcode: "   DC CC",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","POR")
    Vars.set("cta_index",2)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo TC - Cta 4 - POR', () => {
    var stateData = {
        properties: {
            opcode: "   DD CC",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("idioma","POR")
    Vars.set("cta_index",3)
    expect(JSON.stringify(Consultas.setConsultaSaldoTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/* 
	setConsultaSaldoTc : function(stateData){
		var indice = Vars.get("cta_index",1);
		var idioma = Vars.get("idioma","ESP");

		var opcode = {
			"ESP" : [
				" A AA  A",
				" A AB  A",
				" A AC CA",
				" A AD CA"
			],
			"ENG" : [
				"        ",
				"   DB  B",
				"   DC CB",
				"   DD CB"
			],
			"POR" : [
				"        ",
				"   DB  C",
				"   DC CC",
				"   DD CC"
			],
		};

		stateData.properties.opcode  = opcode[idioma][indice];	
		// stateData.properties.buffer_B = tipo[indice];
		// stateData.properties.buffer_C = "0000000000000000000";
    },
*/