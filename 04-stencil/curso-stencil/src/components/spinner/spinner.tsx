import { Component, h } from "@stencil/core";

@Component({
    tag: 'uc-spinner',
    styleUrl: './spinner.css',
    shadow: true
})

export class StockFinder {
    render() {
        return (
            <div class="lds-circle">
                <div></div>
            </div>
        )
    }
}