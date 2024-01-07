import icons from "url:../../img/icons.svg";
import View from "./View";

class AddRecipeView extends View {
  _errorMess = "Couille dans le potage";
  _successMess = "Recipe added !";
  _addRecipeWindow = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _ingredient = {
    index: 1,
  };

  //// HANDLERS ////
  toogleWindow() {
    this._addRecipeWindow.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }
  _addIngredient() {
    this._ingredient.index++;
    document
      .querySelector(".upload__column--right")
      .insertAdjacentHTML("beforeend", this._renderIngredientMarkup());
  }

  /**
   *
   * @param {*} handler
   */
  handlerToggleRecipeForm() {
    // Nav btn
    document
      .querySelector(".nav__btn--add-recipe")
      .addEventListener("click", this.toogleWindow.bind(this));
    // Close btn
    document
      .querySelector(".btn--close-modal")
      .addEventListener("click", this.toogleWindow.bind(this));
    // Overlay
    document
      .querySelector(".overlay")
      .addEventListener("click", this.toogleWindow.bind(this));
  }
  handleraddIngredient() {
    document
      .querySelector(".btn--add-ingredient")
      .addEventListener("click", this._addIngredient.bind(this));
  }
  handlerUploadRecipe(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      // Convert to array.
      let formDatas = [...new FormData(this)];
      // Group ingredients.
      const ingredients = [];
      let nbIngredients = this.querySelectorAll(
        "fieldset.upload__ingredient"
      ).length;
      while (nbIngredients > 0) {
        const ing = formDatas.filter((el) =>
          el[0].startsWith(`ingredient-${nbIngredients}`)
        );
        ing.map((el) => {
          const term = el[0].split("-");
          return el.splice(0, 1, `${term[2]}`);
        });
        ingredients.push(Object.fromEntries(ing));
        nbIngredients--;
      }
      // Remove ingredients.
      formDatas = [...new FormData(this)]; // Why reassign this?
      const noIngForm = formDatas.filter(
        (el) => !el[0].startsWith(`ingredient`)
      );
      // Convert to an Object and add ingredients.
      const datas = Object.fromEntries(noIngForm);
      datas.ingredients = ingredients;
      handler(datas);
    });
  }
  //// DOM ////
  _renderIngredientMarkup() {
    return `<fieldset class="upload__ingredient" data-index="${this._ingredient.index}">
    <legend>Ingredient ${this._ingredient.index}</legend>
    <div class="upload__ingredient-container">
    <div>
      <label for="ingredient-${this._ingredient.index}-quantity">Quantity</label>
    <input
      value="0.5"
      type="text"
      name="ingredient-${this._ingredient.index}-quantity"
      id="ingredient-${this._ingredient.index}-quantity"
      placeholder="Quantity"
      size="5"
    /></div>
    <div>
      <label for="ingredient-${this._ingredient.index}-unit">Unit</label>
    <input
      value="kg"
      type="text"
      name="ingredient-${this._ingredient.index}-unit"
      id="ingredient-${this._ingredient.index}-unit"
      placeholder="unit: e.g. kg, spoon..."
      size="5"
    />
  </div>
    <div><label for="ingredient-${this._ingredient.index}-description">Description</label>
    <input
      value="0.5"
      type="text"
      required
      name="ingredient-${this._ingredient.index}-description"
      id="ingredient-${this._ingredient.index}-description"
      placeholder="Description"
    />
  </div>
</div>
  </fieldset>`;
  }
}
export default addRecipeView = new AddRecipeView(".upload");
