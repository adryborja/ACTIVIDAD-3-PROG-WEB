class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: darkslategrey;
                    padding: 2rem;
                    
                }
                ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    margin-right: 10px;
                    display: flex;
                    gap: 1rem;
                }
                a {
                    color: white;
                    text-decoration: none;
                    cursor: pointer;
                    font-size: 1em;
                }
                
            </style>
            <nav>
                <ul>
                    <li><a href="#home">Inicio</a></li
                    <li><a href="projects" class="active">Proyectos</a></li>
                    <li><a href="participants">Participantes</a></li>

                </ul>
            </nav>
        `;
    }

    addEventListeners() {
        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                this.shadowRoot.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                this.dispatchEvent(new CustomEvent('navigation', {
                    detail: { page: link.getAttribute('href') },
                    bubbles: true,
                    composed: true,
                }));
            });
        });
    }
}

customElements.define('nav-component', NavComponent);
