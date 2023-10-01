const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? 0 : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const cardList = document.querySelector('.shopping-cart');
const itemList = document.querySelector('.galleryCards-js');
console.log(cardList);
// const woodooCardContainer = document.querySelector('.galleryCards-js')


const handleGallery = (evt) => {
  let shoppingBagAllProducts = load('shopping-list') ? load('shopping-list') : [];
  let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
  console.log(shoppingBagAllProducts);
  console.log(shoppingBag);
  const products = shoppingBag.map(item => {
    const [data] = shoppingBagAllProducts.filter(product =>
      product.id === item);
    // console.log(data);
    return data;
  } 
  );
  console.log(products)
  renderMarkupList(products);
};


function renderMarkupList(data) {
  console.log(data);
  const createdElements = data.map(({ title }) => {return (
    `<li class="block">
    <p>${title}</p>
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">
    </div>
    </li>
   `)
    // return createdElements;
  }
  ).join('');

  itemList.innerHTML = createdElements;
  
} 

const handleStorageList = (evt) => {
  evt.preventDefault();

    if (evt.target.nodeName !== 'BUTTON') {
        return;
  }
  
  // console.log(evt.target);
  let cardId = Number(evt.target.getAttribute('data-id'));
  console.log(cardId)
  let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
  const searchId = shoppingBag.find(item => item === cardId)
  console.log(searchId);
  if (!searchId) shoppingBag.push(cardId);
  save('favorite-list', shoppingBag);  
} 

itemList.addEventListener('click', handleStorageList);
cardList.addEventListener('click', handleGallery);