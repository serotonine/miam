import icons from "./icons.svg";
/**
 * SuperClass render recipe markup & Event handlers.
 * @class
 */
export default class View {
  _datas = {};
  _successMess = "";
  _errorMess = "Not the right format!";
  constructor(parentElement = "") {
    this._parentElement = document.querySelector(parentElement);
  }
  render(datas) {
    // Guard.
    if (!datas || (Array.isArray(datas) && datas.length === 0)) {
      return this.renderError();
    }
    this._datas = datas;
    this._clear();
    this._insertMarkup(this._renderMarkup());
  }
  /**
   *
   * @param {*} datas
   */
  update(datas) {
    this._datas = datas;
    const newMarkup = this._renderMarkup();

    // New markup in memory.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newEls = Array.from(newDOM.querySelectorAll("*"));
    const currEls = Array.from(this._parentElement.querySelectorAll("*"));

    newEls.forEach(function (newEl, i) {
      const currEl = currEls[i];
      if (!newEl.isEqualNode(currEl)) {
        if (newEl.firstChild?.nodeValue.trim() !== "") {
          currEl.textContent = newEl.textContent;
        }
        // See data-xx attributes.
        Array.from(newEl.attributes).forEach((att) =>
          currEl.setAttribute(att.name, att.value)
        );
      }
    });
  }
  renderSuccess(success = this._successMess) {
    const markup = ` <div class="error">
    <div>
        <svg><use href="${icons}#icon-smile"></use></svg>
      </div>
      <p>${success}</p>
    </div>`;
    this._clear();
    this._insertMarkup(markup);
  }
  /**
   * Insert error message markup in the dedicated (this._parentElement) DOM container.
   * @param {string} error message.
   */
  renderError(error = this._errorMess) {
    const markup = ` <div class="error">
    <div>
        <svg><use href="${icons}#icon-alert-triangle"></use></svg>
      </div>
      <p>${error}</p>
    </div>`;
    this._clear();
    this._insertMarkup(markup);
  }
  /**
   * Insert spinner markup in the dedicated (this._parentElement) DOM container.
   */
  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._insertMarkup(markup);
  }

  /**
   * Remove markup in the dedicated (this._parentElement) DOM container.
   * @return {string} Empty string.
   */
  _clear() {
    this._parentElement.innerHTML = "";
  }
  /**
   * Insert markup in the dedicated (this._parentElement) DOM container.
   * @param {string} markup
   */
  _insertMarkup(markup = ``) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
