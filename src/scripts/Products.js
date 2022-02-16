import { fetchStaticData } from "../utils/utils.js";

const _getProductCategories = async () => {
    const categories = await fetchStaticData("/public/api/Categories.json");
    for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        if(!element.enabled){
            categories.splice(index,1);
        }
    }
    return categories;

}

const _getProducts= async () => {
    return await fetchStaticData("/public/api/Products.json");
}

const _filterProducts = (products,categoryId) => {
    return products.filter( product => {
        if(product.category === categoryId){
            return product;
        }
    });
}

const _showProducts = (products) => {
    let productsContainer = document.querySelector('.products-container');
    //Remove previous list items from DOM
    productsContainer.innerHTML = ``;

    products.forEach( element => {
        let productCard = document.createElement('div');
        const cardTemplate = `
            <div class="card mb-3">
                <div class="card-body">
                    <h6 class="card-title">{{name}}</h6>
                    <img class="card-img-top" src={{imageUrl}} alt="Card image cap" />
                    <p class="card-text">{{description}}</p>
                    <button id="addToCart" type="button" class="btn btn-danger">Buy Now @ {{price}}</button>
                </div>
            </div>
        `;
        const finalTemplate = Handlebars.compile(cardTemplate);
            productCard.innerHTML = finalTemplate({
                imageUrl: element.imageURL,
                name: element.name,
                price: element.price,
                description: element.description
            });
            
        productCard.querySelector('#addToCart').addEventListener('click', addToCart.bind(element) )
        
        productsContainer.appendChild(productCard);

    });
}

const _styleSelectedListElement = node => {
    let curSelectedListItem = document.querySelector('.nav-link-item.selected');
    if(curSelectedListItem){
        curSelectedListItem.classList.remove('selected')
    }

    if(!node.classList.contains('selected')){
            node.classList.add('selected');
    }
}

const categorizeProducts = async evt => {
    _styleSelectedListElement(evt.target);
    let categoryId = evt.target.id;
    const products = await _getProducts();
    let finalProducts = _filterProducts(products,categoryId);
    _showProducts(finalProducts);
}

const createCategoriesSideNav = async () => {
    const productCategories = await _getProductCategories();
    let navListContainer = document.querySelector('.nav-list');
    productCategories.forEach( element => {
        let listEle = document.createElement('li');
        listEle.classList.add('nav-link-item');
        listEle.setAttribute('role', 'button');
        listEle.setAttribute('id', element.id)
        listEle.innerText = element.name;
        navListContainer.appendChild(listEle);
    });
    navListContainer.addEventListener('click', categorizeProducts )

}
createCategoriesSideNav();

const createProductCards = async () => {
    const products = await _getProducts();
    let categoryIdCached = sessionStorage.getItem('categoryType');
    if(categoryIdCached){
        let finalProducts = _filterProducts(products,categoryIdCached);
        _showProducts(finalProducts);
        let listItem = document.querySelector(`li[id='${categoryIdCached}']`);
        if(listItem){
            listItem.classList.add('selected');
        }
        sessionStorage.removeItem('categoryType');
    }else{
        _showProducts(products);
    }
}
function addToCart(evt){
    let isUserLoggedIn = sessionStorage.getItem('isLoggedIn')
    if(isUserLoggedIn === 'false' || !isUserLoggedIn){
        alert(`You are not loggedIn. Please Login to see the cart.
You will be redirected to the login screen now.`);
        window.location.href = `${window.location.origin}/src/html/Signin.html`;
        return null;
    }
    if(sessionStorage.getItem(this.sku)){
        let quantity = sessionStorage.getItem(this.sku);
        sessionStorage.setItem(this.sku,++quantity);
    }else{
        sessionStorage.setItem(this.sku,1);
    }
    alert(`"${this.name}" added to the cart.
At any point you can click on the cart menu to checkout`)
}

createProductCards();




