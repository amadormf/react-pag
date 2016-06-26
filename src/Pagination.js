import React, { PropTypes } from 'react';
import PaginationTemplate from 'pagination-template';
import classNames from 'classnames';

export default class Pagination extends React.Component {
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
  };

  static defaultProps = {
    onChangePage: null,
    maxPagination: 0,
    preventNavigate: true,
    useDefaultStyles: true,
    initialPage: 1,
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
    const actualPage = (this._calculateActualPage(nextProps));
    this.setState({
      actualPage,
      pagination: this._recalculatePagination(nextProps, actualPage),
    });
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
    const classes = classNames({
      'Pagination-element': true,
      'Pagination-element--selected': pageOption.actualPage && !pageOption.specialButton,
      'Pagination-element--specialButton': !!pageOption.specialButton,
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
            case 'first': return '«';
            case 'previous': return '‹';
            case 'next': return '›';
            case 'last': return '»';
            default: return pageOption.index;
          }
        })()}
      </a>
    );
  }

  render() {
    const classes = classNames('Pagination', this.props.className);
    return (
      <div className={classes}>
        {this._getPages()}
      </div>
    );
  }
}
