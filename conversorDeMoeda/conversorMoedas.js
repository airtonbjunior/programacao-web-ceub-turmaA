let botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

let botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

let botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

let botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitaMensagem);

if(localStorage.getItem("aceitouCookie") == "1") {
    aceitaMensagem();
}

function salvaResultadoNoHistorico(conversao) {
    let historico = recuperaHistoricoDeConversoes();

    historico.push(conversao);

    historico = JSON.stringify(historico);
    localStorage.setItem("historico", historico);
}

function recuperaHistoricoDeConversoes() {
    let historico = localStorage.getItem("historico");

    if(!historico) {
        return [];
    }
    let historicoConvertido = JSON.parse(historico);
    return historicoConvertido;
}

function aceitaMensagem() {
    let divMensagemUsuario = document.getElementById("container-mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}


let valorUsuario = document.getElementById("valor-usuario");
valorUsuario.addEventListener("keypress", function(event) {

    //console.log(event);

    if(event.ctrlKey == true && event.code == "KeyI") {
        inverter();
    }

    if(event.ctrlKey == true && event.code == "KeyL") {
        limpar();
    }

    if(event.key == "Enter") {
        converter();
    }

});


function limpar() {
    let valorUsuario = document.getElementById("valor-usuario");
    let resultado = document.getElementById("resultado");

    valorUsuario.value = "";
    resultado.textContent = "";
}

function buscaAPI(moedaOrigem="USD", moedaDestino="BRL") {
    
    console.log(moedaOrigem);
    console.log(moedaDestino);

    let parametro = moedaOrigem + "-" + moedaDestino;
    let url = "https://economia.awesomeapi.com.br/json/last/" + parametro;

    console.log(url);

    return fetch(url).then(function(data){
        if(data.status == 200) {
            console.log("Retorno código 200 API!");
        }
        return data.json();
    }).then(function(response){
        return response[moedaOrigem + moedaDestino];
    }).catch();
}


function converter() {
    let valorUsuario = document.getElementById("valor-usuario").value;

    let moedaOrigem  = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;

    if(valorUsuario == "") {
        alert("Valor não pode ser vazio!");
        return;
    }

    if(valorUsuario < 0) {
        alert("Valor não pode ser negativo");
        return;
    }

    if(moedaOrigem == moedaDestino) {
        alert("As moedas são iguais, não é possível converter");
        return;
    }

    buscaAPI(moedaOrigem, moedaDestino).then(function(data){
        let conversao = valorUsuario * data["ask"];

        let simbolo = "";
        if (moedaDestino == "BRL") {
            simbolo = "R$";
        }
        if (moedaDestino == "USD") {
            simbolo = "US$"
        }
        if (moedaDestino == "EUR") {
            simbolo = "€";
        }
        if (moedaDestino == "GBP") {
            simbolo = "£";
        }

        
        let resultado = document.getElementById("resultado");
        resultado.textContent = simbolo + " " + conversao.toFixed(2);

        let resultadoDaConversao = {
            valor: valorUsuario,
            moeda1: moedaOrigem,
            moeda2: moedaDestino,
            resultado: conversao
        }
        salvaResultadoNoHistorico(resultadoDaConversao);

    });    
}

function inverter() {
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;


    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;
}