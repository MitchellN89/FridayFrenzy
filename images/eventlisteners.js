const btnFilters = document.querySelector("#btn-filters");
const sectionFilter = document.querySelector("#section-filter");
const containerCocktailThumbnails = document.querySelector(
  "#container-cocktail-thumbnail"
);
const modal = document.querySelector("#component-modal");
const modalClose = document.querySelector("#modal-close");

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
