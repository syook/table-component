import React from 'react';
import {  Table, Label, Menu } from 'semantic-ui-react'
import TableActions from './tableActions';

const TableComponent = (props) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {props.records.map((column, index) => _TableHeader({column, index}))}
          {props.includeAction ?  <Table.HeaderCell> Actions </Table.HeaderCell> : null}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.data.map((row, index) => (
          <Table.Row>
            {props.records.map((column, index) => _TableCell({column, index, data: props.data, row}))}
            {props.includeAction ?
            <Table.Cell>
              <TableActions actions={props.actionConfig} row={row} />
            </Table.Cell> : null }
          </Table.Row>
          ))
        }
    </Table.Body>
  </Table>
  )
}

const _TableHeader = ({column, index}) => {
  return <Table.HeaderCell
          key={`table-header-cell-${index}`}
          // onClick={() => updateDefaultSortable(column)}
          >
           {column.heading}
        </Table.HeaderCell>
}

const _TableCell = ({column, index, data, row}) => {
  return (
    <Table.Cell
            key={`table-header-cell-${index}`}
          >
            {column.cell({row})}
    </Table.Cell>
  )
}

export default TableComponent;
