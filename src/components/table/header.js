import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ column, index, sortProps }) => {
  const { isSortable } = column;
  const isAscendingDisabled =
    isSortable && sortProps.column && sortProps.column === column.column && sortProps.direction === 'ascending';
  const isDescendingDisabled =
    isSortable && sortProps.column && sortProps.column === column.column && sortProps.direction === 'descending';
  return (
    <Table.HeaderCell
      key={`table-header-cell-${index}`}
      // sorted={column.column === sortProps.column ? sortProps.direction : null}
      onClick={
        isSortable &&
        sortProps.handleSort(
          column.column,
          sortProps.direction === 'ascending' ? 'descending' : 'ascending',
          column.type
        )
      }>
      {isSortable && (
        <>
          <Icon
            name="arrow up"
            color={isAscendingDisabled ? 'blue' : 'grey'}
            disabled={isAscendingDisabled}
            // onClick={sortProps.handleSort(column.column, 'ascending')}
          />
          <Icon
            name="arrow down"
            color={isDescendingDisabled ? 'blue' : 'grey'}
            // disabled={isDescendingDisabled}
            // onClick={sortProps.handleSort(column.column, 'descending')}
          />
        </>
      )}
      {column.heading}
    </Table.HeaderCell>
  );
};

export default TableHeader;
