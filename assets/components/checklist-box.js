class ChecklistBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const titulo = this.getAttribute("titulo") || "";

        this.shadowRoot.innerHTML = `
            <style>
                ${this.getStyles()}
            </style>

            <br/>
            <div class="box">
                <h1>${titulo}</h1>

                <ul>
                    <slot></slot>
                </ul>
            </div>
        `;
    }

    getStyles() {
        return `
            .box {
                width: 350px;
                margin-left: 60px;
                padding: 10px 14px;
                border-radius: 15px;
                margin-top: 60px;
                color: var(--cor-texto-principal);
                background-color: var(--cor-cards);
                transition: background-color 0.8s ease, color 0.8s ease;
            }

            h1 {
                margin-bottom: 10px;
            }

            ul {
                padding-left: 20px;
                font-family: 'Inter';
            }

            li {
                margin-bottom: 6px;
            }

            @media (max-width: 750px) {
                .box {
                    margin-left: 0;
                    margin-top: 0;
                    margin-bottom: 120px;
                }
            }

            @media (max-width: 400px) {
                .box {
                    width: 270px;
                    margin-bottom: 30;
                }
                
                h1 {
                    font-size: 1.5em;
                }
            }
        `;
    }
}

customElements.define("checklist-box", ChecklistBox);
