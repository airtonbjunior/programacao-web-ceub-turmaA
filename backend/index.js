const express = require('express');

const aplicacao = express();

aplicacao.get('/', (req, res) => {
    res.send("Meu backend está funcionando!");
});

aplicacao.post('/', (req, res) => {
    res.send("Meu backend funcionando com método POST");
});

aplicacao.listen(4000, () => {
    console.log("Estou escutando na porta 4000");
})