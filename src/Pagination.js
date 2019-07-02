import React from 'react';
import PropTypes from 'prop-types';
import PaginationTemplate from 'pagination-template';
import classNames from 'classnames';

export default class Pagination extends React.Component {
  static FIRST = 'first';
  static PREVIOUS = 'previous';
  static NEXT = 'next';
  static LAST = 'last';

  static propTypes = {
    totalResults: PropTypes.number.isRequired,
    resultsPerPage: PropTypes.number.isRequired,
    actualPage: PropTypes.number,
    maxPagination: PropTypes.number,
    onChangePage: PropTypes.func,
    showBeginingEnd: PropTypes.bool,
    showPreviousNext: PropTypes.bool,
    urlPattern: PropTypes.string,
    preventNavigate: PropTypes.bool,
    className: PropTypes.string,
    initialPage: PropTypes.number,
    styles: PropTypes.object,
  };

  static defaultProps = {
    onChangePage: null,
    maxPagination: 0,
    preventNavigate: true,
    useDefaultStyles: true,
    initialPage: 1,
    styles: {},
  };

  constructor(props) {
    super(props);
    const actualPage = (this.props.actualPage || this.props.initialPage);
    this.state = {
      actualPage,
      pagination: this._recalculatePagination(props, actualPage),
    };
  }

  /**
   * LIFECYLE
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.actualPage && nextProps.actualPage !== this.state.actualPage) {
      const actualPage = this._calculateActualPage(nextProps);
      this.setState({
        actualPage,
        pagination: this._recalculatePagination(nextProps, actualPage),
      });
    } else {
      this.setState({
        pagination: this._recalculatePagination(nextProps, this.state.actualPage),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.actualPage !== this.props.actualPage
      || nextState.actualPage !== this.state.actualPage
      || nextProps.totalResults !== this.props.totalResults
      || nextProps.resultsPerPage !== this.props.resultsPerPage
    ) {
      return true;
    }
    return false;
  }

  _calculateActualPage(props) {
    if (props.actualPage && props.actualPage > -1) {
      return props.actualPage;
    }
    return this.state.actualPage;
  }

  _recalculatePagination(props, actualPage) {
    const pagination = new PaginationTemplate(
      props.urlPattern,
      actualPage,
      props.totalResults,
      props.resultsPerPage,
      {
        maxPagination: props.maxPagination,
        showBeginingEnd: props.showBeginingEnd,
        showPreviousNext: props.showPreviousNext,
      }
    );
    return pagination.getPagination();
  }


  clickPage(page, e) {
    if (this.props.preventNavigate) {
      e.preventDefault();
    }
    this.setState({
      actualPage: page,
      pagination: this._recalculatePagination(this.props, page),
    });
    if (this.props.onChangePage && typeof(this.props.onChangePage) === 'function') {
      this.props.onChangePage({ page });
    }
  }

  _getPages() {
    return this.state.pagination.map((pageOption, index) => this._getPage(pageOption, index));
  }

  _getPage(pageOption, index) {
    const { styles, totalResults, resultsPerPage } = this.props;
    const { actualPage } = this.state;
    const lastPage = Math.ceil(totalResults / resultsPerPage);
    const classes = classNames({
      'Pagination-element--specialButton-next-page': actualPage === lastPage
        && pageOption.specialButton && pageOption.specialButton === Pagination.NEXT,
      'Pagination-element--specialButton-previous-page': actualPage === 1
        && pageOption.specialButton && pageOption.specialButton === Pagination.PREVIOUS,
      'Pagination-element--specialButton-first-page': actualPage === 1
        && pageOption.specialButton && pageOption.specialButton === Pagination.FIRST,
      'Pagination-element--specialButton-last-page': actualPage === lastPage
        && pageOption.specialButton && pageOption.specialButton === Pagination.LAST,
      'Pagination-element': true,
      [styles['Pagination-element']]: !!styles['Pagination-element'],
      'Pagination-element--selected': pageOption.actualPage && !pageOption.specialButton,
      [styles['Pagination-element--selected']]:
        pageOption.actualPage
          && !pageOption.specialButton
          && !!styles['Pagination-element--selected'],
      'Pagination-element--specialButton': !!pageOption.specialButton,
      [styles['Pagination-element--specialButton']]:
        !!pageOption.specialButton && !!styles['Pagination-element--specialButton'],


    });

    const onclick = this.clickPage.bind(this, pageOption.index);
    return (
      <a href={pageOption.url}
        className={classes}
        onClick={onclick}
        key={index}
      >
        {(() => {
          switch (pageOption.specialButton) {
            case Pagination.FIRST: return '«';
            case Pagination.PREVIOUS: return '‹';
            case Pagination.NEXT: return '›';
            case Pagination.LAST: return '»';
            default: return pageOption.index;
          }
        })()}
      </a>
    );
  }

  render() {
    const { className, styles } = this.props;
    const classes = classNames('Pagination', className, styles.Pagination);
    return (
      <div className={classes}>
        {this._getPages()}
      </div>
    );
  }
}
