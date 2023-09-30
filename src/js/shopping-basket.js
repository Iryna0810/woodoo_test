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

// let productCard = '';

const handleGallery = (evt) => {
  let shoppingBagAllProducts = load('shopping-list') ? load('shopping-list') : [];
  let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
  console.log(shoppingBagAllProducts);
  console.log(shoppingBag);
  const products = shoppingBag.map(item => shoppingBagAllProducts.filter(product =>
    product.id === item));
  const data = [...products];
  console.log(data);
};


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