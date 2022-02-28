function tabuleiro() {
    for (let linhasAtu = 0; linhasAtu < linhas; linhasAtu++) {
        for (let colunasAtu = 0; colunasAtu < colunas; colunasAtu++) {
            const colocarCor = quadro[linhasAtu][colunasAtu];
            DesenharTabuleiro(linhasAtu, colunasAtu, colocarCor);
        }
    }

    pontuacao.innerHTML = pontu;



}

function DesenharTabuleiro(y, x, color) {
    contexto.fillStyle = color;
    contexto.fillRect(x * tamanho, y * tamanho, tamanho, tamanho);

    if (color == fundo) {
        contexto.strokeStyle = borda;
    }

    contexto.strokeRect(x * tamanho, y * tamanho, tamanho, tamanho);
}

function sortear() {
    const randomPieceNumber = Math.floor(Math.random() * PECAS.length);
    return new Pecas(
        PECAS[randomPieceNumber][0],
        PECAS[randomPieceNumber][1],
    );

}

function cair() {
    const now = Date.now();
    const delta = now - comecarCair;

    if (delta > velo) {
        pecas.baixo();
        comecarCair = Date.now();
    }
    requestAnimationFrame(cair);
}

function controle(event) {

    if (!podeMover) {
        return false;
    }

    const moverPecas = {
        ArrowLeft() {
            pecas.esquerda();
            comecarCair = Date.now();
        },
        ArrowRight() {
            pecas.direita();
            comecarCair = Date.now();
        },
        ArrowUp() {
            pecas.girar();
            comecarCair = Date.now();
        },
        ArrowDown() {
            pecas.baixo();

        }
    };

    const movePecas = moverPecas[event.code];
    movePecas();
}

function atualizacao(linhas) {
    podeMover = false;

    for (let y = linhas; y > 1; y--) {
        for (let colunasAtu = 0; colunasAtu < colunas; colunasAtu++) {
            removerLinha(y, colunasAtu);
        }
    }

    for (let colunasAtu = 0; colunasAtu < colunas; colunasAtu++) {
        quadro[0][colunasAtu] = fundo;
    }

    pontu += 10;

    if (velo > 100) {
        velo -= 20;
    }

    podeMover = true;
}

function removerLinha(remoLinha, remoColuna) {
    quadro[remoLinha][remoColuna] = quadro[remoLinha - 1][remoColuna];
}

function fim() {
    let aviso = confirm("Game over! Jogar novamente?");

    if (warning) {
        reiniciar();
    }
}

function reiniciar() {
    velo = 500;
    comecarCair = Date.now();
    pontu = 0;

    quadro = [];
    for (let linhasAtu = 0; linhasAtu < linhas; linhasAtu++) {
        quadro[linhasAtu] = [];
        for (let colunasAtu = 0; colunasAtu < colunas; colunasAtu++) {
            quadro[linhasAtu][colunasAtu] = fundo;
        }
    }

    pecas = sortear();
    tabuleiro();
}