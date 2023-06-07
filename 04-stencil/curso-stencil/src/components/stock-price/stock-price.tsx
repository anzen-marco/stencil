import { Component, State, h, Element, Prop, Watch } from "@stencil/core";
import { apiKey } from "../../global/global.js";

@Component({
    tag: 'uc-stock-price',
    styleUrl: './stock-price.css',
    shadow:true
})

export class StockPrice {
    @State() price: number;
    @State() userInput: string;
    @State() inputInvalid = false;
    @State() errorMessage: string;

    @Prop({
        mutable: true,
        //reflectToAttr: true
    }) stock: string;

    @Watch('stock')
    stockChange() {
        console.log('Cambio la popiedad de stock');
    }

    //Acceder al valor con querySelector
    @Element() el: HTMLElement;

    stockInput: HTMLInputElement; 
    onUserInput(event: Event) {
        this.userInput = (event.target as HTMLInputElement).value;

        this.userInput.trim() !== '' ? this.inputInvalid = true : this.inputInvalid = false;
    };

    async onFetchPrice(event: Event) {
        event.preventDefault();

        //Acceder al valor con querySelector
        // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;

        const stockSymbol = this.stockInput.value; 

        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`);

            if ( response.status !== 200 ) {
                throw new Error('Conexión fallida o errónea u___u');
            }

            const jsonResp = await response.json();
            const fullRes = jsonResp['Global Quote']['05. price'];

            if ( !fullRes ) {
                throw new Error('Dato de búsqueda inválido x___x');
            }
            
            this.errorMessage = null;
            this.price = await fullRes;
        } catch (error) {
            this.errorMessage = error.message;
        }
    }

    // Antes de que el componente se cargue
    componentWillLoad() {
        console.log('Will load');
    }

    // Cuando el componente ya se cargó
    componentDidLoad() {
        console.log('Did load');
    }

    componentWillUpdate() {
        console.log('Will update');
    }

    componentDidUpdate() {
        console.log('Did update');
    }

    // Cuando el componente se quita del DOM
    componentDidUnload() {
        console.log('Did unload');
    }

    render() {
        let errorText ='';

        this.errorMessage ? errorText = this.errorMessage : errorText = '';
        
        console.log(errorText);

        return [
            <section>
                <form onSubmit={this.onFetchPrice.bind(this)}>
                    <input
                        type="text"
                        id="stock-symbol"
                        ref={el => this.stockInput = el}
                        value={this.userInput}
                        onInput={this.onUserInput.bind(this)}
                    />
                    <button
                        type="submit"
                        disabled={!this.inputInvalid}
                    >
                        Obtener
                    </button>
                </form>
                

                <p>Precio: ${this.price}</p>
                <p class="tipo-color-red">{errorText}</p>

            </section>
        ]
    }
}