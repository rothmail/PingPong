const raquete01 = document.getElementById('raquete01')
const raquete02 = document.getElementById('raquete02')
const bolinha = document.getElementById('bolinha')
const bolinha1 = document.getElementById('bolinhaWall')

let mposx = 0
let mposy = 0
let m2posx = 0
let m2posy = 0
const movimento = 10

console.log(raquete01)

document.addEventListener('keydown', (event) => {

    console.log(event.key)

    if (event.key === 'w') {
        m2posy -= movimento
        if (m2posy < 0) {
            m2posy = 0
        }
    } else if (event.key === 's') {
        m2posy += movimento
        if (m2posy > 372) {
            m2posy = 372
        }
    } else if (event.key === 'a') {
        m2posx -= movimento
        if (m2posx < 0) {
            m2posx = 0
        }
    } else if (event.key === 'd') {
        m2posx += movimento
        if (m2posx > 0) {
            m2posx = 0
        }
    }

    raquete01.style.top = mposy + 'px'
    raquete01.style.left = mposx + 'px'

    if (event.key === 'ArrowUp') {
        mposy -= movimento
        if (mposy < 0) {
            mposy = 0
        }
    } else if (event.key === 'ArrowDown') {
        mposy += movimento
        if (mposy > 372) {
            mposy = 372
        }
    } else if (event.key === 'ArrowLeft') {
        mposx -= movimento
        if (mposx < 0) {
            mposx = 0
        }
    } else if (event.key === 'ArrowRight') {
        mposx += movimento
        if (mposx > 0) {
            mposx = 0
        }
    }

    raquete02.style.top = m2posy + 'px'
    raquete02.style.left = m2posx + 'px'
})


const raquete01Rect2 = raquete02.getBoundingClientRect()
let bolinhaRect = bolinha.getBoundingClientRect()

const raquete01Rect = raquete01.getBoundingClientRect()
bolinhaRect = bolinha.getBoundingClientRect()

if (
    raquete01Rect2.left < bolinhaRect.right &&
    raquete01Rect2.right > bolinhaRect.left &&
    raquete01Rect2.top < bolinhaRect.bottom &&
    raquete01Rect2.bottom > bolinhaRect.top
) {
    alert("Olá")
}


if (
    raquete01Rect.left < bolinhaRect.right &&
    raquete01Rect.right > bolinhaRect.left &&
    raquete01Rect.top < bolinhaRect.bottom &&
    raquete01Rect.bottom > bolinhaRect.top
) {
    alert("Olá")
}

// Posições e velocidades da bolinha
let bolinhaPosX = 390; // Posição inicial X
let bolinhaPosY = 190; // Posição inicial Y
let bolinhaVelX = 4; // Velocidade da bolinha no eixo X
let bolinhaVelY = 4; // Velocidade da bolinha no eixo Y

// Função para mover a bolinha
function moverBolinha() {
    bolinhaPosX += bolinhaVelX;
    bolinhaPosY += bolinhaVelY;

    // Verificar colisão com as bordas (topo e fundo)
    if (bolinhaPosY <= 0 || bolinhaPosY >= 380) { // 380 é a altura da área do jogo
        bolinhaVelY = -bolinhaVelY; // Inverte a direção no eixo Y
    }

    // Verificar colisão com a raquete da esquerda
    if (bolinhaPosX <= 30 && bolinhaPosY >= raquete01.offsetTop && bolinhaPosY <= raquete01.offsetTop + 100) {
        bolinhaVelX = -bolinhaVelX; // Inverte a direção no eixo X
    }

    // Verificar colisão com a raquete da direita
    if (bolinhaPosX >= 770 && bolinhaPosY >= raquete02.offsetTop && bolinhaPosY <= raquete02.offsetTop + 100) {
        bolinhaVelX = -bolinhaVelX; // Inverte a direção no eixo X
    }

    // Verificar se a bolinha saiu pela esquerda ou direita (reiniciar)
    if (bolinhaPosX <= 0 || bolinhaPosX >= 800) {
        bolinhaPosX = 390; // Reiniciar posição X
        bolinhaPosY = 190; // Reiniciar posição Y
    }

    // Atualizar a posição da bolinha no CSS
    bolinha.style.left = `${bolinhaPosX}px`;
    bolinha.style.top = `${bolinhaPosY}px`;

    // Chama a função novamente em cada frame
    requestAnimationFrame(moverBolinha);
}

// Inicia o movimento da bolinha
moverBolinha();