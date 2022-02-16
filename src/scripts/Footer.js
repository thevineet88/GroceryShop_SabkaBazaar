export class Footer extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <footer>
          <p>CopyRight &copy; 2011-2022 Sabka Bazaar Grocery Supplies Pvt Ltd.</p>
        </footer>
        `
    }
}