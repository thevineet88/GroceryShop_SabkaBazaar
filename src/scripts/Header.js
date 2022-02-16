export class Header extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const template = `
        <header>
                 <div class="navbar-pri">
                    <a class="navbar-link" id="signin-link">Sign In</a>
                    <a class="navbar-link" id="signup-link">Sign Up</a>
                </div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <img id="home-logo" src="../../public/images/logo.png" alt='sabka bazar logo'/>
                            </a>
                            <a class="navbar-link" id="home-link">
                                Home
                            </a>
                            <a class="navbar-link" id="product-link">
                                Products
                            </a>
                            <span id="cart-btn"><a href="#" class="navbar-link"><img src="../../public/images/cart.svg" alt='sabka bazar logo'/>{{cartItems}} Items</a></span>
                        </div>
                    </div>
                </nav>
        </header>
        `;

        let initialCartItem = sessionStorage.getItem('categoryType') ? sessionStorage.length - 3 : sessionStorage.getItem('isLoggedIn') ? sessionStorage.length - 2 : sessionStorage.length - 1;
        const templateFunction = Handlebars.compile(template);
        this.innerHTML = templateFunction({
            cartItems: initialCartItem
        });



        // Show Model Dialogue
        const showCart = () => {
            let isUserLoggedIn = sessionStorage.getItem('isLoggedIn')
            if(isUserLoggedIn === 'false' || !isUserLoggedIn){
                alert(`You are not loggedIn. Please Login to see the cart.
You will be redirected to the login screen now.`);
                window.location.href = `${window.location.origin}/src/html/Signin.html`;
                return null;
            }
            let modal = document.createElement('custom-modal');
            document.body.appendChild(modal);
            modal.setAttribute('cartitems', window.localStorage.getItem('cart'));
            let customModal = document.querySelector('custom-modal');
            customModal.setAttribute('cartitems', window.localStorage.getItem('cart'));
        }

        const handlePageRedirect = evt => {
            switch( evt.target.id ){
                case 'signin-link':
                    window.location.href = `${window.location.origin}/src/html/Signin.html`;
                    break;
                case 'signup-link':
                    window.location.href = `${window.location.origin}/src/html/Register.html`;
                    break;
                case 'product-link':
                    window.location.href = `${window.location.origin}/src/html/Products.html`;
                    break;
                case 'home-link':
                    window.location.href = `${window.location.origin}/public/index.html`;
                    break;
                case 'home-logo':
                    window.location.href = `${window.location.origin}/public/index.html`;
                    break;

            }
            console.log(evt.target.id);
        }

        // Attach event listener on cart button
        document.getElementById('cart-btn').addEventListener('click', showCart);
        document.querySelector('header').addEventListener('click', handlePageRedirect);
   
    }
}

