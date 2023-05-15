import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'uc-menu',
    styleUrl: './menu.css',
    shadow: true
})

export class Menu {
    @State() showInfo = false;
     
    @Prop({
        reflect: true
    }) title: string;

    @Prop({
        reflect: true,
        mutable: true
    }) opened: boolean;

    @Method() open() {
        this.opened = true;
    }

    @Method() close() {
        this.opened = false;
        console.log(this.opened);
    }

    toggle() {
        this.opened ? this.opened = false : this.opened = true;
    }

    tabs(content: string) {
        this.showInfo = content === 'info'
        console.log('Tabs!!!', content, this.showInfo);
    }

    render() {
        let info = <slot></slot>;

        if ( this.showInfo ) {
            info = (
                <section id="#info">
                    <h4>Info</h4>
                    <p>Esto es puro choro</p>
                </section>
                
            );
        }

        return [
            <div class="overlay" onClick={this.close.bind(this)}></div>,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.toggle.bind(this)} class="close-btn">X</button>
                </header>
                
                <section id="tabs">
                    <button id="tab-nav" onClick={this.tabs.bind(this, 'nav')}>Links</button>
                    <button id="tab-info" onClick={this.tabs.bind(this, 'info')}>Contacto</button>
                </section>

                <section>
                    {info}
                </section>
            </aside>
        ];
    }
}