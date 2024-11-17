const raquete1 = document.getElementById('raquete1');
const raquete2 = document.getElementById('raquete2');
const bola = document.getElementById('bola');
const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');
const placar = document.getElementById('placar');

// Variáveis do jogo
let bolaPosX = 500;
let bolaPosY = 200;
let bolaSpeedX = 0;
let bolaSpeedY = 0;
const bolaAreaWidth = 1000;
const bolaAreaHeight = 490;
let mposy = 200;
let m2posy = 200;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
const movimento = 10;

// Configuração inicial
raquete1.style.left = '0px'; // Raquete 1 à esquerda
raquete2.style.left = `${bolaAreaWidth - raquete2.offsetWidth}px`; // Raquete 2 à direita

// Iniciar o jogo
playButton.addEventListener('click', () => {
    bolaSpeedX = 5;
    bolaSpeedY = 5;
});

// Pausar o jogo
pauseButton.addEventListener('click', () => {
    bolaSpeedX = 0;
    bolaSpeedY = 0;
});

// Função para verificar colisões e atualizar pontuação
function movebola() {
    bolaPosX += bolaSpeedX;
    bolaPosY += bolaSpeedY;

    // Verifica colisão com as bordas verticais
    if (bolaPosY <= 0 || bolaPosY >= bolaAreaHeight - bola.offsetHeight) {
        bolaSpeedY *= -1; // Inverte a direção vertical
    }

    // Verifica colisão com as raquetes
    checkCollision();

    // Verifica se a bola saiu pelas laterais
    if (bolaPosX <= 0) {
        pointsPlayer2++;
        placar.innerText = `${pointsPlayer1} x ${pointsPlayer2}`;
        resetBall();
    } else if (bolaPosX >= bolaAreaWidth - bola.offsetWidth) {
        pointsPlayer1++;
        placar.innerText = `${pointsPlayer1} x ${pointsPlayer2}`;
        resetBall();
    }

    // Atualiza posição visual da bola
    bola.style.left = bolaPosX + 'px';
    bola.style.top = bolaPosY + 'px';
}

// Função para detectar colisões com as raquetes
function checkCollision() {
    const bolaRect = bola.getBoundingClientRect();
    const raquete1Rect = raquete1.getBoundingClientRect();
    const raquete2Rect = raquete2.getBoundingClientRect();

    if (
        bolaRect.left < raquete1Rect.right &&
        bolaRect.right > raquete1Rect.left &&
        bolaRect.top < raquete1Rect.bottom &&
        bolaRect.bottom > raquete1Rect.top
    ) {
        bolaSpeedX = Math.abs(bolaSpeedX); // Muda direção para a direita
    }

    if (
        bolaRect.left < raquete2Rect.right &&
        bolaRect.right > raquete2Rect.left &&
        bolaRect.top < raquete2Rect.bottom &&
        bolaRect.bottom > raquete2Rect.top
    ) {
        bolaSpeedX = -Math.abs(bolaSpeedX); // Muda direção para a esquerda
    }
}

// Função para reiniciar a posição da bola no centro
function resetBall() {
    bolaPosX = bolaAreaWidth / 2 - bola.offsetWidth / 2;
    bolaPosY = bolaAreaHeight / 2 - bola.offsetHeight / 2;
    bolaSpeedX = Math.random() > 0.5 ? 5 : -5;
    bolaSpeedY = Math.random() > 0.5 ? 5 : -5;
}

// Movimenta as raquetes de acordo com as teclas pressionadas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        m2posy = Math.max(0, m2posy - movimento);
    } else if (event.key === 'ArrowDown') {
        m2posy = Math.min(bolaAreaHeight - raquete2.offsetHeight, m2posy + movimento);
    } else if (event.key === 'w') {
        mposy = Math.max(0, mposy - movimento);
    } else if (event.key === 's') {
        mposy = Math.min(bolaAreaHeight - raquete1.offsetHeight, mposy + movimento);
    }

    // Atualiza posição visual das raquetes
    raquete1.style.top = mposy + 'px';
    raquete2.style.top = m2posy + 'px';
});

// Configura a bola para se mover a cada 30ms
setInterval(movebola, 30);