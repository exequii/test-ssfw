const Extraccion = require("../../src/libs/extraccion");
const {Vars} = require("../../src/libs/utils/globals")
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

test('Setear Extraccion TC - Tipo Cta 0 - 1 Cuota - Sin Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  AC A",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 0)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 1 Cuota - Sin Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  BA A",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 2 - 1 Cuota - Sin Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  CCDA",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 2)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 3 - 1 Cuota - Sin Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  DCDA",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 3)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************* */

test('Setear Extraccion TC - Tipo Cta 0 - 1 Cuota - Sin Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "        ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 0)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 1 Cuota - Sin Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: " C  BA B",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 2 - 1 Cuota - Sin Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "   CCCDB",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 2)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 3 - 1 Cuota - Sin Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "   CDCDB",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 3)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************* */

test('Setear Extraccion TC - Tipo Cta 0 - 1 Cuota - Sin Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "        ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 0)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 1 Cuota - Sin Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: " C  BA C",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 2 - 1 Cuota - Sin Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "   CCCDC",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 2)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 3 - 1 Cuota - Sin Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "   CDCDC",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 3)
    Vars.set("cuotas",1)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************* */

test('Setear Extraccion TC - Tipo Cta 0 - 1 Cuota - Con Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  AC A",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 0)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 1 Cuota - Con Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  BC A",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 2 - 1 Cuota - Con Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  CCCA",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 2)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 3 - 1 Cuota - Con Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " C  DCCA",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 3)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************* */

test('Setear Extraccion TC - Tipo Cta 0 - 1 Cuota - Con Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "        ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 0)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 1 Cuota - Con Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "   CBC B",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 2 - 1 Cuota - Con Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "   CCCCB",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 2)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 3 - 1 Cuota - Con Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: "   CDCCB",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 3)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************* */

test('Setear Extraccion TC - Tipo Cta 0 - 1 Cuota - Con Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "        ",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 0)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 1 Cuota - Con Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "   CBC C",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 2 - 1 Cuota - Con Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "   CCCCC",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 2)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 3 - 1 Cuota - Con Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: "   CDCCC",
            buffer_B: "",
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 3)
    Vars.set("cuotas",1)
    Vars.set("ticket",true)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

/************************************************************************************************************* */

test('Setear Extraccion TC - Tipo Cta 1 - 2 Cuotas - Sin Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " F   C A",
            buffer_B: 2,
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",2)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 3 Cuotas - Con Ticket - Idioma ESP', () => {
    var stateData = {
        properties: {
            opcode: " F   C A",
            buffer_B: 3,
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ESP")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",3)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 4 Cuotas - Sin Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: " F   C A",
            buffer_B: 4,
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",4)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 5 Cuotas - Con Ticket - Idioma ENG', () => {
    var stateData = {
        properties: {
            opcode: " F   C A",
            buffer_B: 5,
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","ENG")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",5)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 6 Cuotas - Sin Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: " F   C A",
            buffer_B: 6,
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",6)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});

test('Setear Extraccion TC - Tipo Cta 1 - 7 Cuotas - Con Ticket - Idioma POR', () => {
    var stateData = {
        properties: {
            opcode: " F   C A",
            buffer_B: 7,
            buffer_C: "",
            amount_buffer: "000000010000",
        },
    }
    Vars.set("importe","10000")
    Vars.set("idioma","POR")
    Vars.set("tipo_cta", 1)
    Vars.set("cuotas",7)
    Vars.set("ticket",false)
    expect(JSON.stringify(Extraccion.setExtraccionTc(stateDataInicial))).toBe(JSON.stringify(stateData));
});