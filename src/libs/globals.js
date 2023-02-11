const stateDataInicial = {
    properties: {
        opcode: "",
        buffer_B: "",
        buffer_C: "",
        amount_buffer: "",
    },
}

const cuentas = [
    {t: "01", n: "4520333322221111",moneda: "$"},
    {t: "01", n: "4520333322221112",moneda: "$"},
    {t: "01", n: "4444333322221111",moneda: "$"},
    {t: "01", n: "4520333322221114",moneda: "$"},
    {t: "01", n: "5424333322221115",moneda: "$"},
    {t: "01", n: "5420333322221116",moneda: "$"},
    {t: "01", n: "4444333322221117",moneda: "$"},
]

const Vars = {
    get: function (key, defaultValue) {
        return this[key] || defaultValue;
    },
    set: function (key, value) {
        this[key] = value;
    }
}

//Cuentas tipo 01 CC , 11 CA, 21 C-Especial, 31 C-Credito son PESOS

//Cuentas tipo 02 CC , 11 CA, 21 C-Especial, 31 C-Credito son DOLARES

module.exports = {stateDataInicial, cuentas, Vars};