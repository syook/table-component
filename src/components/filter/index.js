import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';

import Filter from './filterComponent';

import { loopFilters } from './utils';

import { filterOperators } from '../constants';

export const FilterContext = React.createContext();

export default class FilterProvider extends PureComponent {
  state = {
    data: [...(this.props.data || [])],
    selectedFilters: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      this.setState({ data: [...(this.props.data || [])] });
    }
  }

  updateSelectedFilters = (attribute, value, index) => {
    const { selectedFilters: filters } = this.state;
    const { columns } = this.props;
    let filterToBeUpdated = filters[index];
    if (index === 1 && attribute === 'predicate') {
      filters.slice(2).forEach(element => (element.predicate = value));
    }
    if (attribute !== 'query') {
      filterToBeUpdated['value'] = undefined;
    }
    filterToBeUpdated[attribute] = value;
    if (attribute === 'attribute') {
      const attrType = (columns.find(i => i.column === filterToBeUpdated[attribute]) || {}).type;
      filterToBeUpdated['type'] = attrType || '';
    }
    if (attribute === 'attribute') {
      filterToBeUpdated.label = (columns.find(i => i.column === value) || {}).heading || value;
      const newQuery = ((filterOperators[filterToBeUpdated.type] || [])[0] || {}).value;
      if (newQuery) filterToBeUpdated.query = newQuery;
    }
    this.setState({ selectedFilters: filters });
  };

  addFilter = () => {
    const { columns } = this.props;

    const firstFilterableAttribute = columns.find(d => d.isFilterable && d.type === 'String');
    const filters = this.state.selectedFilters;
    let newFilter = {};
    let predicate = 'Where';
    const filtersLength = filters.length;
    if (filtersLength >= 2) {
      predicate = filters[1].predicate;
    } else if (filtersLength === 1) {
      predicate = 'And';
    }
    newFilter.predicate = predicate;
    newFilter.attribute = firstFilterableAttribute.column;
    newFilter.label = firstFilterableAttribute.heading;
    const newQuery = ((filterOperators[firstFilterableAttribute.type] || [])[0] || {}).value;
    newQuery ? (newFilter.query = newQuery) : (newFilter.query = 'contains');
    newFilter.value = '';
    newFilter.type = firstFilterableAttribute.type;
    filters.push(newFilter);
    this.setState({ selectedFilters: filters });
  };

  removeFilter = index => {
    const filters = this.state.selectedFilters;
    if (index === 0) index = filters.length - 1;

    filters.splice(index, 1);
    this.setState({ selectedFilters: filters });
    this.applyFilter(filters);
  };

  applyFilter = filters => {
    const selectedFilters = filters && filters.length ? filters : this.state.selectedFilters;
    if (!selectedFilters.length) this.setFilteredData(this.props.data);

    const searchedData = this.props.data || [];
    const filteredData = loopFilters(searchedData, selectedFilters);
    this.setFilteredData(filteredData);
  };

  setFilteredData = (data = []) => this.setState({ data });

  render() {
    const { children, filterableColumns } = this.props;
    return (
      <FilterContext.Provider value={{ ...this.state }}>
        <Filter
          filterableColumns={filterableColumns}
          selectedFilters={this.state.selectedFilters}
          addFilter={this.addFilter}
          removeFilter={this.removeFilter}
          applyFilter={this.applyFilter}
          updateSelectedFilters={this.updateSelectedFilters}
        />
        {children}
      </FilterContext.Provider>
    );
  }
}
