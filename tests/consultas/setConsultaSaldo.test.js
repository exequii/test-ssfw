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

test('Setear Consulta de Saldo - Imprime Ticket - Cta Tipo 01', () => {
    var stateData = {
        properties: {
            opcode: "ABA  C  ",
            buffer_B: "01",
            buffer_C: "4520333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("indice_consulta",0)
    Vars.set("imprime",true);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo - Imprime Ticket - Cta Tipo 11', () => {
    var stateData = {
        properties: {
            opcode: "ABA  C  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1)
    Vars.set("imprime",true);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo - Imprime Ticket - Cta Tipo 02', () => {
    var stateData = {
        properties: {
            opcode: "ABC  C  ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",2)
    Vars.set("imprime",true);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo - Imprime Ticket - Cta Tipo 12', () => {
    var stateData = {
        properties: {
            opcode: "ABC  C  ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3)
    Vars.set("imprime",true);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/* ************************************************************************************************************** */

test('Setear Consulta de Saldo - No Imprime Ticket - Cta Tipo 01', () => {
    var stateData = {
        properties: {
            opcode: "ABA  D  ",
            buffer_B: "01",
            buffer_C: "4520333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("indice_consulta",0)
    Vars.set("imprime",false);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo - No Imprime Ticket - Cta Tipo 11', () => {
    var stateData = {
        properties: {
            opcode: "ABA  D  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",1)
    Vars.set("imprime",false);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo - No Imprime Ticket - Cta Tipo 02', () => {
    var stateData = {
        properties: {
            opcode: "ABC  D  ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",2)
    Vars.set("imprime",false);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo - No Imprime Ticket - Cta Tipo 12', () => {
    var stateData = {
        properties: {
            opcode: "ABC  D  ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "",
        },
    }
    Vars.set("cuentas",cuentas)
    Vars.set("cta_indice",3)
    Vars.set("imprime",false);
    expect(JSON.stringify(Consultas.setConsultaSaldo(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/*
    setConsultaSaldo : function(stateData){
		var imprime = Vars.get("imprime") == true ? true : false ;
		var cuentas = Vars.get("cuentas",[]);
		var cta_indice = Vars.get("cta_indice",0);
		Vars.set("indice_consulta", cta_indice)
		var opcode_pesos = {
			"true" : "ABA  C  ", //imprime ticket
			"false": "ABA  D  "  //no imprime ticket
		}
		var opcode_dolares = {
			"true" : "ABC  C  ", //imprime ticket
			"false": "ABC  D  "  //no imprime ticket
		}

		if(cta_indice != undefined){
			if(cuentas[cta_indice].t == "01" || cuentas[cta_indice].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[cta_indice].t;
			stateData.properties.buffer_C = cuentas[cta_indice].n;
		} else {
			if(cuentas[0].t == "01" || cuentas[0].t == "11"){
				stateData.properties.opcode  = opcode_pesos[imprime];
			}else{
				stateData.properties.opcode  = opcode_dolares[imprime];
			}
			stateData.properties.buffer_B = cuentas[0].t;
			stateData.properties.buffer_C = cuentas[0].n;
		}
		return stateData
    },
*/
