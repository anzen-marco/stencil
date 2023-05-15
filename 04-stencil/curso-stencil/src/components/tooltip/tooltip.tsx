import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'uc-tooltip',
    styleUrl: './tooltip.css',
    shadow: true
})

export class Tooltip {
    render() {
        return (
            <section class="text">
                <slot></slot>
                <span class="icon">
                    ?
                </span>
            </section>
        );
    }
}