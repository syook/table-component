import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';

export const SortContext = React.createContext();

export default class SortProvider extends PureComponent {
  state = {
    column: null,
    data: [...(this.props.data || [])],
    direction: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data && !isEqual(this.props.data, prevProps.data)) {
      this.setState({ data: [...(this.props.data || [])] });
    }
  }

  fetchSortedData = ({ data = [], columnType, columnName }) => {
    switch (columnType.toLowerCase()) {
      case 'date':
        return data.sort((a, b) => {
          const date1 = new Date(a[columnName]);
          const date2 = new Date(b[columnName]);
          return date1 - date2;
        });

      case 'number':
        return data.sort((a, b) => +a[columnName] - +b[columnName]);

      default:
        return sortBy(data, [columnName]);
    }
  };

  handleSort = (clickedColumn, clickedDirection = 'ascending', columnType = 'String') => () => {
    if (!clickedColumn) return;
    const { column, data } = this.state;

    if (column !== clickedColumn) {
      const sortedData = this.fetchSortedData({ data, columnType, columnName: clickedColumn });
      this.setState({
        column: clickedColumn,
        data: sortedData,
        direction: clickedDirection,
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: clickedDirection,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <SortContext.Provider value={{ handleSort: this.handleSort, ...this.state }}>{children}</SortContext.Provider>
    );
  }
}
