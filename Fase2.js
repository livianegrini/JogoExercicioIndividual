class Fase2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Fase2',
            physics: {
                arcade: {
                    debug: false,
                    gravity: { y: 350 }
                }
            }
        });

        this.moeda;
        this.maca;
        this.bomba;
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
        this.load.image('fundo', 'Assets/fundoExplicacao.png');
        // Carregando imagem da platarfoma
        this.load.image('plataforma', 'Assets/plataforma.png');
        // Carregando imagem da moeda
        this.load.image('moeda', 'Assets/moeda.png');
        // Carregando imagem do personagem
        this.load.spritesheet('personagem', 'Assets/personagem.png', { frameWidth: 106.5, frameHeight: 190 });
        // Carregando imagem da poeira
        this.load.image('poeira', 'Assets/poeira.png');
        // Carregando imagem da bomba
        this.load.image('bomba', 'Assets/bomba.png');
        // Carregando imagem de game over
        this.load.image('perdeu', 'Assets/perdeu.png');
        // Carregando imagem de vitória
        this.load.image('ganhou', 'Assets/ganhou.png');
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

        // Percorre a lista de plataformas e ajusta suas hitboxes
        this.plataforma.forEach(item => {
            // Define o tamanho da hitbox proporcional ao scale aplicado
            item.setSize(item.width * 0.5, item.height * 0.5);
            // Atualiza o corpo físico da plataforma após a modificação da hitbox
            item.refreshBody();
        });

        // Captura as teclas do teclado para controle do personagem
        this.teclado = this.input.keyboard.createCursorKeys();

        // Adicionando imagem da moeda
        this.moeda = this.physics.add.sprite(100, 0, 'moeda').setScale(0.8);
        this.moeda.setCollideWorldBounds(true);

        // Adicionando imagem da maçã
        this.maca = this.physics.add.sprite(550, 0, 'maca').setScale(0.1);
        this.maca.setCollideWorldBounds(true);

        // Adicionando imagem da bomba
        this.bomba = this.physics.add.sprite(350, 0, 'bomba').setScale(0.2);
        this.bomba.setCollideWorldBounds(true);

        // Adicionando colisão entre a moeda e a plataforma
        this.physics.add.collider(this.moeda, this.plataforma);

        // Adicionando colisão entre a maçã e a plataforma
        this.physics.add.collider(this.maca, this.plataforma);

        // Adicionando colisão entre a bomba e a plataforma
        this.physics.add.collider(this.bomba, this.plataforma);

        // Adicionando personagem ao jogo
        this.personagem = this.physics.add.sprite(100, 400, 'personagem').setScale(0.7);

        // Adicionando texto placar 
        this.placar = this.add.text(50, 15, 'Pontos:' + this.pontuacao, { fontSize: '35px', fill: '#FFD700' });

        // Impede que o personagem saia da tela
        this.personagem.setCollideWorldBounds(true);

        // Adicionando colisão entre a personagem e a plataforma
        this.physics.add.collider(this.personagem, this.plataforma);

        // Quando o personagem encostar na moeda
        this.physics.add.overlap(this.personagem, this.moeda, () => {
            // Esconde a moeda temporariamente
            this.moeda.setVisible(false);
            // Gera uma nova posição aleatória para a moeda no eixo Y
            var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650);
            // Define a nova posição da moeda
            this.moeda.setPosition(posicaoMoeda_Y, 100);
            // Incrementa a pontuação do jogador
            this.pontuacao += 1;
            console.log("Pontuação:" + this.pontuacao);
            // Atualiza o texto do placar com a nova pontuação
            this.placar.setText('Pontos:' + this.pontuacao);
            // Torna a moeda visível novamente após ser recolhida
            this.moeda.setVisible(true);
        });

        // Quando o personagem encostar na maçã
        this.physics.add.overlap(this.personagem, this.maca, () => {
            // Esconde a maçã temporariamente
            this.maca.setVisible(false);
            // Gera uma nova posição aleatória para a maçã no eixo Y
            var posicaoMaca_Y = Phaser.Math.RND.between(50, 650);
            // Define a nova posição da maçã
            this.maca.setPosition(posicaoMaca_Y, 100);
            // Incrementa a pontuação do jogador
            this.pontuacao += 1;
            console.log("Pontuação:" + this.pontuacao);
            // Atualiza o texto do placar com a nova pontuação
            this.placar.setText('Pontos:' + this.pontuacao);
            // Torna a moeda visível novamente após ser recolhida
            this.maca.setVisible(true);
        });

        // Quando o personagem encostar na bomba
        this.physics.add.overlap(this.personagem, this.bomba, () => {
            // Esconde a bomba temporariamente
            this.bomba.setVisible(false);
            // Gera uma nova posição aleatória para a bomba no eixo Y
            var posicaoBomba_Y = Phaser.Math.RND.between(50, 650);
            // Define a nova posição da bomba
            this.bomba.setPosition(posicaoBomba_Y, 100);

            this.add.image(400, 290, 'perdeu').setScale(1.1);

            // Aguarda 2 segundos (2000 milissegundos) antes de mudar para a cena inicial
            this.time.delayedCall(2000, () => {
                this.scene.start("CenaInicial");
            }, [], this);

        });

        // Adicionando animações do personagem
        // Adicionando animações andar
        this.anims.create({
            key: "andar",
            frames: this.anims.generateFrameNumbers("personagem", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        // Adicionando animações parar
        this.anims.create({
            key: "parar",
            frames: this.anims.generateFrameNumbers("personagem", { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        // Adicionando animações voltar
        this.anims.create({
            key: "voltar",
            frames: this.anims.generateFrameNumbers("personagem", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        // Adicionando animações pular
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
            // Inverte o personagem para a direção esquerda
            this.personagem.setFlipX(true);
            // Define a velocidade do personagem para se mover para a esquerda
            this.personagem.setVelocityX(-150);
            // Toca a animação de "voltar" (movimento para a esquerda)
            this.personagem.anims.play('voltar', true);
            console.log("Tecla esquerda pressionada");
        } else if (this.teclado.right.isDown) {
            // Movimenta para a direita
            // Restaura o personagem para a direção normal (direita)
            this.personagem.setFlipX(false);
            // Define a velocidade do personagem para se mover para a direita
            this.personagem.setVelocityX(150);
            this.personagem.anims.play('andar', true);
            console.log("Tecla direita pressionada");

        } else {
            // Se nenhuma tecla de direção for pressionada, o personagem fica parado
            this.personagem.setVelocityX(0);
            this.personagem.anims.play('parar', true);
        }

        // Movimento para cima (pulo)
        if (this.teclado.up.isDown) {
            // Verificar se o personagem esta tocando o chao antes de pular
            this.personagem.setVelocityY(-150);
            // Ativa a poeira
            this.ativarTurbo();
            // Aciona a animação de "pular"
            this.personagem.anims.play('pular', true);
            console.log("Tecla pra cima pressionada");
        }
        // Movimento para baixo
        else {
            // Se a tecla para cima não for pressionada, desativa o efeito de poeira (sem turbo)
            this.semTurbo();
        }

        // Atualiza a posição da "poeira" em relação ao personagem
        this.poeira.setPosition(this.personagem.x, this.personagem.y + (this.personagem.displayHeight / 2) + 25);
        
        // Verifica se o jogador atingiu a pontuação necessária para mudar para a próxima fase
        if (this.pontuacao == 10) {
            this.add.image(400, 290, 'ganhou').setScale(1.1);

            // Aguarda 2 segundos (2000 milissegundos) antes de mudar para a cena inicial
            this.time.delayedCall(2000, () => {
                this.scene.stop("Fase2");
                this.scene.start("CenaInicial");
            }, [], this);
        }

    }

    // Função para ativar poeira
    ativarTurbo() {
        this.poeira.setVisible(true);

    }

    // Função para desativar poeira
    semTurbo() {
        this.poeira.setVisible(false);

    }
}