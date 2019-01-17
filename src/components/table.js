import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import TableActions from './tableActions';
import HeaderSelector from './headerSelector';

class TableComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      showColumns: props.headers,
      hideColumns: []
    };
  }

  render(){
    const props = this.props
    return(
      <div>
        <HeaderSelector/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {this.state.showColumns.map((header) => (
                <Table.HeaderCell>{header}</Table.HeaderCell>
              ))}
              {props.includeAction ? <Table.HeaderCell>Actions</Table.HeaderCell> : null}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.data.map((data, index) => (
              <Table.Row>
                {props.records.map((cell) => (
                  <Table.Cell> {props.complexRecords.includes(cell) ? props.findComplexRecords(cell, data[cell])  : data[cell]} </Table.Cell>
                ))}
              {props.includeAction ? <Table.Cell> <TableActions actions={['Edit', 'Delete']}/> </Table.Cell> : null }
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  includeAction: PropTypes.bool.isRequired
}

export default TableComponent;
