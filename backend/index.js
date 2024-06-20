const express = require('express');
const cors = require('cors');
const aplicacao = express();

aplicacao.use(cors());

const valoresConversao = {
    brl: {
        eur: 0.20,
        usd: 0.21,
        simbolo: "R$"
    },
    usd: {
        brl: 5.00,
        eur: 0.95,
        simbolo: "US$"
    },
    eur: {
        brl: 5.55,
        usd: 1.10,
        simbolo: "EU"
    }
}


aplicacao.get('/', (req, res) => {
    res.send("Meu backend está funcionando!");
});

aplicacao.post('/', (req, res) => {
    res.send("Meu backend funcionando com método POST");
});

aplicacao.get('/moedas', (req, res) => {
    const moedas = {
        BRL: "real",
        USD: "dolar",
        EUR: "euro"
    }

    res.status(200).json(moedas);
})

aplicacao.post('/moedas', (req, res) => {
    const moedas = {
        BRL: "real",
        USD: "dolar",
        EUR: "euro"
    }

    res.status(200).json(moedas);    
})

aplicacao.get('/conversao/:moedas', (req, res) => {
    //console.log(req.params.moedas);
    let moedas = req.params.moedas.split("-");

    let moeda1 = moedas[0].toLowerCase();
    let moeda2 = moedas[1].toLowerCase();

    console.log(moeda1);
    console.log(moeda2);

    let fatorConversao = valoresConversao[moeda1][moeda2];

    const resultado = {
        moedaOrigem: moeda1,
        moedaDestino: moeda2,
        fatorDeConversao: fatorConversao
    };

    // Retornar o fator de conversão entre moeda1 e moeda2 passada como parametro da url
    res.status(200).json(resultado);
});


aplicacao.listen(4000, () => {
    console.log("Estou escutando na porta 4000");
})