const callsArr = ["random.php", "random.php", "random.php"]; //creating an array of 3 str

// a function in order to add one cocktail card to the container at a time
function addCarouselItem(cocktail) {
  // get the template
  const newCarouselItem = document
    .querySelector("#template-carousel-item")
    .content.cloneNode(true);

  //define templates "data"
  const title = newCarouselItem.querySelector(".id-carousel-title");
  title.innerHTML = cocktail.name;
  const ingredients = newCarouselItem.querySelector(".id-carousel-ingredients");
  ingredients.innerHTML = "";
  for (let ingredient in cocktail.ingredients) {
    console.log(ingredient);
    const newLi = document.createElement("li");
    newLi.innerHTML = `${ingredient}: ${cocktail.ingredients[ingredient]}`;
    ingredients.appendChild(newLi);
  }
  const img = newCarouselItem.querySelector(".id-carousel-img");
  img.src = cocktail.img;
  const instructions = newCarouselItem.querySelector(
    ".id-carousel-instructions"
  );
  instructions.innerHTML = cocktail.instructions;

  // add to carousel
  document.querySelector("#container-carousel").appendChild(newCarouselItem);
}

// pass in the array callsArr and push the data into the allCoctails array
getDataLoop(callsArr, "", (data) => {
  const cocktails = data.drinks;
  if (cocktails) {
    cocktails.forEach((cocktail) => {
      allCocktails.push(new Cocktail(cocktail));
    });
  }
})
  .then(() => {
    // populate carousel
    console.log("Items Received: ,", allCocktails);
    allCocktails.forEach((cocktail) => {
      addCarouselItem(cocktail);
    });
    document
      .querySelector("#container-carousel")
      .firstElementChild.classList.add("active");
  })
  .then(() => {
    document.querySelector("#icon-loading").remove();
    document
      .querySelector("#container-carousel-global")
      .classList.remove("mycss-display-none");
  });
