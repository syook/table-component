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
      className={`sort-table ${!disabled && isResizable ? 'resizable' : ''}`}
      key={`table-header-cell-${index}`}
      onClick={
        isSortable
          ? sortProps.handleSort({
              ...column,
              direction: sortProps.direction === 'ascending' ? 'descending' : 'ascending',
            })
          : undefined
      }>
      {/* // {isSortable && !disabled && sortProps.columnName && sortProps.columnName === column.column && ( */}

      {column.heading}
      {isSortable && !disabled && sortProps.columnName && sortProps.columnName === column.column ? (
        <sup>
          <Icon
            style={{ fontSize: '11px', marginLeft: 5 }}
            className={isAscendingDisabled ? 'arrowUp' : 'arrowDown'}
            name="arrow up"
            color={'blue'}
          />
        </sup>
      ) : (
        <sup>
          <Icon color="grey" name="arrow up" style={{ fontSize: '11px', marginRight: 0 }} />
          <Icon color="grey" name="arrow down" style={{ fontSize: '11px' }} />
        </sup>
      )}
    </Table.HeaderCell>
  );
};

export default TableHeader;
