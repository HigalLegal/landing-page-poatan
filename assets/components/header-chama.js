import { getState, setState } from "../scripts/store.js";

class HeaderChama extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.theme = getState().tema;
        this.mobileMenuOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this.getStyles()}
            </style>
            <header class="navbar">
                <ul class="desktop-menu">
                    <li><a data-section="inicio">Início</a></li>
                    <li><a data-section="biografia-rapida">Biográfia rapida</a></li>
                    <li><a data-section="conquistas">Conquista</a></li>
                    <li><a data-section="israel-adesanya-1">Rivalidade com Adesanya</a></li>
                    <li><a href="detalhes.html">Detalhes e curiosidades</a></li>
                    <li><button class="trocar-tema">Trocar tema</button></li>
                </ul>

                <button class="btn-hamburger">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 18L20 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M4 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M4 6L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>                
                </button>

                <ul class="mobile-menu">
                    <li><a data-section="inicio">Início</a></li>
                    <li><a data-section="biografia-rapida">Biográfia rapida</a></li>
                    <li><a data-section="conquistas">Conquista</a></li>
                    <li><a data-section="israel-adesanya-1">Rivalidade com Adesanya</a></li>
                    <li><a href="detalhes.html">Detalhes e curiosidades</a></li>
                    <li><button class="trocar-tema">Trocar tema</button></li>
                </ul>
            </header>
        `;
    }

    getStyles() {
        return `
            * {
                padding: 0;
                margin: 0;
            }

            .navbar {
                padding: 10px;
                background-color: var(--cor-fundo-secundario);
                color: var(--cor-texto-principal);
                transition: background-color 0.8s ease, color 0.8s ease;
            }

            .desktop-menu {
                display: flex;
                justify-content: space-around;
            }

            .navbar li {
                list-style-type: none;
            }

            .navbar a {
                text-decoration: none;
                color: inherit;
                font: inherit;
                background: none;      
                border: none;
                margin: 0;
                padding: 4px 6px;
                border-radius: 8px;
            }

            .trocar-tema {
                padding: 5px 10px;
                background: none;
                border: 1px solid var(--cor-borda);
                margin: 0;
                color: inherit;
                font: inherit;
                cursor: pointer;
            }

            .btn-hamburger {
                display: none;
                background: none;
                border: none;
                border-radius: 5px;
                padding: 4px;
                color: var(--cor-texto-principal);
                cursor: pointer;
            }

            .btn-hamburger:hover, .navbar a:hover, .trocar-tema:hover {
                background-color: var(--cor-hover);
            }

            .btn-hamburger:active, .navbar a:active, .trocar-tema:active {
                background-color: var(--cor-texto-secundario);
            }

            .btn-hamburger svg {
                width: 24px;
                height: 24px;
            }

            .mobile-menu {
                overflow: hidden;
                max-height: 0;
                opacity: 0;
                transition: max-height 0.8s ease, opacity 0.8s ease;
                display: flex;
                flex-direction: column;
            }

            .mobile-menu li {
                margin-top: 8px;
            }

            .mobile-menu.aberto {
                max-height: 500px;
                opacity: 1;
            }

            .mobile-menu.fechado {
                max-height: 0;
                opacity: 0;
            }

            @media (max-width: 750px) {
                .desktop-menu {
                    display: none;
                }

                .btn-hamburger {
                    display: block;
                    margin-top: 5px;
                }
            }
        `;
    }

    setupEventListeners() {
        this.shadowRoot.querySelectorAll('.trocar-tema').forEach(button => {
            button.addEventListener('click', () => this.toggleTheme());
        });

        const hamburgerBtn = this.shadowRoot.querySelector('.btn-hamburger');
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        
        hamburgerBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        this.resizeHandler = () => this.handleResize();
        window.addEventListener('resize', this.resizeHandler);
        
        this.shadowRoot.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        this.shadowRoot.querySelectorAll('a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
        
                window.dispatchEvent(new CustomEvent('ir-para-secao', {
                    detail: { section }
                }));
        
                this.closeMobileMenu();
            });
        });
    }

    toggleTheme() {
        this.applyTheme();
    }

    applyTheme() {
        const { tema } = getState();
        if(tema === 'escuro') {
            setState({tema: 'claro'});
        } else {
            setState({tema: 'escuro'});
        }
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        
        if (this.mobileMenuOpen) {
            mobileMenu.classList.remove('fechado');
            mobileMenu.classList.add('aberto');
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
        mobileMenu.classList.remove('aberto');
        mobileMenu.classList.add('fechado');
        this.mobileMenuOpen = false;
    }

    handleResize() {
        if (window.innerWidth > 750 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.resizeHandler);
    }
}

customElements.define('header-chama', HeaderChama);