// a class to cleanup the API data

class Cocktail {
  constructor(obj) {
    this.id = obj.idDrink;
    this.img = obj.strDrinkThumb;
    this.name = obj.strDrink;
    this.ingredients = {};
    this.instructions = obj.strInstructions;
    this.category = obj.strCategory;
    for (let i = 1; i < 16; i++) {
      if (obj[`strIngredient${i}`]) {
        this.ingredients[obj[`strIngredient${i}`]] = obj[`strMeasure${i}`];
      }
    }
  }
}
