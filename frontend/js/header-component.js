class HeaderComponent extends HTMLElement {
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
                header {
                    background-color: #333;
                    color: white;
                    padding: 15px;
                    text-align: center;
                    font-size: 1.5em;
                    font-family: Arial, sans-serif;
                }
                
            </style>
            <header>
                <h1>Gestión de Proyectos</h1>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);