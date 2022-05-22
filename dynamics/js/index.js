//const puntajes = document.getElementById ("boton1"); --->puntajes
const nivel1 = document.getElementById('nivel1');
const nivel2 = document.getElementById('nivel2');
const nivel3 = document.getElementById('nivel3');
const banderas = document.getElementById('num-banderas');
const banderasRestantes = document.getElementById('banderas-restantes');

const contenedorJuego = document.querySelector('.contenedor-juego');
const juego = document.querySelector('.juego');

let width = 0, numBomb = 0, numBand = 0, casillas = [], fin = false;

nivel1.addEventListener('click', tablerito);
nivel2.addEventListener('click', tablerito);
nivel3.addEventListener('click', tablerito);

function numerosVecinas() {
    for (let i=0; i < casillas.length; i++) {
        let total = 0;
        const borIzq = (i % width === 0);
        const borDech = (i % width === width - 1);

        if (casillas[i].classList.contains('vacio')) {

            if (i > 0 && ! borIzq && casillas[i-1].classList.contains('bomba')) total++;
            if (i < (width*width-1) && !borDech && casillas[i+1].classList.contains('bomba')) total++;
            if (i > width && casillas[i-width].classList.contains('bomba')) total++;
            if (i > (width-1) && !borDech && casillas[i+1-width].classList.contains('bomba')) total++;
            if (i > width && !borIzq && casillas[i-1-width].classList.contains('bomba')) total++;
            if (i < (width*(width-1)) && casillas[i+width].classList.contains('bomba')) total++;
            if (i < (width*(width-1)) && !borDech && casillas[i+1+width].classList.contains('bomba')) total++;
            if (i < (width*(width-1)) && !borIzq && casillas[i-1+width].classList.contains('bomba')) total++;

            casillas[i].setAttribute('data', total);
        }
    }
}

function abrirVecinas(casilla)
{
    const idCasilla = parseInt(casilla.id);
    const borIzq = (idCasilla % width === 0);
    const borDech = (idCasilla % width === width - 1);

    setTimeout(() => {
        if (idCasilla > 0 && !borIzq) click(casillas[idCasilla-1]);
        if (idCasilla < (width*width-2) && !borDech) click(casillas[idCasilla+1]);
        if (idCasilla >= width) click(casillas[idCasilla-width]);
        if (idCasilla > (width-1) && !borDech) click(casillas[idCasilla+1-width]);
        if (idCasilla > (width+1) && !borIzq) click(casillas[idCasilla-1-width]);
        if (idCasilla < (width*(width-1))) click(casillas[idCasilla+width]);
        if (idCasilla < (width*width-width-2) && !borDech) click(casillas[idCasilla+1+width]);
        if (idCasilla < (width*width-width) && !borIzq) click(casillas[idCasilla-1+width]);
    }, 10);
}

function bomba(casillaClickeada) {
    fin = true;
    casillaClickeada.classList.add('back-red');

    casillas.forEach((casilla, index, array) => {
        if (casilla.classList.contains('bomba')) {
            casilla.innerHTML = '🎇';
            casilla.classList.remove('bomba');
            casilla.classList.add('marcada');
        }
    });
}

function ponerBanderas(casilla) {
    if (fin) return;

    if (!casilla.classList.contains('marcada') && numBanderas < numBomb) {
        if (!casilla.classList.contains('bandera')) {
            casilla.classList.add('bandera');
            casilla.innerHTML = '🏴‍☠️';
            numBanderas++;
            actualizaNumBanderas();
            compruebaBanderas();
        } else {
            casilla.classList.remove('bandera');
            casilla.innerHTML = '';
            numBanderas--;
        }
    }
}

function compruebaBanderas() {
    let aciertos = 0;
    for (let i = 0; i < casillas.length; i++) {
        if (casillas[i].classList.contains('bandera') && casillas[i].classList.contains('bomba'))
            aciertos++;
    }
    if (aciertos === numBomb) {
        fin = true;
    }
}

function actualizaBanderas() {
    banderas.textContent = numBand;
    banderasRestantes.textContent = (numBomb - numBand);
}

function click(casilla) {
    if (casilla.classList.contains('marcada')|| fin) return;

    if (casilla.classList.contains('bomba')) {
        bomba(casilla);
    } else {
        let total = casilla.getAttribute('data');
        if (total != 0) {
            casilla.classList.add('marcada');
            casilla.innerHTML = total;
            return;
        }
        casilla.classList.add('marcada');
        abrirVecinas(casilla);
    }
}

function dobleClick(casilla) {
        if (!casilla.classList.contains('marcada') || fin) return;
        abrirVecinas(casilla);
}

function tablerito(evento) {
    if(evento.target == nivel1){
        nivel2.removeEventListener('click', tablerito);
        nivel3.removeEventListener('click', tablerito);
        width = 8;
        numBomb = 10;
    }else if(evento.target == nivel2){
        nivel1.removeEventListener('click', tablerito);
        nivel3.removeEventListener('click', tablerito);
        width = 16;
        numBomb = 40;
    }else if(evento.target == nivel3){
        nivel1.removeEventListener('click', tablerito);
        nivel2.removeEventListener('click', tablerito);
        width = 24;
        numBomb = 99;
    }
        
    if (contenedorJuego.classList.contains('hidden')) {
        contenedorJuego.classList.remove('hidden');
    } else {
        juego.innerHTML = "";
        casillas = [];
        fin = false;
        numBanderas = 0;
        nivel1.addEventListener('click', tablerito);
        nivel2.addEventListener('click', tablerito);
        nivel3.addEventListener('click', tablerito);
    }

    juego.style.width = (width * 4) + 'rem';

    const arrayBombas = Array(numBomb).fill('bomba');
    const arrayVacios = Array(width*width - numBomb).fill('vacio');
    const arrayCompleto = arrayVacios.concat(arrayBombas);
    arrayCompleto.sort(() =>  Math.random() - 0.5 );
    
    for(let i=0; i < width*width; i++) {
        const casilla = document.createElement('div');
        casilla.setAttribute('id', i);
        casilla.classList.add(arrayCompleto[i]);
        juego.appendChild(casilla);
        casillas.push(casilla);
        
        casilla.addEventListener('click', () => {
            click(event.target);
        });

        casilla.oncontextmenu = function(event) {
            event.preventDefault();
            ponerBanderas(casilla);
        }

        casilla.addEventListener('dblclick', () => {
            dobleClick(event.target);
        });
    }
    numerosVecinas();
    actualizaBanderas();
}
