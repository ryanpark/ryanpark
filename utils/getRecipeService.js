const apiUrl = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const apiKey = "f7297ec863msh55e5e2183df88a2p1e4483jsn569f1177febd";

const getRecipeById = Id => {
  let responseData;
  responseData = fetch(`https://${apiUrl}/recipes/${Id}/summary`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey
    }
  })
    .catch(error => {
      console.log(error);
    })
    .then(response => response.json());
  return responseData;
};

const getRecipeService = (sKeywords, num) => {
  let responseData;
  sKeywords = sKeywords.replace(/\s+/g, ",").toLowerCase();
  responseData = fetch(
    `https://${apiUrl}/recipes/findByIngredients?number=${num}&ranking=1&ignorePantry=false&ingredients=${sKeywords}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiUrl,
        "x-rapidapi-key": apiKey
      }
    }
  )
    .catch(error => {
      console.log(error);
    })
    .then(response => response.json());
  return responseData;
};

const getRandomRecipe = () => {
  let responseData;
  const number = 5;
  responseData = fetch(`https://${apiUrl}/recipes/random?number=${number}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey
    }
  })
    .catch(error => {
      console.log(error);
    })
    .then(response => response.json());
  return responseData;
};
export { getRecipeService, getRecipeById, getRandomRecipe };
