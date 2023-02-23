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

test('Setear Consulta de Saldo RIAS - Cta 1 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AB C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cta_index",0)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo RIAS - Cta 2 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AC C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cta_index",1)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo RIAS - Cta 3 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AH C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cta_index",2)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo RIAS - Cta 4 - Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AG C ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",true)
    Vars.set("cta_index",3)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/******************************************************************************************************************** */

test('Setear Consulta de Saldo RIAS - Cta 1 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AB D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cta_index",0)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo RIAS - Cta 2 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AC D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cta_index",1)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo RIAS - Cta 3 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AH D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cta_index",2)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Consulta de Saldo RIAS - Cta 4 - No Imprime Ticket', () => {
    var stateData = {
        properties: {
            opcode: "   AG D ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "",
        },
    }
    Vars.set("imprime",false)
    Vars.set("cta_index",3)
    expect(JSON.stringify(Consultas.setConsultaSaldoRias(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/*
    setConsultaSaldoRias:function(stateData){
    	var indice = Vars.get("cta_index",0);
    	var imprime = Vars.get("imprime") == true ? true : false ;
    	var opcode = {
    		"true":[
    			"   AB C ",
    			"   AC C ",
    			"   AH C ",
    			"   AG C "
    		],
    		"false":[
    			"   AB D ",
    			"   AC D ",
    			"   AH D ",
    			"   AG D "
    		]
    	}
				

		stateData.properties.opcode  = opcode[imprime][indice];
		return stateData
    }, 
*/