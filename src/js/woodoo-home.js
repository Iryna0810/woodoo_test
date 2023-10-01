import axios from 'axios';
const notPic = new URL('../images/no-photo-available-icon-8.jpg', import.meta.url);

class APIWoodoo {
   #BASE_URL = 'https://voodoo-sandbox.myshopify.com/products.json?limit=24';
   
   constructor() {
    this.page = 1;
    }
    
    async fetchCard(page) {
      //       if (page === undefined) {
      // page = 1;
      //   }
        try {
            return await axios.get(`${this.#BASE_URL}&${page}`)
        } catch (error ) {
            throw new Error(err.message);
        }
    }
}

const woodooCardContainer = document.querySelector('.galleryCards-js')
console.log(woodooCardContainer);
const ApiWoodooCards = new APIWoodoo();

const handlerLoadWindow = () => {
ApiWoodooCards.fetchCard().then(({ data }) => 
{const { products } = data;
renderMarkup(products)}
    
).catch(err => { console.log(err); });

}
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const renderMarkup = (products) => {
    console.log(products);
    save('shopping-list', products);
    const createdElements = products.map(({
        id, images, title,body_html, variants
    }) => {
        const picture = images[0];

        const card = `<li class="galleryEl block my-auto" data-id=${id} >
        
    <div class="overflow-hidden max-w-sm mx-auto bg-white rounded-xl shadow-lg items-center">
    <div>
        <img class="object-cover h-full w-full object-center" src='${images.length === 0
            ? `${notPic}`
            : `${picture.src}`
            }'alt="product photo ${id}"/> 
    </div>
    <div class="flex justify-between px-1 my-3">
    <div>
       <h3>${title}</h3>
       <p>${variants[0].price}</p>
    </div>
        
    <div>   
    <p>Requires shipping: <br/> ${variants[0].requires_shipping}</p>
    </div>
    </div>
  
    <button type='button' data-id=${id} data-action="save" class="button w-full rounded-xl mb-0 py-2 px-4 bg-black text-white font-semibold rounded-sd shadow-md hover:bg-pink focus:outline-none focus:ring-2 focus:ring-dark-grey focus:ring-opacity-75">ADD TO CART</button>

  
        </li> 
    `;
                return card;
            
    }).join('');

    woodooCardContainer.innerHTML = createdElements;
}

window.addEventListener('load', handlerLoadWindow);