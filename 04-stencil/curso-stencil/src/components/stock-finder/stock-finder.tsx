import { Component, State, h, Event, EventEmitter, Element, Prop, Watch } from "@stencil/core";
import { apiKey } from "../../global/global.js";

@Component({
    tag: 'uc-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})

export class StockFinder {
    stockInput: HTMLInputElement;

    @State() searchResults: {
        symbol: string,
        name: string
    }[] = [];
    @State() loading = false;

    @Event({
        bubbles: true,
        composed: true
    }) ucSymbolSelected: EventEmitter<string>;

    async fetchSearch( event: Event ) {
        event.preventDefault();
        this.loading = true;

        const stockSymbol = this.stockInput.value;

        try {
            const response = await fetch (`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${apiKey}`);

            if ( response.status !== 200 ) {
                throw new Error('Conexión fallida o errónea u___u');
            }

            const jsonResp = await response.json();
            this.searchResults = jsonResp['bestMatches'].map( match => {
                return {
                    name: match['2. name'],
                    symbol: match['1. symbol']
                };
            });

            this.loading = false;
            console.log(this.searchResults);

        } catch ( error ) {
            this.loading = false;
            console.log(error);
        }
    }

    selectSymbol( symbol: string ) {
        this.ucSymbolSelected.emit( symbol );
    }

    render() {
        console.log(this.searchResults);

        let spinner;

        this.loading ? spinner = <uc-spinner></uc-spinner> : spinner = '';

        return [
            <section>
                <form onSubmit={this.fetchSearch.bind(this)}>
                {console.log(this.searchResults)}
                    <input
                        type="text"
                        id="stock-symbol"
                        ref={el => this.stockInput = el}

                    />
                    <button
                        type="submit"
                    >
                        Buscar
                    </button>

                    <span>{ spinner }</span>
                </form>
            </section>,
            <ul>
                {this.searchResults.map(result => (
                    <li onClick={this.selectSymbol.bind(this, result.symbol)}>
                        <b>{result.symbol}</b> {result.name}
                    </li>
                ))}
            </ul>
        ];
    }
}