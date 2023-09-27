// Variable Declarations

const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const btnFilters = document.querySelector("#btn-filters");
const sectionFilter = document.querySelector("#section-filter");
const containerCocktailThumbnails = document.querySelector(
  "#container-cocktail-thumbnail"
);
const modal = document.querySelector("#component-modal");
const modalClose = document.querySelector("#modal-close");

// Function Declarations

function addCategory(category) {
  // Grab the template
  const newElement = document
    .querySelector("#template-category-thumbnail")
    .content.cloneNode(true);

  // populate fields
  newElement.querySelector("label").innerHTML = category;
  newElement.querySelector("label").htmlFor = `checkbox_${category}`;
  newElement.querySelector("input").id = `checkbox_${category}`;

  // append the container
  document.querySelector("#container-categories").appendChild(newElement);
}

function addCocktailThumbs() {
  // clear the existing container
  document.querySelector("#container-cocktail-thumbnail").innerHTML = "";

  // convert the map to an array to iterate over
  const missingIngredients = Array.from(categories)
    .filter((category) => {
      // filter the none selected categories
      return !category[1];
    })
    .map((category) => {
      // map out the second element of the original map
      return category[0];
    })
    .join(" "); //join so that it's just a string of category names

  console.log(typeof missingIngredients);

  // filter the allcocktails object and pull out ONLY the cocktails with the selected categories, store in new array
  const filteredSet = allCocktails.filter((cocktail) => {
    return !missingIngredients.includes(cocktail.category);
  });

  // go through, create a new object from a template and add each to the correct container
  filteredSet.forEach((cocktail) => {
    const newElement = document
      .querySelector("#template-cocktail-thumbnail")
      .content.cloneNode(true);

    newElement.querySelector("img").src = cocktail.img;
    newElement.querySelector(".card-title").innerHTML = cocktail.name;
    newElement.querySelector(
      ".myID-cocktail-thumbnail"
    ).id = `cocktail_thumb_${cocktail.id}`;

    document
      .querySelector("#container-cocktail-thumbnail")
      .appendChild(newElement);
  });
}

// update the function and turn it into a 1second debouncer
addCocktailThumbs = debouncer(addCocktailThumbs, 1000);

// define function which opens the custom modal
function runModal() {
  const modal = document.querySelector("#component-modal");
  modal.classList.remove("mycss-display-none");
}

// close the custom modal
function closeModal() {
  const modal = document.querySelector("#component-modal");
  modal.classList.add("mycss-display-none");
}

// Event Listeners

btnFilters.addEventListener("click", () => {
  if (sectionFilter.classList.contains("mycss-collapse")) {
    sectionFilter.classList.remove("mycss-collapse");
    btnFilters.innerHTML = "CLOSE FILTERS";
    btnFilters.classList.add("mycss-style-underline");
  } else {
    sectionFilter.classList.add("mycss-collapse");
    btnFilters.innerHTML = "OPEN FILTERS";
    btnFilters.classList.remove("mycss-style-underline");
  }
});

containerCocktailThumbnails.addEventListener("click", (evt) => {
  const card = evt.target.closest(".myID-cocktail-thumbnail");

  if (card) {
    const cocktail = allCocktails.find((cocktail) => {
      return card.id === `cocktail_thumb_${cocktail.id}`;
    });

    console.log(cocktail);
    const modalTitle = document.querySelector("#modal-title");
    modalTitle.innerHTML = cocktail.name;
    const modalIngredients = document.querySelector("#modal-ingredients");
    modalIngredients.innerHTML = "";
    for (let ingredient in cocktail.ingredients) {
      console.log(ingredient);
      const newLi = document.createElement("li");

      newLi.innerHTML = `${ingredient}: ${cocktail.ingredients[ingredient]}`;
      modalIngredients.appendChild(newLi);
    }

    const modalImg = document.querySelector("#modal-img");
    modalImg.src = cocktail.img;
    const modalInstructions = document.querySelector("#modal-instructions");
    modalInstructions.innerHTML = cocktail.instructions;

    runModal(cocktail);
  }
});

modal.addEventListener("click", (evt) => {
  if (evt.target === modal) {
    closeModal();
  }
});

modalClose.addEventListener("click", (evt) => {
  closeModal();
});

sectionFilter.addEventListener("click", (evt) => {
  const checkBox = evt.target.closest(".mycss-element-checkbox");
  console.log(checkBox);
  const checkBoxVal = checkBox.querySelector("input");

  if (checkBoxVal.checked) {
    categories.set(checkBox.querySelector("label").innerHTML, true);
  } else {
    categories.set(checkBox.querySelector("label").innerHTML, false);
  }

  addCocktailThumbs();
});

// Executed Functions

getDataLoop(letters, "search.php?f=", (data) => {
  // first pass in the letters array, the prefix and define my callbackfunction
  const cocktails = data.drinks; //store all the data in cocktails variable
  if (cocktails) {
    //check if there is actually any data
    cocktails.forEach((cocktail) => {
      // iterate over each cocktail in the array, take the required data and make an instance of Cocktail for each. Then push into the allCocktails array
      allCocktails.push(new Cocktail(cocktail));
    });
  }
})
  .then(() => {
    return getData("list.php?c=list");
    // now grab the categories
  })
  .then((data) => {
    data.drinks.forEach((category) => {
      //now add each category to a map and makes it value true (indicating the filter checkboxes are all ticked)
      categories.set(category.strCategory, true);
    });
  })
  .then(() => {
    Array.from(categories).forEach((category) => {
      //convert the map to an array in order to iterate over and add checkboxes to the category container in the DOM
      addCategory(category[0]);
    });
  })
  .then(() => {
    // now show the filter bar and add all the cocktail thumbnails
    document
      .querySelector("#component-filter-bar")
      .classList.remove("mycss-display-none");
    addCocktailThumbs();
  });
