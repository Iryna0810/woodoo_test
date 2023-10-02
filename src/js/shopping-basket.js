
const notPic = new URL('../images/no-photo-available-icon-8.jpg', import.meta.url);


const cardList = document.querySelector('.shopping-cart');
const itemList = document.querySelector('.galleryCards-js');
const shoppingCart = document.querySelector('.backdrop');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const productsList = document.querySelector('.list');
const closeModalBtn = document.querySelector('.close')
const closeBtn = document.querySelector('.close-btn')
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
  showModal();
}
function hideBackdrop(evt) {
    evt.preventDefault();
  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0');
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

const handleGallery = (evt) => {
  let shoppingBagAllProducts = load('shopping-list') ? load('shopping-list') : [];
  let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
  // console.log(shoppingBagAllProducts);
  //  console.log(shoppingBag);
  const products = shoppingBag.map(item => {
    const [data] = shoppingBagAllProducts.filter(product =>
    product.id === item);
    return data;
  } 
  );
  showBackdrop();
  renderMarkupList(products);

  const totalEl = document.querySelector('.total');
  // products.map((product) => console.log(Number(product.variants[0].price.split('.')[0])));
  totalPrice = products.reduce((total, product) => {return Number(total) + Number(product.variants[0].price.split('.')[0])}, 0);
  
  totalEl.innerHTML = totalPrice;

  const removeCard = document.querySelector('.list');
  removeCard.addEventListener('click', removeItem);
};

function removeItem(evt) {
  if (evt.target === evt.currentTarget) {
    return;
  }
  let shoppingBag = load('favorite-list') ? load('favorite-list') : [];
  let shoppingBagAllProducts = load('shopping-list') ? load('shopping-list') : [];
  let cardId = Number(evt.target.closest('.remove').getAttribute('data-id'));
  let productCard = evt.target.closest('.card-product')

 
  productCard.remove();
  const newData = shoppingBag.filter((item) => item !== cardId);
  save('favorite-list', newData);

  const totalEl = document.querySelector('.total');

    const products = newData.map(item => {
    const [data] = shoppingBagAllProducts.filter(product =>
    product.id === item);
    return data;
    });
  
  totalPrice = products.reduce((total, product) => {return Number(total) + Number(product.variants[0].price.split('.')[0])}, 0);
  totalEl.textContent = totalPrice;
}

function renderMarkupList(data) {
  // console.log(data);
  const list = data.map(({ id, images, title, body_html, variants }) => {
    const picture = images[0];
    const card = `
    <li class="flex py-6 card-product">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                        src="${images.length === 0
                         ? `${notPic}`
                         : `${picture.src}`
                         }" 
                         alt="product photo ${id}" class="h-full w-full object-cover object-center">
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">${title}</a>
                            </h3>
                            <p class="ml-4">${variants[0].price}</p>
                          </div>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <p class="text-gray-500">${body_html}</p>
                          <div class="flex">
                            <button type="button" data-id=${id} class="remove font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </div>
                    </li>
    `;
    return card;
  }).join('');

  productsList.innerHTML=list;
 } 


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
} 

itemList.addEventListener('click', handleStorageList);
cardList.addEventListener('click', handleGallery);
closeModalBtn.addEventListener('click', hideBackdrop);
closeBtn.addEventListener('click', hideBackdrop);
