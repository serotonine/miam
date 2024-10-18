import View from "./View";
/**
 * Search recipe Autocomplete section markup & events.
 * @extends View
 */
class AutocompleteView extends View {
  //// HANDLER ////
  handlerSelectTerm(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const word = e.target.textContent;
      handler(word);
    });
  }
  handlerClearTerms(handler) {
    document.addEventListener("click", function (e) {
      const element = e.target.closest(".autocomplete");
      if (!element) {
        handler();
      }
    });
  }
  //// MARKUP ////
  /**
   *
   * @returns
   */
  _renderMarkup() {
    return this._datas.map((term) => this._renderTerm(term)).join("");
  }
  _renderTerm(term) {
    return `<div class="autocomplete__term">
    <p><strong class="">${term[0].toUpperCase()}</strong>${term.slice(1)}</p>
    </div>`;
  }
}
export default new AutocompleteView(".autocomplete");
