import {
  API_URL,
  API_KEY,
  RESULTS_BY_PAGE,
  API_SEARCH_TERMS,
} from "./config.js";
import { getAJAX, deleteAJAX } from "./ajaxHelper";

export const state = {
  recipe: {},
  search: {
    keyword: "",
    result: [],
    page: 1,
  },
  bookmarks: [],
  autocomplete: [],
};

const setStateRecipe = function (datas) {
  const { recipe } = datas.data;
  return {
    cooking_time: recipe.cooking_time,
    id: recipe.id,
    image_url: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    source_url: recipe.source_url,
    title: recipe.title,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const datas = await getAJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = setStateRecipe(datas);
    console.log(`loadRecipe`, state.recipe);
    // Set bookmarked.
    if (state.bookmarks.some((entry) => entry.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    }
  } catch (error) {
    //TODO : refine output
    throw new Error(error.message);
  }
};
export const uploadRecipe = async function (datas) {
  try {
    const recipeObj = {
      cooking_time: +datas.cookingTime,
      image_url: datas.image,
      ingredients: datas.ingredients,
      publisher: datas.publisher,
      servings: +datas.servings,
      source_url: datas.sourceUrl,
      title: datas.title,
    };
    const response = await getAJAX(`${API_URL}?key=${API_KEY}`, recipeObj);
    state.recipe = setStateRecipe(response);
    state.recipe.bookmarked = true;
    addBookmark(state.recipe);
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteRecipe = async function (id) {
  try {
    const response = await deleteAJAX(`${API_URL}${id}?key=${API_KEY}`);
    // Remove from bookmarks
    removeBookmark(id);
    setLocalStorageBookmark();
    // Remove recipe from search results
    const index = state.search.result.findIndex((el) => el.id == id);
    if (Number.isFinite(index)) {
      state.search.result.splice(index, 1);
    }
  } catch (error) {
    throw new Error(error);
  }
};
// SEARCH //
/**
 *
 * @param {string} query The search keyword.
 */
export const loadSearchResult = async function (query) {
  try {
    const results = await getAJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    // Use to render the search result header.
    state.search.keyword = query;
    const { recipes } = results.data;
    state.search.result = recipes;
  } catch (error) {
    //TODO : refine output
    throw new Error(error.message);
  }
};

export const autocomplete = function (word) {
  const searchTerms = [...API_SEARCH_TERMS].sort();
  state.autocomplete = [];
  const terms = searchTerms.filter((term) => term.startsWith(word));
  if (terms.length === 0) {
    return;
  }
  state.autocomplete = terms;
};
/**
 *
 */
export const getSearchResultsByPage = function (page = this.state.search.page) {
  // Update page number.
  state.search.page = page;
  const start = (page - 1) * RESULTS_BY_PAGE;
  const end = page * RESULTS_BY_PAGE;
  return state.search.result.slice(start, end);
};
// SERVINGS
export const updateServings = function (nbServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * nbServings) / state.recipe.servings;
  });
  state.recipe.servings = nbServings;
};
// BOOKMARKS
export const addBookmark = function (recipe) {
  if (state.recipe.id === recipe.id) {
    state.recipe.bookmarked = true;
  }
  const isDupplicate = state.bookmarks.some((el) => el.id == recipe.id);
  if (isDupplicate) {
    return;
  }
  state.bookmarks.push(state.recipe);
  setLocalStorageBookmark();
  console.log(`/// addBookmark /// =>`, recipe);
};
export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) {
    state.recipe.bookmarked = false;
  }
  setLocalStorageBookmark();
};
const setLocalStorageBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const getLocalStorageBookmark = function () {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    state.bookmarks = JSON.parse(bookmarks);
  }
};
