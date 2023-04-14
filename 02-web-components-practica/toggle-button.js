class ToggleButton extends HTMLElement{
    constructor() {
        super();
        
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.innerHTML = `
            <style>
                p {
                    display: none;
                }

                button {
                    margin: 16px 0;
                    padding: 8px 16px;
                    background: #107B9D;
                    font-weight: 700;
                    font-family: arial;
                    color: #ffffff;
                    border: 0;
                    border-radius: 0;
                    cursor: pointer;
                }

                .show {
                    display: block;
                }

                .pressed {
                    background: #bcbcbc;
                }
            </style>

            <button id="btn-text" type="button"></button>
            <p><slot>Texto dummy</slot></p>  
        `;

        this._hidden = true;
        this._textShow = 'Mostrar';
        this._textHide = 'Ocultar';

        this._paragraph = this.shadowRoot.querySelector('p');
        this._btn = this.shadowRoot.querySelector('button');
    }

    connectedCallback() {
        ( this.hasAttribute('show-text') ) && ( this._textShow = this.getAttribute('show-text') );
        ( this.hasAttribute ('hide-text') ) && ( this._textHide = this.getAttribute('hide-text') );

        this._btn.textContent = this._textShow        

        this._btn.addEventListener('click', this._toggle.bind(this));
    }
    
    _toggle() {
        this._hidden = this._hidden ? false : true;
        if ( !this._hidden ) {
            this._paragraph.classList.add('show');
            this._btn.classList.add('pressed');
            this._btn.textContent = this._textHide;
        } else {
            this._paragraph.classList.remove('show');
            this._btn.classList.remove('pressed');
            this._btn.textContent = this._textShow;
        }
    }
}

customElements.define('uc-toggle-button', ToggleButton);