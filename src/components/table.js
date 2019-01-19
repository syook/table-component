import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import TableActions from './tableActions';
import HeaderSelector from './headerSelector';

class TableComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns: props.records.map(m => {
        const obj = m
         obj['value'] = true
         return obj
       })
    };
  }

  toggleColumns = (column, {checked}) => {
    let columns = this.state.columns
    let updatedColumn = this.state.columns.find(c => c.header === column) || {}
    updatedColumn.value = !checked
    this.setState({ columns })
  }

  render(){
    const props = this.props
    const visibleColumns = this.state.columns.filter(d => d.value)
    return(
      <div>
        <HeaderSelector columns={this.state.columns.filter(c => !props.mandatoryFeilds.includes(c.column))} toggleColumns={this.toggleColumns}/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {visibleColumns.map(c => c.header).map((header) => (
                <Table.HeaderCell>{header}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.data.map((data, index) => (
              <Table.Row>
                {visibleColumns.map(c => c.column).map((cell) => (
                  cell !== 'action' ?
                  <Table.Cell> {props.complexRecords.includes(cell) ? props.findComplexRecords(cell, data[cell])  : data[cell]} </Table.Cell> : <Table.Cell> <TableActions actions={['Edit', 'Delete']}/> </Table.Cell>
                ))}
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
