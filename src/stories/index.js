import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Pagination from '../index';
import '../styles/Pagination.styl';

storiesOf('Button', module)
  .add('Simple example', () => (
    <Pagination
      totalResults={100}
      resultsPerPage={10}
      urlPattern="search"
      onChangePage= {action('Change page')}
    />
  ))
  .add('Navigate on click', () => (
    <div>
      <Pagination
        totalResults={100}
        resultsPerPage={10}
        urlPattern="search"
        onChangePage= {action('Change page')}
        preventNavigate={false}
      />
      <div
        style={{ fontSize: '.8em' }}
      >
        *If you click in a page, then you have to refresh the page
      </div>
    </div>
  ))
  .add('Show begining and end', () => (
    <Pagination
      totalResults={100}
      resultsPerPage={10}
      urlPattern="search"
      onChangePage= {action('Change page')}
      showBeginingEnd
    />
  ))
  .add('Show next and previous', () => (
    <Pagination
      totalResults={100}
      resultsPerPage={10}
      urlPattern="search"
      onChangePage= {action('Change page')}
      showPreviousNext
    />
  ))
  .add('Change initialPage', () => (
    <Pagination
      totalResults={100}
      resultsPerPage={10}
      urlPattern="search"
      onChangePage={action('Change page')}
      initialPage={3}
    />
  ))
  .add('Change from outside the actual page', () => (
    <TestActualPage />
  ))
  .add('Send a custom class to component', () => (
    <Pagination
      totalResults={100}
      resultsPerPage={10}
      urlPattern="search"
      onChangePage={action('Change page')}
      className="CustomPagination"
    />
  ))
;

class TestActualPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualPage: 1,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(e) {
    this.setState({
      actualPage: parseInt(e.target.value, 10),
    });
  }

  render() {
    return (
      <div>
        <label>Actual Page: </label>
        <input type="text" onChange={this.handleChangePage} />
        <Pagination
          totalResults={100}
          resultsPerPage={10}
          urlPattern="search"
          onChangePage={action('Change page')}
          actualPage={this.state.actualPage}
        />
      </div>
    );
  }
}
