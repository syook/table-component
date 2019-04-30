import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableHeader = ({ column, index, sortProps }) => {
  const { isSortable } = column;
  const isAscendingDisabled =
    isSortable && sortProps.columnName && sortProps.columnName === column.column && sortProps.direction === 'ascending';
  const isDescendingDisabled =
    isSortable &&
    sortProps.columnName &&
    sortProps.columnName === column.column &&
    sortProps.direction === 'descending';

  return (
    <Table.HeaderCell
      key={`table-header-cell-${index}`}
      onClick={
        isSortable &&
        sortProps.handleSort({
          ...column,
          direction: sortProps.direction === 'ascending' ? 'descending' : 'ascending',
        })
      }>
      {isSortable && (
        <>
          <Icon name="arrow up" color={isAscendingDisabled ? 'blue' : 'grey'} />
          <Icon name="arrow down" color={isDescendingDisabled ? 'blue' : 'grey'} />
        </>
      )}
      {column.heading}
    </Table.HeaderCell>
  );
};

export default TableHeader;
