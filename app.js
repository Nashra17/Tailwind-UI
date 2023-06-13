const appId = "9b3827a7";
const appKey = "1d7572c12c77bd29c024de4f549947e0";

const input = document.querySelector("input");
const button = document.querySelector("button");
const recipeContainer = document.querySelector(".recipe-container");

const generateRecipeCard = ({
  title,
  imageUrl,
  recipeUrl,
  ingredientsArray,
}) => `
<div class="card-container">
  <div class="card u-clearfix">
    <div class="card-body">
      <span class="card-author subtle">Nashra Kamar</span>
      <h2 class="card-title">${title}</h2>
      <span class="card-description subtle">${
        ingredientsArray.length > 0 && ingredientsArray.slice(0,5).join(', ')
      }</span>
      <div class="read">
        <a href="${recipeUrl}" class="card-read">Get Recipe</a>
      </div>
    </div>
    <img src="${imageUrl}" alt="" class="card-media" />
  </div>
  <div class="card-shadow"></div>
</div>`;

const searchRecipe = async () => {
  try {
    button.disabled = true;
    button.textContent = "Searching...";
    recipeContainer.innerHTML = "";

    const query = input.value;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

    const response = await fetch(url);
    const { hits } = await response.json();
    console.log(hits);
    hits.forEach(({ recipe }) => {
      const card = document.createElement("div");
      card.classList.add("p-6");
      card.innerHTML = generateRecipeCard({
        title: recipe.label,
        imageUrl: recipe.image,
        recipeUrl: recipe.url,
        ingredientsArray: recipe.ingredientLines,
      });
      recipeContainer.append(card);
    });
  } catch (error) {
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Search";
  }
};

button.addEventListener("click", searchRecipe);
