const Extraccion = require("../../src/libs/extraccion");
const {stateDataInicial, cuentas, Vars} = require("../../src/libs/globals")

test('Setear FastCash - Cuenta Origen CC Pesos - Cuenta Destino Pesos - No Imprime ticket', () => {
    const stateData = {
        properties: {
            opcode: "AAB  D  ",
            buffer_B: "01",
            buffer_C: "4444333322221111",
            amount_buffer: "000000002000",
        },
    }
    Vars.set("importe","2000")
    Vars.set("cuentas",cuentas)
    Vars.set("tipo_menu","BANELCO")
    Vars.set("indice",2);
    expect(JSON.stringify(Extraccion.setFastCash(stateDataInicial))).toBe(JSON.stringify(stateData));
});