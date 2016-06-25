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
  };

  static defaultProps = {
    onChangePage: null,
    actualPage: 1,
    maxPagination: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      pagination: this.recalculatePagination(props),
    };
  }
  /**
   * LIFECYLE
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      pagination: this.recalculatePagination(nextProps),
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.actualPage !== this.props.actualPage
      || nextProps.totalResults !== this.props.totalResults
      || nextProps.resultsPerPage !== this.props.resultsPerPage
    ) {
      return true;
    }
    return false;
  }


  /**
   * END LIFECYCLE
   */

  _getUrl() {
    // return queryString.stringify(parameters);
  }

  recalculatePagination(props) {
    const pagination = new PaginationTemplate(
      props.urlPattern,
      props.actualPage,
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
    e.preventDefault();
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
      'Pagination-element--selected': pageOption.actualPage && pageOption.specialButton,
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
    return (
      <div className="Pagination">
        {this._getPages()}
      </div>
    );
  }
}
