import View from "./View";
import recipeListItemView from "./recipeListItemView";
/**
 * Recipe bookmarks section markup & events.
 * @extends View
 */
class BookmarkView extends View {
  _bookmarkBtnContainer = document.querySelector(".recipe");
  _errorMess = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  //// HANDLERS ///
  handlerAddBookmark(handler) {
    this._bookmarkBtnContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (btn) {
        e.preventDefault();
        handler();
      } else {
        return;
      }
    });
  }
  handlerBookmarksStorage(handler) {
    window.addEventListener("load", handler);
  }
  /// BOOKMARKS ///
  _renderMarkup() {
    // console.log(!Array.isArray(this._datas));
    return this._datas
      .map((recipe) => recipeListItemView.renderRecipeListItem(recipe))
      .join("");
  }
}
export default new BookmarkView(".bookmarks__list");
