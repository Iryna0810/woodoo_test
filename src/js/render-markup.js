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
  save('shopping-list', products);
  const createdElements = products.map(({
    id, images, title, variants
  }) => {
    const picture = images[0];

    const card = `<li class="galleryEl block" data-id=${id}>
    <div class="group mx-auto w-[342px] md:w-[300px] h-[402px] bg-white rounded-xl shadow-lg">
    <div class="h-[300px] w-[342px] md:w-[300px] overflow-hidden rounded-md bg-gray group-hover:opacity-75 flex align-center">
        <img class="h-full w-full object-cover object-center lg:h-full lg:w-full" src='${images.length === 0
        ? `${notPic}`
        : `${picture.src}`
      }'alt="product photo ${id}"/> 
    </div>

    <div class="flex justify-between px-1 my-3">
    <div>
       <h3 class='overflow-hidden'>${title}</h3>
       <p>${variants[0].price}</p>
    </div>
        
    <div>   
    <p>Requires shipping: <br/> ${variants[0].requires_shipping}</p>
    </div>
    </div>
    
  
    <button type='button' data-id=${id} data-action="save" class="button w-full rounded-xl mb-0 py-2 px-4 bg-black text-white font-semibold rounded-sd shadow-md hover:bg-pink focus:outline-none focus:ring-2 focus:ring-dark-grey focus:ring-opacity-75">ADD TO CART</button>
    </div>    
    </li> 
    `;
    return card;
            
  }).join('');

  woodooCardContainer.innerHTML = createdElements;
};


