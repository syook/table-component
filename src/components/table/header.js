import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import './header.css';

const TableHeader = ({ column, index, sortProps }) => {
  const { isSortable, isResizable = false } = column;
  const isAscendingDisabled =
    isSortable && sortProps.columnName && sortProps.columnName === column.column && sortProps.direction === 'ascending';
  //   const isDescendingDisabled =
  //     isSortable &&
  //     sortProps.columnName &&
  //     sortProps.columnName === column.column &&
  //     sortProps.direction === 'descending';
  return (
    <Table.HeaderCell
      className={`sort-table ${isResizable ? 'resizable' : ''}`}
      key={`table-header-cell-${index}`}
      onClick={
        isSortable &&
        sortProps.handleSort({
          ...column,
          direction: sortProps.direction === 'ascending' ? 'descending' : 'ascending',
        })
      }>
      {isSortable && (
        <Icon
          name={isAscendingDisabled ? 'arrow up ' : 'arrow up down'}
          color={isAscendingDisabled ? 'blue' : 'grey'}
        />
      )}
      {column.heading}
    </Table.HeaderCell>
  );
};

export default TableHeader;
