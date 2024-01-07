class SearchView {
  _parentElement = document.querySelector(".search__container");
  _input = this._parentElement.querySelector("input.search__field");
  _autocomplete = this._parentElement.querySelector(".autocomplete");

  handlerSearchRecipe(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  handlerSearchRecipeAutocomplete(handler) {
    this._parentElement.addEventListener("input", function (e) {
      const word = e.target.value;

      if (word.length > 3) {
        return;
      }
      handler(word);
    });
  }
  setQuery(word) {
    this._input.value = word;
  }
  query() {
    const query = this._input.value;
    this._input.value = "";
    return query;
  }
}
export default searchView = new SearchView();
