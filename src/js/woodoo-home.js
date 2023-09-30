import axios from 'axios';
const notPic = new URL('../images/no-photo-available-icon-8.jpg', import.meta.url);

class APIWoodoo {
    #BASE_URL = 'https://voodoo-sandbox.myshopify.com/products.json?limit=24';
   
   constructor() {
    this.page = 1;
    }
    
    async fetchCard() {
    //         if (page === undefined) {
    //   page = 1;
    //     }
        try {
            return await axios.get(`${this.#BASE_URL}`)
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

const renderMarkup = (products) => {
    console.log(products);

    const createdElements = products.map(({
        id, images, title, body_html
    }) => {
        const picture = images[0];
        // const { src } = picture;
        // src?? console.log(src)
        // const { src } = picture;
        
        // if (images.length === 0) {
        const card = `<li class="block" data-id=${id}>
        <h3>${title}</h3>
        <div>${body_html}</div>
        <img height="300px" width="342px" src='${images.length === 0
            ? `${notPic}`
            : `${picture.src}`
        }'/> 
       </li> 
    `;
                return card;
        // }
//         else {
//             const card = `<li class="block" data-id=${id}>
//         <h3>${title}</h3>
//         <div>${body_html}</div>

//            <img height="300px" width="342px" src="${picture.src}"/>
//        </li> 
//     `;
//                 return card;
// }
            
    }).join('');

    woodooCardContainer.innerHTML = createdElements;
}

window.addEventListener('load', handlerLoadWindow);