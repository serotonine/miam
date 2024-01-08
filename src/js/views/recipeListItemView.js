import icons from "url:../../img/icons.svg";

/**
 * Recipe's ingredients section markup & events.
 */
class RecipeListItemView {
  _datas = undefined;
  /**
   *
   * @param {*} datas
   * @returns {string}
   */
  renderRecipeListItem(datas) {
    const hash = location.hash.slice(1);
    this._datas = datas;
    return ` 
    <li class="preview">
      <a class="preview__link ${
        hash === datas.id ? `preview__link--active` : ``
      }" href="#${datas.id}">
        <figure class="preview__fig">
          <img src="${datas.image_url}" alt="${datas.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${datas.title}</h4>
          <p class="preview__publisher">${datas.publisher}</p>
         ${this._renderUser(datas)}
        </div>
      </a>
    </li>
    `;
  }
  _renderUser(datas) {
    return datas.key
      ? `<div class="preview__user-generated">
        <svg><use href="${icons}#icon-user"></use></svg>
      </div>`
      : "";
  }
}
export default recipeListItemView = new RecipeListItemView();
