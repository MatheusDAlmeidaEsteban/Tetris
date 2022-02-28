const tela = document.getElementById("tetris");
const contexto = tela.getContext("2d");
const pontuacao = document.getElementById("pontu");
const velocidade = document.getElementById("velo");

const linhas = 20;
const colunas = 15;
const tamanho = 30;
const fundo = "#000000";
const borda = "rgba(255,255,255,0.6)";

let velo = 500;
let pontu = 0;
let podeMover = true;
let comecarCair = Date.now();


let quadro = [];
for (let linhasAtu = 0; linhasAtu < linhas; linhasAtu++) {
    quadro[linhasAtu] = [];
    for (let colunasAtu = 0; colunasAtu < colunas; colunasAtu++) {
        quadro[linhasAtu][colunasAtu] = fundo;
    }
}


tabuleiro();

const PECAS = [
    [Z, 'red'],
    [S, 'green'],
    [T, 'yellow'],
    [O, 'blue'],
    [L, 'purple'],
    [I, 'cyan'],
    [J, 'orange'],
];

let pecas = sortear();

cair();

document.addEventListener("keydown", controle);