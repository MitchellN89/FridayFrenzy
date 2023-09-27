function addCategory(category) {
  const newElement = document
    .querySelector("#template-category-thumbnail")
    .content.cloneNode(true);

  newElement.querySelector("label").innerHTML = category;
  newElement.querySelector("label").htmlFor = `checkbox_${category}`;
  newElement.querySelector("input").id = `checkbox_${category}`;

  document.querySelector("#container-categories").appendChild(newElement);
}

function addCocktailThumbs() {
  document.querySelector("#container-cocktail-thumbnail").innerHTML = "";

  const missingIngredients = Array.from(categories)
    .filter((category) => {
      return !category[1];
    })
    .map((category) => {
      return category[0];
    })
    .join(" ");

  console.log(typeof missingIngredients);

  const filteredSet = allCocktails.filter((cocktail) => {
    return !missingIngredients.includes(cocktail.category);
  });

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

addCocktailThumbs = debouncer(addCocktailThumbs, 1000);

function runModal() {
  const modal = document.querySelector("#component-modal");
  modal.classList.remove("mycss-display-none");
}

function closeModal() {
  const modal = document.querySelector("#component-modal");
  modal.classList.add("mycss-display-none");
}
