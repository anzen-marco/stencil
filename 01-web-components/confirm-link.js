class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            ( !confirm('¿Quieres migrarle?') )  && event.preventDefault();
        });
    }
}

customElements.define('uc-a-confirm', ConfirmLink, { extends: 'a' });