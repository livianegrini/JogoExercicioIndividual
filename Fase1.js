class Fase1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase1' });
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
        this.load.image('fundo', 'Assets/fundo.png');
        this.load.image('plataforma', 'Assets/plataforma.png');
        this.load.image('maca', 'Assets/maca.png');
        this.load.image('macaPodre', 'Assets/macaPodre.png');
        this.load.spritesheet('personagem', 'Assets/personagem.png', { frameWidth: 106.5, frameHeight: 190 });
        this.load.image('poeira', 'Assets/poeira.png');
        this.load.image('fase2', 'Assets/Fase2.png');
    }
    create() {
        this.add.image(400, 290, 'fundo').setScale(1.1);
        this.poeira = this.add.sprite(0, 0, 'poeira').setScale(0.7);
        this.poeira.setVisible(false);
        this.plataforma.push(this.physics.add.staticImage(140, 300, 'plataforma').setScale(0.5));
        this.plataforma.push(this.physics.add.staticImage(650, 200, 'plataforma').setScale(0.5));
        this.plataforma.push(this.physics.add.staticImage(400, 400, 'plataforma').setScale(0.5));
        this.plataforma.forEach(item => {
            item.setSize(item.width * 0.5, item.height * 0.5);
            item.refreshBody();
        });
        this.teclado = this.input.keyboard.createCursorKeys();

        // Verificação de dispositivo e escolha da imagem da maçã
        if (this.sys.game.device.os.desktop) {
            this.maca = this.physics.add.sprite(100, 0, 'macaPodre').setScale(0.1);
        } else {
            this.maca = this.physics.add.sprite(100, 0, 'maca').setScale(0.1);
        }
        
        this.maca.setCollideWorldBounds(true);
        this.physics.add.collider(this.maca, this.plataforma);
        this.personagem = this.physics.add.sprite(100, 400, 'personagem').setScale(0.7);
        this.placar = this.add.text(50, 15, 'Pontos:' + this.pontuacao, { fontSize: '35px', fill: '#FFD700' });
        this.personagem.setCollideWorldBounds(true);
        this.physics.add.collider(this.personagem, this.plataforma);
        this.physics.add.overlap(this.personagem, this.maca, () => {
            this.maca.setVisible(false);
            var posicaoMaca_Y = Phaser.Math.RND.between(50, 650);
            this.maca.setPosition(posicaoMaca_Y, 100);
            this.pontuacao += 1;
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
        if (this.teclado.left.isDown) {
            this.personagem.setFlipX(true);
            this.personagem.setVelocityX(-150);
            this.personagem.anims.play('voltar', true);
        } else if (this.teclado.right.isDown) {
            this.personagem.setFlipX(false);
            this.personagem.setVelocityX(150);
        } else {
            this.personagem.setVelocityX(0);
            this.personagem.anims.play('parar', true);
        }
        if (this.teclado.up.isDown) {
            this.personagem.setVelocityY(-150);
            this.ativarTurbo();
            this.personagem.anims.play('pular', true);
        } else {
            this.semTurbo();
        }
        this.poeira.setPosition(this.personagem.x, this.personagem.y + (this.personagem.displayHeight / 2) + 25);
        if (this.pontuacao == 10) {
            this.add.image(400, 290, 'fase2').setScale(1.1);
            this.time.delayedCall(2000, () => {
                this.scene.stop("Fase1");
                this.scene.start("Fase2");
            }, [], this);
        }
    }
    ativarTurbo() {
        this.poeira.setVisible(true);
    }
    semTurbo() {
        this.poeira.setVisible(false);
    }
}