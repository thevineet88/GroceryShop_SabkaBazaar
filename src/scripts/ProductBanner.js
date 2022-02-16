import { fetchStaticData } from "../utils/utils.js";

export class ProductBanner extends HTMLElement{

    constructor(){
        super();
    }

    async connectedCallback(){
        this.innerHTML= `
            <script id="cat-template">
                <main class="product-banner-container">
                    {{#each items}}
                        {{#if (isEven @index)}}
                            <div class="card mb-3">
                                <img class="card-img-top" src={{this.imageUrl}} alt="Card image cap" />
                                <div class="card-body" id={{this.id}}>
                                    <h5 class="card-title">{{this.name}}</h5>
                                    <p class="card-text">{{this.description}}</p>
                                    <button id="product-item" type="button" class="btn btn-danger">Explore {{this.key}}</button>
                                </div>
                            </div>
                        {{else}}
                            <div class="card mb-3">
                                <div class="card-body" id={{this.id}}>
                                    <h5 class="card-title">{{this.name}}</h5>
                                    <p class="card-text">{{this.description}}</p>
                                    <button id="product-item" type="button" class="btn btn-danger">Explore {{this.key}}</button>
                                </div>
                                <img class="card-img-top" src={{this.imageUrl}} alt="Card image cap" />
                            </div>
                        {{/if}}
                    {{/each}}
                </main>
            </script>
        `;

        const items = await fetchStaticData("api/Categories.json");

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if(!element.enabled){
                items.splice(index,1)
            }
        }

        const redirectToProduct = (evt) => {
            let categoryId = evt.target.parentNode.id;
            sessionStorage.setItem('categoryType',categoryId);
            window.location.href = `${window.location.origin}/src/html/Products.html`;
        }

        Handlebars.registerHelper('isValid', abc => console.log(abc));

        //handlebar helper for checking odd/even index
        Handlebars.registerHelper('isEven', index => index%2 === 0);
        
        let template1 = Handlebars.compile(document.querySelector('#cat-template').innerHTML);
        let templateFunction = template1({
            items : items
        })

        this.innerHTML = templateFunction;

        let categoryEle = document.querySelectorAll('#product-item');
        categoryEle.forEach( item => {
            item.addEventListener('click', redirectToProduct);
        })

    }

}