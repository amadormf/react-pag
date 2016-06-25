import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Pagination from '../index.js';

const { describe, it, beforeEach } = global;

const fakeEvent = {
  preventDefault: () => undefined,
  stopPropagation: () => undefined,
};

chai.use(sinonChai);

function getPagination(
  totalResults = 100,
  resultsPerPage = 10,
  maxPagination,
  showPreviousNext,
  showBeginingEnd,
  onChangePage,
  urlPattern = '/search'
) {
  return shallow(
    <Pagination
      totalResults={totalResults}
      resultsPerPage={resultsPerPage}
      maxPagination={maxPagination}
      showPreviousNext={showPreviousNext}
      showBeginingEnd={showBeginingEnd}
      onChangePage={onChangePage}
      urlPattern={urlPattern}
    />
  );
}

function getPaginationWithListener(onChangePage) {
  return getPagination(100, 10, null, true, true, onChangePage);
}

function getPaginationForCheckUrl(urlPattern) {
  return getPagination(100, 10, null, true, true, null, urlPattern);
}

describe('Render pagination', () => {
  it('Render the correct number of buttons', () => {
    const wrapper = getPagination();
    expect(wrapper.find('a')).to.have.length(10);
    expect(wrapper.find('.Pagination-element')).to.have.length(10);
  });
  it('Check maxPagination limit', () => {
    const wrapper = getPagination(100, 10, 5);
    expect(wrapper.find('a')).to.have.length(5);
  });
  it('Render the next and previous buttons', () => {
    const wrapper = getPagination(100, 10, null, true);
    expect(wrapper.find('a')).to.have.length(12);
    expect(wrapper.find('.Pagination-element--specialButton')).to.have.length(2);
  });
  it('Render the first and last buttons', () => {
    const wrapper = getPagination(100, 10, null, false, true);
    expect(wrapper.find('a')).to.have.length(12);
    expect(wrapper.find('.Pagination-element--specialButton')).to.have.length(2);
  });
});
describe('Actions over pagination', () => {
  let onChangePage;
  let wrapper;
  beforeEach(() => {
    onChangePage = sinon.spy();
    wrapper = getPaginationWithListener(onChangePage);
  });

  it('When click on some page, onChangePage is called', () => {
    const firstPage = wrapper.findWhere(node => node.props().children === 1);
    firstPage.simulate('click', fakeEvent);
    expect(onChangePage).to.be.callCount(1);
    expect(onChangePage).to.be.calledWith({ page: 1 });
  });

  it('when click on first page or last page, onChangePage is called', () => {
    const goToFirstPage = wrapper.findWhere(node => node.props().children === '«');
    goToFirstPage.simulate('click', fakeEvent);
    expect(onChangePage).to.be.callCount(1);
    expect(onChangePage).to.be.calledWith({ page: 1 });

    const goToLastPage = wrapper.findWhere(node => node.props().children === '»');
    goToLastPage.simulate('click', fakeEvent);
    expect(onChangePage).to.be.callCount(2);
    expect(onChangePage).to.be.calledWith({ page: 10 });
  });

  it('When click on next page or previous page, onChangePage is called', () => {
    const gotToNextPage = wrapper.findWhere(node => node.props().children === '›');
    gotToNextPage.simulate('click', fakeEvent);
    expect(onChangePage).to.be.callCount(1);
    expect(onChangePage).to.be.calledWith({ page: 2 });

    const goToPreviousPage = wrapper.findWhere(node => node.props().children === '‹');
    goToPreviousPage.simulate('click', fakeEvent);
    expect(onChangePage).to.be.callCount(2);
    expect(onChangePage).to.be.calledWith({ page: 1 });
  });
});

describe('Check the urls of href', () => {
  it('Check the actual url with page paremeter', () => {
    const wrapper = getPaginationForCheckUrl();
    const firstNode = wrapper.find('a').first();
    expect(firstNode.props().href).is.equal('/search/1/10');
  });
  it('Check with url pattern', () => {
    const wrapper = getPaginationForCheckUrl('/%page%/search/%rowsperpage%/');
    const firstNode = wrapper.find('a').first();
    expect(firstNode.props().href).is.equal('/1/search/10/');
  });
});
