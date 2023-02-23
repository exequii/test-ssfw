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

test('Setear Cuentas en Pesos', () => {
    const cuentas = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "02", n: "4444333322221111",moneda: "u$s"}, //CC EN DOLARES
        {t: "12", n: "4520333322221114",moneda: "u$s"}, //CA EN DOLARES
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "02", n: "5420333322221116",moneda: "u$s"}, //CC EN DOLARES
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
        {t: "12", n: "4444433322221117",moneda: "u$s"},   //CE EN PESOS
    ]
    const cuentas_pesos = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
    ]
    expect(JSON.stringify(Consultas.setCuentasEnPesos(cuentas))).toBe(JSON.stringify(cuentas_pesos));
});

test('Setear Cuentas en Pesos', () => {
    const cuentas = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "02", n: "4444333322221111",moneda: "u$s"}, //CC EN DOLARES
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "12", n: "4520333322221114",moneda: "u$s"}, //CA EN DOLARES
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "02", n: "5420333322221116",moneda: "u$s"}, //CC EN DOLARES
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
        {t: "12", n: "4444433322221117",moneda: "u$s"},   //CE EN PESOS
    ]
    const cuentas_pesos = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
    ]
    expect(JSON.stringify(Consultas.setCuentasEnPesos(cuentas))).toBe(JSON.stringify(cuentas_pesos));
});

test('Setear Cuentas en Pesos', () => {
    const cuentas = [
        {t: "02", n: "4444333322221111",moneda: "u$s"}, //CC EN DOLARES
        {t: "12", n: "4520333322221114",moneda: "u$s"}, //CA EN DOLARES
        {t: "02", n: "5420333322221116",moneda: "u$s"}, //CC EN DOLARES
        {t: "12", n: "4444433322221117",moneda: "u$s"},   //CE EN PESOS
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
    ]
    const cuentas_pesos = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
    ]
    expect(JSON.stringify(Consultas.setCuentasEnPesos(cuentas))).toBe(JSON.stringify(cuentas_pesos));
});

test('Setear Cuentas en Pesos', () => {
    const cuentas = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
        {t: "02", n: "4444333322221111",moneda: "u$s"}, //CC EN DOLARES
        {t: "12", n: "4520333322221114",moneda: "u$s"}, //CA EN DOLARES
        {t: "02", n: "5420333322221116",moneda: "u$s"}, //CC EN DOLARES
        {t: "12", n: "4444433322221117",moneda: "u$s"},   //CE EN PESOS
    ]
    const cuentas_pesos = [
        {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
        {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
        {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
        {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
    ]
    expect(JSON.stringify(Consultas.setCuentasEnPesos(cuentas))).toBe(JSON.stringify(cuentas_pesos));
});
