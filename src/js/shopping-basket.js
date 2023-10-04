const notPic = new URL('../images/no-photo-available-icon-8.jpg', import.meta.url);

const cardList = document.querySelector('.shopping-cart');
const itemList = document.querySelector('.galleryCards-js');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const productsList = document.querySelector('.list');
const closeModalBtn = document.querySelector('.close')
const closeBtn = document.querySelector('.close-btn')
const removeCard = document.querySelector('.list');
const checkout = document.querySelector('.checkout');

let count = 1;
let total = 0;


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

function showBackdrop() {
  backdrop.classList.remove('opacity-0');
  backdrop.classList.add('opacity-100');
  backdrop.classList.remove('translate-x-full');
  backdrop.classList.add('translate-x-0');
  showModal();
}
function hideBackdrop(evt) {
    evt.preventDefault();
  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0');
  backdrop.classList.remove('translate-x-0');
  backdrop.classList.add('translate-x-full');
  closeModal();
}
 
function showModal() {
  modal.classList.remove('translate-x-full');
  modal.classList.add('translate-x-0');
}

function closeModal() {
  modal.classList.remove('translate-x-0');
  modal.classList.add('translate-x-full');
}

const handleGallery = () => {
  let favoriteCards = load('favorite-list-object') ? load('favorite-list-object') : [];
  
  showBackdrop();
  renderMarkupList(favoriteCards);

  const totalEl = document.querySelector('.total');
  const price = totalPrice(favoriteCards);
  totalEl.innerHTML = price;
};

function removeItem(evt) {
  if (evt.target === evt.currentTarget) {
    return;
  }
  let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
  let favoriteProducts = load('favorite-list-object') ? load('favorite-list-object') : [];
  let cardId = Number(evt.target.closest("#remove").getAttribute('data-id'));
  let productCard = evt.target.closest(".card-product")

  const newData = shoppingBag.filter((item) => item !== cardId);
  save('favorite-list', newData);

  const newDataList = favoriteProducts.filter((item) => item.id !== cardId);
  save('favorite-list-object', newDataList);

  productCard.remove();
  console.log(newDataList);
  const totalEl = document.querySelector('.total');
  
  const price = totalPrice(newDataList);
  totalEl.textContent = price;
  };

  
function totalPrice(products) {
  let total = 0;
      for (i = 0; i < products.length; i++) {
        total += Number(products[i].variants[0].price);
      }
      return Number(total);
};



function increase(evt) {
  let counterEl = evt.target.closest(".increase")
  count = Number(counterEl.textContent) + 1;
  return count;
}

function decrease(evt) {
  let counterEl = evt.target.closest(".decrease")
  if (Number(counterEl.textContent) === 1) {
    counterEl.setAttribute("disabled", "");
    return;
  }; 
  
  count = Number(counterEl.textContent) - 1;
  return count;
}
  

  function renderMarkupList(data) {
    console.log(data);
    const list = data.map(({ id, images, title, variants }) => {
      const picture = images[0];
      const card = `
    <li class="flex py-6 card-product">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray">
                        <img
                        src="${images.length === 0
          ? `${notPic}`
          : `${picture.src}`
        }" 
                         alt="product photo ${id}" class="h-full w-full object-cover object-center">
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between gap-10 text-base font-medium text-black">
                          <h3>${title}</h3>
                          <button type="button" data-id=${id} id="remove" class="cursor-pointer font-medium hover:text-pink relative text-gray">
                            Remove
                            </button>
                            
                          </div>
                        </div>
                        
                        <div class="ml-4 my-4 text-sm">
                        
                        <div data-id='counter' class='flex gap-8 mb-4'>
                        <button data-id='decrease' type='button' class='decrease'>-</button>
                        <p class='counter'>1</p>
                        <button type='button' data-id='increase' class='increase'>+</button>
                        </div>

                        <p">${variants[0].price}</p>
                        </div>
                      </div>
                    </li>
    `;
      return card;
    }).join('');

    productsList.innerHTML = list;
  };


  const handleStorageList = (evt) => {
    evt.preventDefault();

    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }

    let cardId = Number(evt.target.getAttribute('data-id'));
    console.log(cardId);
    let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
    const searchId = shoppingBag.find(item => item === cardId)
    if (!searchId) shoppingBag.push(cardId);
    save('favorite-list', shoppingBag);
  
    let shoppingBagAllProducts = load('shopping-list') ? load('shopping-list') : [];
    const [product] = shoppingBagAllProducts.filter(product =>
      product.id === cardId);
    console.log(product);

    let favoriteCards = load('favorite-list-object') ? load('favorite-list-object') : [];
    console.log(favoriteCards);
    const searchIdFavorite = favoriteCards.find(item => item.id === cardId)
    if (!searchIdFavorite) favoriteCards.push(product);
    save('favorite-list-object', favoriteCards);
  };


itemList.addEventListener('click', handleStorageList);
cardList.addEventListener('click', handleGallery);
closeModalBtn.addEventListener('click', hideBackdrop);
closeBtn.addEventListener('click', hideBackdrop);
removeCard.addEventListener('click', removeItem);
checkout.addEventListener('click', hideBackdrop);
// removeCard.addEventListener('click', increase);
// removeCard.addEventListener('click', decrease);
