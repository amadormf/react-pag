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

  getUrl() {
    // return queryString.stringify(parameters);
  }

  recalculatePagination(props) {
    const pagination = new PaginationTemplate(
      'search_react.html',
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
    for (const pageOption of this.state.pagination) {
      console.log(pageOption);
    }
  }

  _getPage() {

  }

  render() {
    const url = this.getUrl();
    let pages = [];
    console.log(this.state.pagination);
    for (let i = 0; i < this.state.pagination.length; ++i) {
      const pageOption = this.state.pagination[i];
      const classes = classNames({
        'Pagination-element': true,
        'Pagination-element--selected': pageOption.actualPage && pageOption.specialButton,
        'Pagination-element--specialButton': !!pageOption.specialButton,
      });
      const onclick = this.clickPage.bind(this, pageOption.index);
      const element = (
        <a href={`/search?${url}&page=${pageOption.index}`}
          className={classes}
          onClick={onclick}
          key={i}
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
      pages.push(element);
    }
    return (
      <div className="Pagination">
        {pages}
      </div>
    );
  }
}
