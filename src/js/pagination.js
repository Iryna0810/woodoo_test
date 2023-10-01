import axios from 'axios';

class APICard {
  #BASE_URL = 'https://voodoo-sandbox.myshopify.com/products.json';

  constructor() {
    this.page = 1;
  }

  async fetchCard(page) {
    if (page === undefined) {
      page = 1;
    }
    try {
      return await axios.get(
        `${this.#BASE_URL}?&page=${page}&limit=24`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async fetchCardTotal(page) {
    if (page === undefined) {
      page = 1;
    }
    try {
      return await axios.get(
        `${this.#BASE_URL}`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const ApiCardList = new APICard();
const cardArray = ApiCardList.fetchCardTotal()
  .then(({ data }) => {
    const { products } = data;
    console.log(products.length);
    return products;
  })
  .catch(err => { console.log(err);});;
  ;


const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.querySelector(".galleryCards-js");
const listItems = document.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 24;
let total = 100;
const pageCount = Math.ceil(total / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("text-pink");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("text-pink");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");;
  pageNumber.className = "pagination-number first:ml-0 text-xs font-semibold w-8 h-8 mx-1 p-0 rounded-full leading-tight relative border border-solid border-black hover:border-white text-black hover:bg-pink hover:text-white";
  pageNumber.innerText = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

   paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
