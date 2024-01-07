class SearchView {
  _parentElement = document.querySelector(".search__container");
  // _autocomplete = this._parentElement.querySelector(".autocomplete");
  _input = this._parentElement.querySelector("input.search__field");

  handlerSearchRecipe(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  handlerSearchRecipeAutocomplete(handler) {
    this._parentElement.addEventListener("input", function (e) {
      const word = e.target.value;

      if (word.length == 0 || word.length > 3) {
        /* console.log(
          `handlerSearchRecipeAutocomplete > word.length`,
          word.length
        ); */
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
