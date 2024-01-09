import View from "./View";
import recipeListItemView from "./recipeListItemView";

/**
 * Add Recipe form section markup & events.
 * @extends View
 */
class SearchResultView extends View {
  /**
   * Render Search result recipe items.
   * @returns {string} - Markup.
   */
  _renderMarkup() {
    return this._datas
      .map((recipe) => recipeListItemView.renderRecipeListItem(recipe))
      .join("");
  }
}

export default new SearchResultView(".results");
