import icons from "url:../../img/icons.svg";
import View from "./View";
import recipeListItemView from "./recipeListItemView";
import fracty from "fracty";

class SearchResultView extends View {
  //// MARKUP ////
  /**
   *
   * @returns
   */
  _renderMarkup() {
    //console.log(`SearchResultView > _renderMarkup`, this._datas);
    return this._datas
      .map((recipe) => recipeListItemView.renderRecipeListItem(recipe))
      .join("");
  }
}

export default searchResultView = new SearchResultView(".results");
