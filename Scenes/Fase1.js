class Fase1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Fase1',
            physics: {
                arcade: {
                    debug: false,
                    gravity: { y: 350 }
                }
            }
        });

        this.maca;
        this.plataforma = [];
        this.personagem;
        this.teclado;
        this.pontuacao = 0;
        this.placar;
        this.teste;
        this.poeira;
    }

    preload() {
        // Carregando imagem de fundo
        this.load.image('fundo', 'Assets/fundo.png');
        // Carregando imagem da platarfoma
        this.load.image('plataforma', 'Assets/plataforma.png');
        // Carregando imagem da maca
        this.load.image('maca', 'Assets/maca.png');
        // Carregando imagem do personagem
        this.load.spritesheet('personagem', 'Assets/personagem.png', { frameWidth: 106.5, frameHeight: 190 });
        // Carregando imagem da poeira
        this.load.image('poeira', 'Assets/poeira.png');
        // Carregando imagem da fase 2
        this.load.image('fase2', 'Assets/fase2.png');
    }

    create() {
        // Adicionando imagem de fundo
        this.add.image(400, 290, 'fundo').setScale(1.1);


        // Adicionando imagem da poeira
        this.poeira = this.add.sprite(0, 0, 'poeira').setScale(0.7);
        this.poeira.setVisible(false);

        // Adicionando 3 imagens de plataformas na lista de plataformas
        this.plataforma.push(this.physics.add.staticImage(140, 300, 'plataforma').setScale(0.5));
        this.plataforma.push(this.physics.add.staticImage(650, 200, 'plataforma').setScale(0.5));
        this.plataforma.push(this.physics.add.staticImage(400, 400, 'plataforma').setScale(0.5));

        this.plataforma.forEach(item => {

            item.setSize(item.width * 0.5, item.height * 0.5); // Centraliza a hitbox, como se fosse o setScale
            item.refreshBody(); // Atualiza o corpo físico após o scale
        });

        // Captura as teclas do teclado para controle do personagem
        this.teclado = this.input.keyboard.createCursorKeys();

        // Adicionando imagem da maca
        this.maca = this.physics.add.sprite(100, 0, 'maca').setScale(0.1);
        this.maca.setCollideWorldBounds(true);

        // Adicionando colisão entre a maca e a plataforma
        this.physics.add.collider(this.maca, this.plataforma);

        this.personagem = this.physics.add.sprite(100, 400, 'personagem').setScale(0.7);
        // personagem.setBounce(0.7);

        // Adicionando texto placar 
        this.placar = this.add.text(50, 15, 'Pontos:' + this.pontuacao, { fontSize: '35px', fill: '#FFD700' });

        // Impede que o personagem saia da tela
        this.personagem.setCollideWorldBounds(true);

        // Adicionando colisão entre a personagem e a plataforma
        this.physics.add.collider(this.personagem, this.plataforma);

        // Quando o personagem encostar na maca
        this.physics.add.overlap(this.personagem, this.maca, () => {
            this.maca.setVisible(false);
            var posicaoMaca_Y = Phaser.Math.RND.between(50, 650);
            this.maca.setPosition(posicaoMaca_Y, 100);
            this.pontuacao += 1;
            console.log("Pontuação:" + this.pontuacao);
            this.placar.setText('Pontos:' + this.pontuacao);
            this.maca.setVisible(true);
        });

        this.anims.create({
            key: "andar",
            frames: this.anims.generateFrameNumbers("personagem", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "parar",
            frames: this.anims.generateFrameNumbers("personagem", { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "voltar",
            frames: this.anims.generateFrameNumbers("personagem", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "pular",
            frames: this.anims.generateFrameNumbers("personagem", { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update() {
        // Movimenta para a esquerda 
        if (this.teclado.left.isDown) {
            // 
            this.personagem.setFlipX(true);
            this.personagem.setVelocityX(-150);
            this.personagem.anims.play('voltar', true);
            console.log("Tecla esquerda pressionada");
        } else if (this.teclado.right.isDown) {
            this.personagem.setFlipX(false);
            this.personagem.setVelocityX(150);
            console.log("Tecla direita pressionada");
            // Movimenta para a direita
        } else {
            this.personagem.setVelocityX(0);
            this.personagem.anims.play('parar', true);
            // Faz ele ficar parado
        }

        // Movimento para cima
        if (this.teclado.up.isDown) {
            // verificar se alien esta tocando o chao antes de pular
            this.personagem.setVelocityY(-150);
            this.ativarTurbo();
            this.personagem.anims.play('pular', true);
            console.log("Tecla pra cima pressionada");
        }
        // Movimento para baixo
        else {
            this.semTurbo();
        }

        // Atualiza a posição do "foguinho" em relação ao personagem
        this.poeira.setPosition(this.personagem.x, this.personagem.y + (this.personagem.displayHeight / 2) + 25);

        if (this.pontuacao == 1) {
            this.add.image(400, 290, 'fase2').setScale(1.1);

            // Aguarda 2 segundos (2000 milissegundos) antes de mudar para a cena inicial
            this.time.delayedCall(2000, () => {
                this.scene.stop("Fase1");
                this.scene.start("Fase2");
            }, [], this);
        }

    }

    // Função para ativar turbo
    ativarTurbo() {
        this.poeira.setVisible(true);

    }

    // Função para desativar turbo
    semTurbo() {
        this.poeira.setVisible(false);

    }
}