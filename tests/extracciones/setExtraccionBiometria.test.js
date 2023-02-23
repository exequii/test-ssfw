const Extraccion = require("../../src/libs/extraccion");
const {Vars, cuentas, cuentas_dolares} = require("../../src/libs/utils/globals")
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

test('Setear Extraccion Biometria - Tipo Cta 01 - Sin Ticket - CC Pesos - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "ACC B D ",
            buffer_B: "01",
            buffer_C: "4520333322221111",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 0)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 11 - Sin Ticket - CA Pesos - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "ADC B D ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 1)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 12 - Sin Ticket - CA Dolares - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "AGC B D ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 3)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 02 - Sin Ticket - CC Dolares - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "AHC B D ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 2)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 12 - Sin Ticket - CE Dolares - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "AGC B D ",
            buffer_B: "12",
            buffer_C: "4444433322221117",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 7)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/*********************************************************************************************************** */

test('Setear Extraccion Biometria - Tipo Cta 02 - Sin Ticket - CC Dolares - Retira Dolares', () => {
    var stateData = {
        properties: {
            opcode: "AIC B D ",
            buffer_B: "02",
            buffer_C: "4444333322251111",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","dolares")
    Vars.set("cta_indice", 3)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    Vars.set("cuentas_dolares",cuentas_dolares);
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 12 - Sin Ticket - CA Dolares - Retira Dolares', () => {
    var stateData = {
        properties: {
            opcode: "D ",
            buffer_B: "12",
            buffer_C: "4444433322231117",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","dolares")
    Vars.set("cta_indice", 1)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",false)
    Vars.set("cuentas_dolares",cuentas_dolares);
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/***************************************************************************************************************** */

test('Setear Extraccion Biometria - Tipo Cta 01 - Con Ticket - CC Pesos - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "ACC B C ",
            buffer_B: "01",
            buffer_C: "4520333322221111",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 0)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 11 - Con Ticket - CA Pesos - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "ADC B C ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 1)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 12 - Con Ticket - CA Dolares - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "AGC B C ",
            buffer_B: "12",
            buffer_C: "4520333322221114",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 3)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 02 - Con Ticket - CC Dolares - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "AHC B C ",
            buffer_B: "02",
            buffer_C: "4444333322221111",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 2)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 12 - Con Ticket - CE Dolares - Retira Pesos', () => {
    var stateData = {
        properties: {
            opcode: "AGC B C ",
            buffer_B: "12",
            buffer_C: "4444433322221117",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","pesos")
    Vars.set("cta_indice", 7)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    //Vars.get("cuentas_dolares");
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/*********************************************************************************************************** */

test('Setear Extraccion Biometria - Tipo Cta 02 - Con Ticket - CC Dolares - Retira Dolares', () => {
    var stateData = {
        properties: {
            opcode: "AIC B C ",
            buffer_B: "02",
            buffer_C: "4444333322251111",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","dolares")
    Vars.set("cta_indice", 3)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    Vars.set("cuentas_dolares",cuentas_dolares);
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion Biometria - Tipo Cta 12 - Con Ticket - CA Dolares - Retira Dolares', () => {
    var stateData = {
        properties: {
            opcode: "C ",
            buffer_B: "12",
            buffer_C: "4444433322231117",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("moneda","dolares")
    Vars.set("cta_indice", 1)
    Vars.set("cuentas",cuentas)
    Vars.set("ticket",true)
    Vars.set("cuentas_dolares",cuentas_dolares);
    expect(JSON.stringify(Extraccion.setExtraccionBiometria(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/***************************************************************************************************************** */

