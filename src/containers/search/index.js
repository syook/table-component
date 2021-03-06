import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import SearchComponent from '../../components/search';

import { getSearchTextFilteredData } from './utils';

export const SearchContext = React.createContext();

export default class SearchProvider extends Component {
  state = { searchText: '', data: [...(this.props.data || [])] };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      this.setState({ data: [...(this.props.data || [])] });
    }
  }

  search = searchText => {
    if (!searchText || isEmpty(this.props.searchKeys)) {
      this.setState({ data: [...(this.props.data || [])] });
    }

    const searchedObjects = getSearchTextFilteredData({
      data: this.props.data,
      searchKeys: this.props.searchKeys,
      searchText,
    });

    this.setState({ data: searchedObjects });
  };

  onChangeSearchText = e => {
    const searchText = (e.target.value || '').trimStart().toLowerCase();
    const currentSearchText = this.state.searchText;
    if (searchText === currentSearchText) return;

    this.setState({ searchText });
    this.search(searchText);
  };

  render() {
    return (
      <SearchContext.Provider value={{ ...this.state }}>
        <SearchComponent
          name={this.props.name}
          onChangeSearchText={this.onChangeSearchText}
          searchText={this.state.searchText}
        />
        {!(this.state.data || []).length && (
          <div className="noRecordsDiv">
            {!(this.props.data || []).length ? `No ${this.props.name || 'data'} to Display` : 'No Results Found'}
          </div>
        )}
        {!!(this.state.data || []).length && this.props.children}
      </SearchContext.Provider>
    );
  }
}
