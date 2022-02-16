import { Modal } from "./Modal.js";
import { Header } from "./Header.js";
import { Carousal } from "./Carousal.js";
import { ProductBanner } from "./ProductBanner.js";
import { Footer } from "./Footer.js";

customElements.define('nav-header', Header);
customElements.define('img-carousal', Carousal);
customElements.define('product-banner', ProductBanner);
customElements.define('ecom-footer',Footer);
customElements.define('custom-modal', Modal);