class FooterChama extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this.getStyles()}
            </style>
            <footer>
                <p>Todos os direitos reservados.</p>
            </footer>
        `;
    }

    getStyles() {
        return `
            footer {
                width: 100%;
                padding: 15px 0;
                text-align: center;
                background-color: var(--cor-fundo-secundario);
                color: var(--cor-texto-principal);
                font-family: 'Inter';
                font-size: 0.9rem;
                transition: background-color 0.8s ease, color 0.8s ease;
            }
        `;
    }
}

customElements.define('footer-chama', FooterChama);