class Tooltip extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    position: absolute;
                    z-index: 10;
                    background-color: #000000;
                    color: #ffffff;
                }
            </style>
            <slot>Vacio</slot>
            <span> (?) </span>
        `;

        this._ttContainer;
        this._ttText = 'default';
    }

    connectedCallback() {
        ( this.hasAttribute('text') ) && (this._ttText = this.getAttribute("text"));
        
        const ttIcon = this.shadowRoot.querySelector('span');

        ttIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        ttIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this.shadowRoot.appendChild(ttIcon);
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._ttContainer = document.createElement('div');
        this._ttContainer.textContent = this._ttText;
        this.shadowRoot.appendChild(this._ttContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._ttContainer);
    }
}

customElements.define('uc-tooltip', Tooltip);