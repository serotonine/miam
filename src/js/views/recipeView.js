import icons from "url:../../img/icons.svg";
import View from "./View";
import fracty from "fracty";

class RecipeView extends View {
  //// HANDLERS ////
  /**
   *
   * @param {*} handler
   */
  handlerRenderRecipe(handler) {
    ["load", "hashchange"].forEach((evt) =>
      window.addEventListener(evt, handler)
    );
  }
  handlerDeleteRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btnDeleteRecipe = e.target.closest(".btn--delete-recipe");
      if (btnDeleteRecipe) handler();
    });
  }
  handlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btnUpdateServings = e.target.closest(".btn--update-servings");
      if (!btnUpdateServings) {
        return;
      }
      const { updateServings } = btnUpdateServings.dataset;
      if (+updateServings > 0) {
        handler(+updateServings);
      }
    });
  }
  //// MARKUP ////
  /**
   *
   * @returns
   */
  _renderMarkup() {
    return `${this._renderRecipeImage()}
    ${this._renderRecipeNavigation()}
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
       ${this._datas.ingredients
         .map((ing) => this._renderIngredients(ing))
         .join("")}
      </ul>
    </div>
    ${this._renderRecipeFooter()}
`;
  }
  _renderRecipeImage() {
    return `<figure class="recipe__fig">
    <img src="${this._datas.image_url}" alt="${this._datas.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._datas.title}</span>
    </h1>
  </figure>`;
  }
  _renderRecipeNavigation() {
    return ` <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._datas.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._datas.servings
      }</span>
      <span class="recipe__info-text">servings</span>
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-servings="${
          this._datas.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-servings="${
          this._datas.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._datas.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
    ${
      this._datas.key
        ? `<button class="btn--round btn--delete-recipe">
       <svg><use href="${icons}#icon-delete"></use></svg>
     </button>`
        : ""
    }
  </div>`;
  }
  _renderIngredients(ing) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${fracty(ing.quantity)}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      <span>${ing.description}</span>
    </div>
  </li>`;
  }
  _renderRecipeFooter() {
    return `<div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${this._datas.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._datas.source_url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
}
export default recipeView = new RecipeView(".recipe");
