import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { Table } from 'semantic-ui-react';

import Pagination from './paginationComponent';

import { findPageRange, findCurrentData } from './utils';

export const PaginationContext = React.createContext();

export default class PaginationProvider extends Component {
  constructor(props) {
    super(props);
    const rowsPerPage = { value: 10, label: '10 Items' };
    const rowCount = (props.data || []).length;
    this.state = {
      currentPage: 1,
      name: this.props.name || '',
      numberOfColumns: 16,
      numberOfPages: Math.ceil(rowCount / rowsPerPage.value),
      rowsPerPage,
    };
  }

  componentDidUpdate(prevProps) {
    if ((this.props.data || []).length && !isEqual(this.props.data, prevProps.data)) {
      const rowCount = this.props.data.length;

      let { currentPage = 1, rowsPerPage = { value: 10, label: '10 Items' } } = this.state;
      const numberOfPages = Math.ceil(rowCount / rowsPerPage.value);
      if (numberOfPages < currentPage) currentPage = numberOfPages;

      this.props.resetBulkSelection();
      this.setState({ currentPage, numberOfPages });
    }
  }

  setCurrentPage = currentPage => this.setState({ currentPage });

  onSelectRowsPerPage = (selectedRowsPerPage = { value: 10, label: '10 Items' }) => {
    let { currentPage } = this.state;
    const rowCount = (this.props.data || []).length;

    const numberOfPages = Math.ceil(rowCount / selectedRowsPerPage.value);
    if (numberOfPages < currentPage) currentPage = numberOfPages;

    this.setState({
      numberOfPages,
      rowsPerPage: selectedRowsPerPage,
      currentPage,
    });
  };

  handlePageClick = (_e, data) => {
    this.setCurrentPage(+data.page || 1);
  };

  handleDirectionClick = props => e => {
    const { currentPage } = this.state;
    const direction = e.currentTarget.dataset['direction'];
    let change = 0;
    if (direction === 'LEFT' && currentPage > 1) {
      change = -1;
    } else if (direction === 'RIGHT' && currentPage < props.numberOfPages) {
      change = 1;
    }
    if (change !== 0) {
      this.setCurrentPage(currentPage + change || 1);
    }
  };

  render() {
    let { children, data } = this.props;
    let { currentPage = 1, rowsPerPage = 5 } = this.state;
    let pageRange = findPageRange({ ...this.state });
    data = findCurrentData(data, currentPage, rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage.value;

    return (
      <Table sortable celled padded className='tableStyle left aligned'>
        <PaginationContext.Provider value={{ ...this.state, data, startIndex }}>
          {children}
          <Pagination
            {...this.props}
            {...this.state}
            handleDirectionClick={this.handleDirectionClick}
            handlePageClick={this.handlePageClick}
            onSelectRowsPerPage={this.onSelectRowsPerPage}
            pageRange={pageRange}
            rowCount={(this.props.data || []).length}
            setCurrentPage={this.setCurrentPage}
          />
        </PaginationContext.Provider>
      </Table>
    );
  }
}
