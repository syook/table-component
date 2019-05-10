import './header.css';

import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ column, index, sortProps, disabled }) => {
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
        isSortable && !disabled
          ? sortProps.handleSort({
              ...column,
              direction: sortProps.direction === 'ascending' ? 'descending' : 'ascending',
            })
          : undefined
      }>
      {isSortable && !disabled && sortProps.columnName && sortProps.columnName === column.column && (
        <Icon name={isAscendingDisabled ? 'arrow up' : 'arrow up down'} color="blue" />
      )}
      {column.heading}
    </Table.HeaderCell>
  );
};

export default TableHeader;
