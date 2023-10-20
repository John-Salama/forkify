import View from './View.js';
import icons from 'url:../../img/icons.svg';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'next');
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'prev');
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton(curPage, 'prev') +
        this._generateMarkupButton(curPage, 'next')
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(curPage, type) {
    if (type === 'prev') {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    } else {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new paginationView();
