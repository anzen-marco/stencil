import { Component, Element, Method, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'uc-tooltip',
    styleUrl: './tooltip.css',
    shadow: true
})

export class Tooltip {
    @Prop({
        reflect: true
    }) tooltip: string;

    @Element() element: HTMLElement;

    displayText: string;
    defaultText = 'Tooltip';
    active = false;

    show() {
        const message= this.element.shadowRoot.querySelector('.message');
        console.log(this.active);
        
        if ( this.active ) {
            console.log('Hide!!');
            message.classList.remove('show');
            this.active = false;
        } else {
            console.log('Show!!');
            message.classList.add('show')
            this.active = true;
        }
    }

    render() {
        ( !this.tooltip  ? this.displayText = this.defaultText : this.displayText = this.tooltip);

        return (
            <section class="text">
                <slot></slot>
                <section class="tooltip">
                    <span class="icon" onClick={this.show.bind(this)}>
                        ?
                    </span>
                    <div class="message">
                        {this.displayText}
                    </div>
                </section>
                
            </section>
        );
    }
}