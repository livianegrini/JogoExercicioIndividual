class CenaInicial extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("CenaInicial");
    }

    preload() {
        this.load.image("capa", "../Assets/capa.png");
        this.load.image("botaoJogar", "../Assets/botaoJogar.png");
        this.load.image("botaoComoJogar", "../Assets/botaoComoJogar.png");
    }

    create() {
        this.add.image(this.larguraJogo / 2, 350, "capa").setScale(0.8);

        // Configuração do botão Jogar
        this.botaoJogar = this.add.image(190, 390, "botaoJogar").setScale(0.4).setInteractive();
        

        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("Fase1")
        })

        // Configuração do botão Como Jogar
        this.botaoComoJogar = this.add.image(590, 390, "botaoComoJogar").setScale(0.4).setInteractive();
        

        this.botaoComoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoComoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoComoJogar.on("pointerdown", () => {
            this.scene.start("ComoJogar")
        })
    }

}
