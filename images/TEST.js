const containerCocktailThumbnail = document.querySelector(
  "#container-cocktail-thumbnail"
);

for (let i = 0; i < 100; i++) {
  const newCard = document
    .querySelector("#template-cocktail-thumbnail")
    .content.cloneNode(true);

  containerCocktailThumbnail.appendChild(newCard);
}
