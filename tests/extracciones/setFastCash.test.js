const Extraccion = require("../../src/libs/extraccion");
const {cuentas, Vars} = require("../../src/libs/utils/globals")
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

test('Setear FastCash - Cuenta Origen CA Pesos - No Imprime ticket - DEBITO DOMESTICA - $ $', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "11",
            buffer_C: "4520333322221112",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",1);
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Origen CC Pesos - No Imprime ticket - DEBITO DOMESTICA - $ $ USD USD $', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "01",
            buffer_C: "5424333322221115",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",2);
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Origen CC Pesos - No Imprime ticket - DEBITO DOMESTICA - $ $ USD USD $ USD $', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "01",
            buffer_C: "4444333322221117",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("cta_indice",3);
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Primaria TC - No Imprime ticket - TC', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000004000",
        },
    }
    Vars.set("importe","4000")
    Vars.set("tipo_menu","TC")
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Primaria LINK - No Imprime ticket - LINK', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000006000",
        },
    }
    Vars.set("importe","6000")
    Vars.set("tipo_menu","LINK")
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Primaria RIAS - No Imprime ticket - RIAS', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("tipo_menu","RIAS")
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Primaria ANSES - No Imprime ticket - ANSES', () => {
    var stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000015000",
        },
    }
    Vars.set("importe","15000")
    Vars.set("tipo_menu","ANSES")
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear FastCash - Cuenta Primaria BIOMETRIA - No Imprime ticket - BIOMETRIA', () => {
    var stateData = {
        properties: {
            opcode: "FBBB    ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000020000",
        },
    }
    Vars.set("importe","20000")
    Vars.set("tipo_menu","BIOMETRIA")
    Vars.set("biom_of",true)
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});
