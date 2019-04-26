import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

export const findStartPage = (numberOfPages, currentPage) => {
  let startPage;
  if (numberOfPages <= 3 || currentPage === 1) {
    startPage = 1;
  } else if (currentPage === numberOfPages) {
    startPage = currentPage - 2;
  } else {
    startPage = currentPage - 1;
  }
  return startPage;
};

export const findPageRange = (numberOfPages, startPage) => {
  return Array.from(new Array(Math.min(3, numberOfPages)), (x, i) => i + startPage);
};

// currentdata in paginations
export const findCurrentData = (searchedDataFound, currentPage, rowsPerPage) => {
  if (searchedDataFound.length < rowsPerPage.value) {
    return searchedDataFound;
  }
  return searchedDataFound.slice((currentPage - 1) * rowsPerPage.value, currentPage * rowsPerPage.value);
};

// search for a query in an object
export const searchObj = (obj, query, searchKeys) => {
  let found = false;
  // console.log(obj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(searchKeys, key)) {
      const value = obj[key];
      // console.log(key, value, typeof value);
      if (typeof value === 'object') {
        found = searchObj(value, query, searchKeys);
        if (found) {
          return found;
        }
      } else if (
        value
          .toString()
          .toLowerCase()
          .indexOf(query) !== -1
      ) {
        found = true;
        // console.log('property', key, 'value', value);
        return found;
      }
    } // end if key is searchable
  } // end for every key in object
  return found;
}; // end of searchObj

export const createPropertyOption = (valueProperty, labelProperty) => option => {
  return {
    value: option[valueProperty || 'id'],
    label: option[labelProperty || 'name'],
  };
};

export const queryCondition = ({ attrValue = '', attributeType = '', searchValue = '', query = '' }) => {
  if (attributeType === 'String') {
    attrValue = (attrValue || '').toLowerCase();
    searchValue = (searchValue || '').toLowerCase();
  }

  if (attributeType === 'Date') {
    attrValue = attrValue instanceof moment ? attrValue : moment(attrValue || '').startOf('day');
    searchValue = searchValue instanceof moment ? searchValue : moment(searchValue || '').startOf('day');
  }

  switch (query) {
    case 'contains':
      return attrValue && attrValue.toLowerCase().includes(searchValue.toLowerCase());
    case 'does not contains':
      return attrValue && !attrValue.toLowerCase().includes(searchValue.toLowerCase());
    case 'is':
      if (attributeType === 'Date') {
        return attrValue && attrValue.isSame(searchValue);
      }
      return attrValue && isEqual(attrValue, searchValue);
    case 'is not':
      if (attributeType === 'Date') {
        return attrValue && !attrValue.isSame(searchValue);
      }
      return attrValue && !isEqual(attrValue, searchValue);
    case 'is empty':
      return isEmpty(attrValue);
    case 'is not empty':
      return !isEmpty(attrValue);
    case 'is before':
      return attrValue.isBefore(searchValue);
    case 'is after':
      return attrValue.isAfter(searchValue);
    case 'is on or before':
      return attrValue.isSameOrBefore(searchValue);
    case 'is on or after':
      return attrValue.isSameOrAfter(searchValue);
    case '=':
      return +attrValue === +searchValue;
    case '≠':
      return +attrValue !== +searchValue;
    case '<':
      return +attrValue < +searchValue;
    case '≤':
      return +attrValue <= +searchValue;
    case '>':
      return +attrValue > +searchValue;
    case '≥':
      return +attrValue >= +searchValue;

    default:
      return;
  }
};

export const filterFunction = ({ data, attribute, value, query, type }) => {
  const val = data.filter(d =>
    queryCondition({
      attrValue: d[attribute] || '',
      searchValue: value || '',
      query,
      attributeType: type || '',
    })
  );
  return val;
};

export const loopFilters = (data, filters) => {
  if (!filters.length) return data;
  if (filters.length === 1) {
    return filterFunction({ data, ...filters[0] });
  } else {
    if (filters[1].predicate === 'And') {
      let filteredData = data;
      filters.forEach((filter, index) => {
        filteredData = filterFunction({ data: filteredData, ...filter });
      });
      return filteredData;
    } else if (filters[1].predicate === 'Or') {
      let filteredData = [];
      filters.forEach((filter, index) => {
        const indexedFilter = filterFunction({ data, ...filter });
        filteredData = [...filteredData, ...indexedFilter];
      });
      return filteredData;
    }
  }
};

export const findColumnOptions = (columns, attr) => {
  const column = columns.find(c => c.column === attr);
  return column.options || [];
};
