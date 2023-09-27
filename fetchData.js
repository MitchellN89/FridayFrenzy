const allCocktails = [];
const categories = new Map();

// define a single fetch call with 2 args for repeatability
function getData(prefix = "", str = "") {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/${prefix}${str}`)
    .then((response) => response.json())
    .then((json) => json);
}

// define a callback function that allows an array to be passed in, each element in the array is passed into getData as the str arg.
// then after prefix is passed in, callbackfunc is called, passing in the data
async function getDataLoop(arr, prefix = "", callbackfunc) {
  for (let i = 0; i < arr.length; i++) {
    const result = await getData(prefix, arr[i]);
    callbackfunc(result);
  }
}
