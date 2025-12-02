import { getState } from './store.js';

const iframeNocaute = document.querySelector('.iframe-nocaute > iframe');
const ASPECT_RATIO = 9 / 16;

const aplicarTemaNoBody = () => {
    const { tema } = getState();

    document.body.classList.remove('escuro', 'claro');
    document.body.classList.add(tema);
}

aplicarTemaNoBody();

window.addEventListener('estadoAtualizado', aplicarTemaNoBody);

const ajustarIframe = e => {
    if(iframeNocaute) {
        const larguraTela = e.currentTarget ? e.currentTarget.innerWidth : window.innerWidth;

        const larguraPadrao = 560;

        let larguraFinal;

        if (larguraTela < 620) {
            larguraFinal = larguraTela * 0.8;
        } else {
            larguraFinal = larguraPadrao;
        }

        iframeNocaute.style.width = larguraFinal + "px";
        iframeNocaute.style.height = (larguraFinal * ASPECT_RATIO) + "px";
    }
}


window.addEventListener('DOMContentLoaded', ajustarIframe);
window.addEventListener('resize', ajustarIframe)

window.addEventListener('ir-para-secao', (e) => {
    const section = e.detail.section;

    if (!location.pathname.endsWith("index.html") && !location.pathname.endsWith("/")) {
        location.href = `index.html#${section}`;
        return;
    }

    const elemento = document.querySelector(`.${section}`);
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
    }
});
