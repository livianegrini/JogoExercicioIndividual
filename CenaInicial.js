class CenaInicial extends Phaser.Scene {
    // Definindo as dimensões do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    // Chamando o construtor da cena com o nome "CenaInicial"
    constructor() {
        super("CenaInicial");
    }

    preload() {
        // Carregando as imagens que serão usadas na cena
        this.load.image("capa", "Assets/capa.png");
        this.load.image("botaoJogar", "Assets/botaoJogar.png");
        this.load.image("botaoComoJogar", "Assets/botaoComoJogar.png");
    }

    create() {
        // Adiciona a imagem de capa do jogo no centro da tela
        this.add.image(this.larguraJogo / 2, 350, "capa").setScale(0.8);

        // Configuração do botão Jogar
        this.botaoJogar = this.add.image(190, 390, "botaoJogar").setScale(0.4).setInteractive();

        // Define comportamento ao passar o mouse sobre o botão (muda o cursor para "pointer")
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        // Define comportamento quando o mouse sai do botão (cursor volta ao padrão)
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Define o que acontece ao clicar no botão "Jogar"
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("Fase1")
        })

        // Configuração do botão "Como Jogar"
        this.botaoComoJogar = this.add.image(590, 390, "botaoComoJogar").setScale(0.4).setInteractive();

        // Define comportamento ao passar o mouse sobre o botão "Como Jogar"
        this.botaoComoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        // Define comportamento quando o mouse sai do botão "Como Jogar"
        this.botaoComoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });
        // Define o que acontece ao clicar no botão "Como Jogar"
        this.botaoComoJogar.on("pointerdown", () => {
            // Quando clicado, inicia a cena "ComoJogar"
            this.scene.start("ComoJogar")
        })
    }

}
