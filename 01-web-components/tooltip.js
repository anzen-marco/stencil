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

                :host {
                    position: relative;
                    padding-left: 6px;
                    border-left: 3px solid #00659f;
                }

                :host(.danger) {
                    background: var(--color-danger);
                    color: #ffffff;
                }

                :host-context(h1) {
                    margin: 32px 0;
                    color: var(--color-prim);
                }

                ::slotted(span) {
                    border-bottom: 1px solid var(--color-prim);
                }
            </style>
            <slot>Vacio</slot>
            <span class="icon">?</span>
        `;

        this._ttText = 'default';
        this._ttIcon;
        this._tooltipVisible = false;
    }

    connectedCallback() {
        ( this.hasAttribute('text') ) && (this._ttText = this.getAttribute("text"));
        
        this._ttIcon = this.shadowRoot.querySelector('span');
        this._ttIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._ttIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this._render();
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        console.log( name, oldValue, newValue );

        if ( oldValue === newValue ) {
            return;
        }

        ( name === 'text' ) && (this._ttText = newValue );
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback() {
        this._ttIcon.removeEventListener('mouseenter', this._showTooltip);
        this._ttIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let ttContainer = this.shadowRoot.querySelector('div');

        if ( this._tooltipVisible ) {
            ttContainer = document.createElement('div');
            ttContainer.textContent = this._ttText;
            this.shadowRoot.appendChild(ttContainer);
        } else {
            ( ttContainer ) && ( this.shadowRoot.removeChild(ttContainer) );
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('uc-tooltip', Tooltip);