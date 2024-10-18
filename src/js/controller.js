import _ from "lodash";
import recipeView from "./views/recipeView";
import addRecipeView from "./views/addRecipeView";
import searchView from "./views/searchView";
import autocompleteView from "./views/autocompleteView";
import searchResultHeaderView from "./views/searchResultHeaderView";
import paginationView from "./views/paginationView";
import searchResultView from "./views/searchResultView";
import bookmarkView from "./views/bookmarkView";
import * as model from "./model";

// Handlers
/**
 * Control the loading and render recipe item process.
 */
const controlRenderRecipe = async function () {
  const id = location.hash.slice(1);
  if (!id) {
    return;
  }
  try {
    // Load recipe.
    await model.loadRecipe(id);
    // Render recipe.
    recipeView.render(model.state.recipe);
    // Update Bookmarks && search results.
    if (model.state.bookmarks.length !== 0) {
      bookmarkView.render(model.state.bookmarks);
    }
  } catch (error) {
    console.error(`controlRenderRecipe`, error);
    recipeView.renderError(error);
  }
};
// Add recipe.
const controlUploadRecipe = async function (datas) {
  try {
    await model.uploadRecipe(datas);
    // Render success.
    addRecipeView.renderSuccess();
    // Update hash.
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // Render recipe.
    recipeView.render(model.state.recipe);
    // Update bookmarks.
    bookmarkView.render(model.state.bookmarks);
    // Close popup window
    setTimeout(addRecipeView.toogleWindow(), 20000);
  } catch (error) {
    console.log(`controlUploadRecipe Error =>`, error);
    addRecipeView.renderError(error);
  }
};
const controlDeleteRecipe = async function () {
  try {
    await model.deleteRecipe(model.state.recipe.id);
    recipeView.renderSuccess(`${model.state.recipe.title} has been deleted.`);
    // Update Bookmarks && search results.
    // TODO set update
    bookmarkView.render(model.state.bookmarks);

    if (model.state.search.result.length !== 0) {
      // Render search results.
      searchResultView.render(model.getSearchResultsByPage());
      // Render pagination.
      paginationView.render(model.state.search);
      // Render search result Header.
      searchResultHeaderView.render(model.state.search);
    }
    window.history.replaceState(null, "", location.origin);
    setTimeout(
      () =>
        recipeView.renderSuccess(
          "Start by searching for a recipe or an ingredient. Have fun!"
        ),

      1000
    );
  } catch (error) {
    console.error(`controlRenderRecipe`, error);
    recipeView.renderError(error);
  }
};
/**
 *
 */
const controlSearchRecipe = async function () {
  try {
    // Get query keyword
    const query = searchView.query();
    if (!query) {
      return;
    }
    // Load search results.
    await model.loadSearchResult(query);
    // Render search results.
    searchResultView.render(model.getSearchResultsByPage());
    // Render pagination.
    paginationView.render(model.state.search);
    // Render search result Header.
    searchResultHeaderView.render(model.state.search);
  } catch (error) {}
};
/// Autocomplete. ///
const controlSearchRecipeAutocomplete = function (word) {
  autocompleteView._clear();
  model.autocomplete(word);
  if (model.state.autocomplete.length > 0) {
    autocompleteView.render(model.state.autocomplete);
  }
};
const controlSelectTerm = function (word) {
  console.log(`controlSelectTerm`, word);
  searchView.setQuery(word);
  autocompleteView._clear();
};
const controlClearTerms = function () {
  autocompleteView._clear();
};
/// Pagination. ///
const controlPagination = function (page) {
  model.state.search.page = page;
  // Render search results.
  searchResultView.render(model.getSearchResultsByPage());
  // Render pagination.
  paginationView.render(model.state.search);
};
// Bookmarks.
const controlAddRemoveBookmark = function () {
  model.state.recipe.bookmarked
    ? model.removeBookmark(model.state.recipe.id)
    : model.addBookmark(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
  searchResultView.update(model.getSearchResultsByPage());
};
const controlBookmarksStorage = function () {
  if (model.state.bookmarks.length !== 0) {
    bookmarkView.render(model.state.bookmarks);
  }
};
// Update servings.
const controlUpdateServings = function (nbServings) {
  model.updateServings(nbServings);
  recipeView.update(model.state.recipe);
};

// INIT //
(function () {
  // Add recipe.
  addRecipeView.handlerToggleRecipeForm();
  addRecipeView.handleraddIngredient();
  addRecipeView.handlerUploadRecipe(controlUploadRecipe);
  // Load recipe.
  recipeView.handlerRenderRecipe(controlRenderRecipe);
  recipeView.handlerDeleteRecipe(controlDeleteRecipe);
  // Search recipe.
  searchView.handlerSearchRecipe(controlSearchRecipe);
  searchView.handlerSearchRecipeAutocomplete(controlSearchRecipeAutocomplete);
  autocompleteView.handlerSelectTerm(controlSelectTerm);
  autocompleteView.handlerClearTerms(controlClearTerms);
  // Pagination.
  paginationView.handlerPagination(controlPagination);
  // Bookmarks.
  model.getLocalStorageBookmark();
  bookmarkView.handlerBookmarksStorage(controlBookmarksStorage);
  bookmarkView.handlerAddBookmark(controlAddRemoveBookmark);
  // Update servings.
  recipeView.handlerUpdateServings(controlUpdateServings);
})();
