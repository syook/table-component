import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import moment from 'moment';

export const findColumnOptions = (columns, attr) => {
  const column = columns.find(c => c.column === attr);
  return column.options || [];
};

const queryCondition = ({ attrValue = '', attributeType = '', searchValue = '', query = '' }) => {
  attributeType = (attributeType || '').toLowerCase();
  if (attributeType === 'string') {
    attrValue = (attrValue || '').toLowerCase();
    searchValue = (searchValue || '').toLowerCase();
  }

  if (attributeType === 'date') {
    attrValue =
      attrValue && attrValue instanceof moment
        ? attrValue.startOf('minute')
        : moment(attrValue || '').startOf('minute');
    searchValue =
      searchValue && searchValue instanceof moment
        ? searchValue.startOf('minute')
        : moment(searchValue || '').startOf('minute');
  }

  switch (query) {
    case 'contains':
      return attrValue && attrValue.toLowerCase().includes(searchValue.toLowerCase());
    case 'does not contains':
      return attrValue && !attrValue.toLowerCase().includes(searchValue.toLowerCase());
    case 'is':
      if (attributeType === 'date') {
        return attrValue && attrValue.isSame(searchValue);
      }
      if (attributeType === 'singleselect') {
        return (searchValue || [])[0] && isEqual(attrValue, searchValue[0]);
      }
      if (attributeType === 'boolean') {
        return (attrValue || false) === (searchValue || false);
      }
      return attrValue && isEqual(attrValue, searchValue);
    case 'is not':
      if (attributeType === 'date') {
        return attrValue && !attrValue.isSame(searchValue);
      }
      if (attributeType === 'singleselect') {
        return (searchValue || [])[0] && !isEqual(attrValue, searchValue[0]);
      }
      return attrValue && !isEqual(attrValue, searchValue);
    case 'is empty':
      return isEmpty(attrValue);
    case 'is not empty':
      return !isEmpty(attrValue);

    // Date
    case 'is before':
      return attrValue.isBefore(searchValue);
    case 'is after':
      return attrValue.isAfter(searchValue);
    case 'is on or before':
      return attrValue.isSameOrBefore(searchValue);
    case 'is on or after':
      return attrValue.isSameOrAfter(searchValue);

    // Numbers
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

    // Single-Select
    case 'is any of':
      return searchValue && attrValue && searchValue.includes(attrValue);
    case 'is none of':
      return searchValue && attrValue && !searchValue.includes(attrValue);

    // Multi-select
    case 'has any of':
      return searchValue && attrValue && searchValue.some(v => attrValue.includes(v));
    case 'has none of':
      return searchValue && attrValue && !searchValue.some(v => attrValue.includes(v));

    default:
      return;
  }
};

const filterData = ({ data, attribute, value, query, type }) => {
  return data.filter(d =>
    queryCondition({
      attrValue: d[attribute] || '',
      searchValue: value || '',
      query,
      attributeType: type || '',
    })
  );
};

export const loopFilters = (data, filters) => {
  if (!filters.length) return data;
  if (filters.length === 1) return filterData({ data, ...filters[0] });

  switch (filters[1].predicate) {
    case 'And':
      let andPredicateFilteredData = data;
      filters.forEach(filter => {
        andPredicateFilteredData = filterData({ data: andPredicateFilteredData, ...filter });
      });
      return andPredicateFilteredData;

    case 'Or':
      let orPredicateFilteredData = [];
      filters.forEach(filter => {
        const currentFilterData = filterData({ data, ...filter });
        orPredicateFilteredData = [...new Set([...orPredicateFilteredData, ...currentFilterData])];
      });
      return orPredicateFilteredData;
    default:
      return [];
  }
};
