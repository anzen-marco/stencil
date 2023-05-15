class Modal extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });
        
        this.shadowRoot.innerHTML = `
            <style>
            .close {
                opacity: 0;
                pointer-events: none;
                transition: all .3s;
            }

            .open {
                opacity: 1;
                pointer-events: all;
                transition: all .3s;
            }

            #overlay {
                position: fixed;
                left: 0;
                top: 0;
                z-index: 100;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, .8);
            }
    
            #modal {
                display: flex;
                flex-direction: column;
                justify-content: space-between; 
                position: fixed;
                left: 25vw;
                top: 15vh;
                z-index: 1000;
                width: 40vw;
                background: #fff;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .8);
            }
    
            header {
                position: relative;
                padding: 16px;
            }
    
            header h1 {
                font-size: 1.4rem;
            }

            .icono-cerrar {
                position: absolute;
                right: 16px;
                top: 16px;
                cursor: pointer;
            }
    
            #contenido {
                padding: 16px;
            }
    
            #botones {
                display: flex;
                justify-content: center;
                padding: 32px 0;
                border-top: 1px solid blue ;
            }
            </style>

            <div id="overlay" class="close"></div>
            <div id="modal" class="close">
                <header>
                    <slot name="title"></slot>
                    <div class="icono-cerrar">x</div>
                </header>

                <section id="contenido">
                    <slot name="content"></slot>
                </section>

                <section id="botones">
                    <button id="cancel" type="button">Cancelar</button>
                    <button id="confirm" type="button">Aceptar</button>
                </section>
            </div> 
        `;

        this._open = false;
        this._modal = this.shadowRoot.querySelector('#modal');
        this._overlay = this.shadowRoot.querySelector('#overlay');

        const closeBtn = this.shadowRoot.querySelector('.icono-cerrar');
        const btnCancel = this.shadowRoot.querySelector('#cancel');
        const btnConfirm = this.shadowRoot.querySelector('#confirm');

        closeBtn.addEventListener('click', this.close.bind(this));
        btnCancel.addEventListener('click', this._cancel.bind(this));
        btnConfirm.addEventListener('click', this._confirm.bind(this));
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        if ( open ) {
            this._open = true;
            this._modal.classList.remove('close');
            this._overlay.classList.remove('close');
            this._modal.classList.add('open');
            this._overlay.classList.add('open');

            console.log('if', name);
        } else {
            this._open = false;
            this._modal.classList.remove('open');
            this._overlay.classList.remove('open');
            this._modal.classList.add('close');
            this._overlay.classList.add('close');

            console.log('else', name);
        }
    }

    static get observedAttributes() {
        return ['open'];
    }

    open() {
        this.setAttribute('open', 'true');
        this._open = true;

        console.log('open()', this._open);
    }

    close() {
        this._open = false;
        this.setAttribute('open', 'false');

        console.log('close()', this._open);
    }

    hide() {
        const open = this.getAttribute("open");
    }

    _cancel(event) {
        this.hide();
        const cancel = new Event('cancel', {
            bubbles: true
        })
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.hide();
    }
}

customElements.define('uc-modal', Modal);