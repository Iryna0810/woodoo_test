import axios from 'axios';
import { renderMarkup } from './render-markup';

class APIWoodoo {
   #BASE_URL = 'https://voodoo-sandbox.myshopify.com/products.json';
   
   constructor() {
    this.page = 1;
    }
    
    async fetchCard(page) {
        if (page === undefined) {
      page = 1;
        }
        try {
            return await axios.get(`${this.#BASE_URL}?&page=${page}&limit=24`)
        } catch (error ) {
            throw new Error(err.message);
        }
  }
}

const ApiWoodooCards = new APIWoodoo();



const handlerLoadWindow = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    return console.log(pageIndex);
  });
  
  ApiWoodooCards.fetchCard(1).then(({ data }) => {
    const { products } = data;
    renderMarkup(products)
  }
  ).catch(err => { console.log(err); });
};


window.addEventListener('load', handlerLoadWindow);
export default APIWoodoo