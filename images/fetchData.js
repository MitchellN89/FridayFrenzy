const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const allCocktails = [];
const categories = new Map();

const statusObj = {
  categories: false,
  ingredients: false,
  allCocktails: false,
  _ready: false,
};

function updateStatus(key, value) {
  statusObj[key] = value;
}

function getData(prefix = "", str = "") {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/${prefix}${str}`)
    .then((response) => response.json())
    .then((json) => json);
}

async function getDataLoop(arr, callbackfunc) {
  for (let i = 0; i < arr.length; i++) {
    const result = await getData("search.php?f=", arr[i]);
    callbackfunc(result);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getDataLoop(letters, (data) => {
    const cocktails = data.drinks;
    if (cocktails) {
      cocktails.forEach((cocktail) => {
        allCocktails.push(new Cocktail(cocktail));
      });
    }
  })
    .then(() => {
      return getData("list.php?c=list");
    })
    .then((data) => {
      data.drinks.forEach((category) => {
        categories.set(category.strCategory, true);
      });
    })
    .then(() => {
      Array.from(categories).forEach((category) => {
        addCategory(category[0]);
      });
    })
    .then(() => {
      addCocktailThumbs();
    })
    .then(() => {
      updateStatus("categories", true);
    });
});
