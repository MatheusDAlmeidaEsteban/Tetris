class Pecas {
    constructor(pecas, color) {
        this.pecas = pecas;
        this.color = color;

        this.pecasN = 0;
        this.rolarPecas = this.pecas[this.pecasN];

        this.x = 3;
        this.y = -2;
    }

    pintar(color) {
        for (let linhasAtu = 0; linhasAtu < this.rolarPecas.length; linhasAtu++) {
            for (let colunasAtu = 0; colunasAtu < this.rolarPecas.length; colunasAtu++) {
                if (this.rolarPecas[linhasAtu][colunasAtu]) {
                    DesenharTabuleiro(this.y + linhasAtu, this.x + colunasAtu, color);
                }
            }
        }
    }

    colocar() {
        this.pintar(this.color);
    }

    apagar() {
        this.pintar(fundo);
    }

    esquerda() {
        if (!this.colisao(-1, 0, this.rolarPecas)) {
            this.apagar();
            this.x--;
            this.colocar();
        }
    }

    direita() {
        if (!this.colisao(1, 0, this.rolarPecas)) {
            this.apagar();
            this.x++;
            this.colocar();
        }
    }

    girar() {
        let proximaPeca = this.pecas[(this.pecasN + 1) % this.pecas.length];
        let chute = 0;

        if (this.colisao(0, 0, proximaPeca)) {
            chute = 1;

            if (this.x > colunas / 2) {
                chute = -1;
            }
        }

        if (!this.colisao(chute, 0, proximaPeca)) {
            this.apagar();
            this.x += chute;
            this.pecasN = (this.pecasN + 1) % this.pecas.length;
            this.rolarPecas = this.pecas[this.pecasN];
            this.colocar();
        }
    }

    baixo() {
        if (!this.colisao(0, 1, this.rolarPecas)) {
            this.apagar();
            this.y++;
            this.colocar();
            return;


        }

        this.travar();
        pecas = sortear();
    }

    colisao(x, y, prever) {
        for (let linhasAtu = 0; linhasAtu < prever.length; linhasAtu++) {
            for (let colunasAtu = 0; colunasAtu < prever.length; colunasAtu++) {
                if (!prever[linhasAtu][colunasAtu]) {
                    continue;
                }

                let novoX = this.x + colunasAtu + x;
                let novoY = this.y + linhasAtu + y;

                if (novoX < 0 || novoX >= colunas || novoY >= linhas) {
                    return true;
                }

                if (novoY < 0) {
                    continue;
                }

                if (quadro[novoY][novoX] != fundo) {
                    return true;
                }
            }
        }
        return false;
    }

    travar() {
        podeMover = false;
        for (let linhasAtu = 0; linhasAtu < this.rolarPecas.length; linhasAtu++) {
            for (let colunasAtu = 0; colunasAtu < this.rolarPecas.length; colunasAtu++) {
                if (!this.rolarPecas[linhasAtu][colunasAtu]) {
                    continue;
                }

                if (this.y + linhasAtu < 0) {
                    fim();
                    break;
                }

                quadro[this.y + linhasAtu][this.x + colunasAtu] = this.color;
            }
        }

        for (let linhasAtu = 0; linhasAtu < linhas; linhasAtu++) {

            let linhaCheia = true;

            for (let colunasAtu = 0; colunasAtu < colunas; colunasAtu++) {
                const colocarCor = quadro[linhasAtu][colunasAtu];
                linhaCheia = linhaCheia && (colocarCor !== fundo);
            }

            if (linhaCheia) {
                atualizacao(linhasAtu);
            }
        }

        tabuleiro();
        podeMover = true;
    }

}