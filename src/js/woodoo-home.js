import axios from 'axios';
import { renderMarkup } from './render-markup';

const notPic = new URL('../images/no-photo-available-icon-8.jpg', import.meta.url);


class APIWoodoo {
   #BASE_URL = 'https://voodoo-sandbox.myshopify.com/products.json?limit=24';
   
   constructor() {
    this.page = 1;
    }
    
    async fetchCard(page) {
        if (page === undefined) {
      page = 1;
        }
        try {
            return await axios.get(`${this.#BASE_URL}&${page}`)
        } catch (error ) {
            throw new Error(err.message);
        }
    }
}

const woodooCardContainer = document.querySelector('.galleryCards-js')
const ApiWoodooCards = new APIWoodoo();


const handlerLoadWindow = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    return console.log(pageIndex);
  });
  
  ApiWoodooCards.fetchCard().then(({ data }) => {
    const { products } = data;
    renderMarkup(products)
  }
  ).catch(err => { console.log(err); });
};


function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}


window.addEventListener('load', handlerLoadWindow);