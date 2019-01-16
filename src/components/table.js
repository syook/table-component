import React from 'react'
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import TableActions from './tableActions';

const TableComponent = (props) => {
  return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {props.headers.map((header) => (
              <Table.HeaderCell>{header}</Table.HeaderCell>
            ))}
            {props.includeAction ? <Table.HeaderCell>Actions</Table.HeaderCell> : null}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.data.map((data, index) => (
            <Table.Row>
              {props.records.map((cell) => (
                <Table.Cell> {data[cell]} </Table.Cell>
              ))}
            {props.includeAction ? <Table.Cell> <TableActions actions={['Edit', 'Delete']}/> </Table.Cell> : null }
            </Table.Row>
          ))}
        </Table.Body>
    </Table>
  )
}


TableComponent.PropTypes = {
  data: PropTypes.array.isRequired,
  includeAction: PropTypes.bool.isRequired
}

export default TableComponent;
