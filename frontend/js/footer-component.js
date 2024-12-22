class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                background-color: #333;
                color: white;
                padding: 1rem;
                text-align: center;
                position: fixed;
                bottom: 0;
                width: 100%;
                }
            </style>
            <footer>
                © ${new Date().getFullYear()} Gestión de Proyectos
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);