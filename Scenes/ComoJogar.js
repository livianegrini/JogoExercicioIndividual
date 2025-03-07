class ComoJogar extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("ComoJogar");
    }

    preload() {
        this.load.image("fundoExplicacao", "Assets/fundoExplicacao.png");
        this.load.image("botaoVoltar", "Assets/botaoVoltar.png");
    }

    create() {
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "fundoExplicacao").setScale(0.8);

        // Configuração do botão Voltar
        this.botaoVoltar = this.add.image(700, 70, "botaoVoltar").setScale(0.3).setInteractive();


        this.botaoVoltar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoVoltar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoVoltar.on("pointerdown", () => {
            this.scene.start("CenaInicial")
        })
    }

}