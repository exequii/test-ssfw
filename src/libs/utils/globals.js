var stateDataInicial = {
    properties: {
        opcode: "",
        buffer_B: "",
        buffer_C: "",
        amount_buffer: "",
    },
}

const cuentas = [
    {t: "01", n: "4520333322221111",moneda: "$"},   //CC EN PESOS
    {t: "11", n: "4520333322221112",moneda: "$"},   //CA EN PESOS
    {t: "02", n: "4444333322221111",moneda: "u$s"}, //CC EN DOLARES
    {t: "12", n: "4520333322221114",moneda: "u$s"}, //CA EN DOLARES
    {t: "01", n: "5424333322221115",moneda: "$"},   //CC EN PESOS
    {t: "02", n: "5420333322221116",moneda: "u$s"}, //CC EN DOLARES
    {t: "01", n: "4444333322221117",moneda: "$"},   //CC EN PESOS
    {t: "12", n: "4444433322221117",moneda: "u$s"},   //CE EN PESOS
    {t: "21", n: "4644433322221117",moneda: "u$s"},   //CE EN PESOS
    {t: "22", n: "4674433322221117",moneda: "u$s"},   //CE EN PESOS
]

const cuentas_dolares = [
    {t: "02", n: "4444333322221111",moneda: "u$s"}, //CC EN DOLARES
    {t: "12", n: "4444433322231117",moneda: "u$s"},   //CE EN PESOS
    {t: "12", n: "4444433322241117",moneda: "u$s"},   //CE EN PESOS
    {t: "02", n: "4444333322251111",moneda: "u$s"}, //CC EN DOLARES
]

//Cuentas tipo 01 CC , 11 CA, 21 C-Especial, 31 C-Credito son PESOS

//Cuentas tipo 02 CC , 21 CA, 22 C-Especial, 32 C-Credito son DOLARES

const Vars = {
    get: function (key, defaultValue) {
        return this[key] || defaultValue;
    },
    set: function (key, value) {
        if(key !== "set" && key !== "get" && key !== "clear"  && key !== "exists") this[key] = value;
    },
    clear: function () {
        for (var key in this) {
            if (this.hasOwnProperty(key) && key !== "get" && key !== "set" && key !== "clear" && key !== "exists") {
                delete this[key];
            }
        }
    },
    exists: function (key) {
        return this[key] !== undefined;
    }
}

const CheckDevice = {
    set: function (key, value) {
        this[key] = value;
    },
    CheckHabilitado: function (device) {
        return this[device]
    }
}

const ndctools = {
    retrieveScreen: function (x, y,permite) {
        return '{"titularidad": { "permite" : "'+permite+'"}}'
    }
}

const initial01 = {
    "cf":"RIOP",
    "tf":"BSTN",
    "d":"N",
    "ctas":[
        {
            "t":"01",
            "n":"000000603896       ",
            "e":"1"
        },
        {
            "t":"11",
            "n":"201001001125       ",
            "e":"3"
        },
        {
            "t":"11",
            "n":"000000000998       ",
            "e":"1"
        },
    ]
}

module.exports = {stateDataInicial, cuentas, Vars, CheckDevice, cuentas_dolares, ndctools};