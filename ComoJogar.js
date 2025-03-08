class ComoJogar extends Phaser.Scene {

    // Definindo as dimensões do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        // Chamando o construtor da cena com o nome "ComoJogar"
        super("ComoJogar");
    }

    preload() {
        // Carregando a imagem de fundo da explicação do jogo
        this.load.image("fundoExplicacao", "Assets/fundoExplicacao.png");
        // Carregando a imagem do botão de voltar
        this.load.image("botaoVoltar", "Assets/botaoVoltar.png");
    }

    create() {
        // Adiciona a imagem de fundo no centro da tela
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "fundoExplicacao").setScale(0.8);

        // Configuração do botão "Voltar"
        this.botaoVoltar = this.add.image(700, 70, "botaoVoltar").setScale(0.3).setInteractive();

        // Quando o mouse passa sobre o botão, muda o cursor para "pointer"
        this.botaoVoltar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        // Quando o mouse sai do botão, retorna o cursor ao padrão
        this.botaoVoltar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });
        // Quando o botão for pressionado, retorna para a cena inicial do jogo
        this.botaoVoltar.on("pointerdown", () => {
            this.scene.start("CenaInicial")
        })
    }

}