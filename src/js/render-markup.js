const notPic = new URL('../images/no-photo-available-icon-8.jpg', import.meta.url);

const woodooCardContainer = document.querySelector('.galleryCards-js')

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

export const renderMarkup = (products) => {
  console.log(products);
  save('shopping-list', products);
  const createdElements = products.map(({
    id, images, title, variants
  }) => {
    const picture = images[0];

    const card = `<li class="galleryEl block my-auto" data-id=${id} >
        
    <div class="max-w-[342px] md:max-w-[300px] mx-auto mb-12 bg-white overflow-hidden rounded-xl shadow-lg items-center">
    <div class="h-[300px] w-[342px] md:w-[300px]  overflow-hidden items-center flex">
        <img class="contain h-full w-full my-auto" src='${images.length === 0
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
};


