import { fetchStaticData } from "../utils/utils.js";

export class Modal extends HTMLElement{

    constructor(){
        super();
    }

    async connectedCallback(){
        const products = await _getProducts();

        const template = `
        <div class="modal-dialogue show-modal-dialogue">
            <div class="modal-dialogue-content">
                <div class="modal-header">
                    <span>My Cart({{itemCount}} items)</span>
                    <span class="modal-close-button">×</span>
                </div>
                <div class="modal-body">
                {{#each cartItems}}
                    <div class="modal-cart-item">
                        <section class="modal-body-left">
                                <img class="card-img-top" src={{imageURL}} alt="Card image cap" />
                        </section>
                        <section class="modal-body-right" id="{{sku}}">
                                <h6 class="card-title">{{name}}</h6>
                                <span class="modal-cart-button minus">-</span>
                                <span>{{quantity}}</span>
                                <span class="modal-cart-button plus">+</span>
                                <span> X </span>
                                <span> {{price}} </span>
                                <span class="modal-total-price">{{finalPrice}}</span>
                        </section>
                    </div>
                {{/each}}
                    <div class="modal-cart-item-footer">
                    <img class="card-img-top" src="../../public/images/lowest-price.png" alt="Card image cap" />
                    <span style=margin-left:10px>You won't find it cheaper anywhere.
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <span>Promo Code can be applied on the checkout page.</span>
                    <button class="btn btn-danger">Proceed to Checkout ₹{{grandTotal}}</button>
                </div>
            </div>
        </div>
        `;

       
        const { cartItems, grandTotal } =  _getItemsInTheCart(products)
  
        const compiledTemplate = Handlebars.compile(template);
        this.innerHTML = compiledTemplate({
            cartItems,
            grandTotal,
            itemCount : cartItems.length
        });

        const _reRenderModal = () => {
            document.querySelector('custom-modal').remove();
            let modal = document.createElement('custom-modal');
            document.body.appendChild(modal);
        }

        // Cart quantity increment
        const incrementQuantity = (evt) => {
            let sku = evt.target.parentNode.id;
            let quantity = sessionStorage.getItem(sku);
            sessionStorage.setItem(sku,++quantity);
            _reRenderModal();
        }

        // Cart quantity decrement
        const decrementQuantity = (evt) => {
            let sku = evt.target.parentNode.id;
            let quantity = sessionStorage.getItem(sku);
            if(Number(quantity) <= 1){
                evt.target.parentNode.parentNode.remove();
                sessionStorage.removeItem(sku);
            }else{
                sessionStorage.setItem(sku,--quantity);
                _reRenderModal();
            }

        }

        // Attach click event listener on add/remove buttons in the cart
        let decrementButtons = this.querySelectorAll('.modal-cart-button.minus');
        decrementButtons.forEach( btn => {
            btn.addEventListener('click',decrementQuantity );
            btn.nextElementSibling.nextElementSibling.addEventListener('click',incrementQuantity );
        });

        // Close Model Dialogue
        const closeModelDialogue = () => {
            let modalDialogue = document.getElementsByTagName('custom-modal');
            if(modalDialogue){
                modalDialogue[0].remove();
            }
        }

        // Attach click event listener on close modal close button
        this.querySelector('.modal-close-button').addEventListener('click', closeModelDialogue);
    }

}

function _getItemsInTheCart(products){
    let cartItems = [];
    let grandTotal = 0;
    products.forEach(element => {
        let skuNo = element.sku;
        if(sessionStorage.getItem(skuNo)){
            let cartItem = { ...element };
            cartItem.quantity = sessionStorage.getItem(skuNo);
            cartItem.finalPrice = cartItem.quantity * cartItem.price;
            cartItems.push(cartItem);
            grandTotal += cartItem.finalPrice;
        }
    });
    return { cartItems, grandTotal };
}

async function _getProducts(){
    return await fetchStaticData("/public/api/Products.json");
}