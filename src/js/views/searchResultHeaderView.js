import icons from "url:../../img/icons.svg";
import View from "./View";
import fracty from "fracty";

class SearchResultHeaderView extends View {
  //// MARKUP ////
  /**
   *
   * @returns
   */
  _renderMarkup() {
    return ` 
    <h2 class="heading--2">${this._datas.result.length} ${this._datas.keyword}'s recipes</h2>
    `;
  }
}

export default searchResultHeaderView = new SearchResultHeaderView(
  ".search-results__header"
);
