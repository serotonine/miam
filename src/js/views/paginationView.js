import icons from "url:../../img/icons.svg";
// Parent Class
import View from "./View";
// Import constants
import { RESULTS_BY_PAGE } from "../config";

class PaginationView extends View {
  _numPage;
  _currentPage;
  //// HANDLER ////
  handlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const currBtn = e.target.closest(".pagination__btn");
      if (!currBtn) {
        return;
      }
      const { pageIndex } = currBtn.dataset;
      handler(+pageIndex);
    });
  }
  //// MARKUP ////
  _renderMarkup() {
    this._numPage = Math.ceil(this._datas.result.length / RESULTS_BY_PAGE);
    this._currentPage = this._datas.page;
    // Page 1 and other pages.
    if (this._currentPage === 1 && this._numPage > 1) {
      return `
      <button class="btn--inline pagination__btn pagination__btn--next" data-page-index ="${
        this._currentPage + 1
      }" >
        <span>Page ${this._currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      ${this._renderBtnCenter()}`;
    }
    // Last page
    if (this._currentPage === this._numPage) {
      return `${this._renderBtnCenter()}
      <button class="btn--inline pagination__btn pagination__btn--prev"  data-page-index ="${
        this._currentPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currentPage - 1}</span>
      </button>`;
    }
    return `<button class="btn--inline pagination__btn pagination__btn--prev" data-page-index ="${
      this._currentPage - 1
    }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._currentPage - 1}</span>
      </button>
      ${this._renderBtnCenter()}
      <button class="btn--inline pagination__btn pagination__btn--next"  data-page-index ="${
        this._currentPage + 1
      }">
        <span>Page ${this._currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
  _renderBtnCenter() {
    return `<div class="pagination--center" >
        <span>Page ${this._currentPage}&#8239;/&#8239;${this._numPage}</span>
      </div>`;
  }
}
export default paginationView = new PaginationView(".pagination");
