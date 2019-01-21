import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import TableActions from './tableActions';
import HeaderSelector from './headerSelector';
import TablePagination from './tablePagination';
import { findPageRange, findStartPage } from './utils'

class TableComponent extends Component {
  constructor(props){
    super(props);
    const rowsPerPage = { value: 10, label: '10 Items' };
    this.state = {
      columns: props.records.map(m => {
        const obj = m
         obj['value'] = true
         return obj
       }),
       currentPage: 1,
       numberOfPages: Math.ceil(
        props.data.length / rowsPerPage.value
      ),
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
    const hiddenColumnCount = this.state.columns.filter(d => !d.value).length
    const startPage = findStartPage(
      this.state.numberOfPages,
      this.state.currentPage
    );
    const pageRange = findPageRange(this.state.numberOfPages, startPage);
    return(
      <div>
        <HeaderSelector hiddenColumnCount = {hiddenColumnCount} columns={this.state.columns.filter(c => !props.mandatoryFeilds.includes(c.column))} toggleColumns={this.toggleColumns}/>
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
          <TablePagination
            pageRange={pageRange}
            currentPage={this.state.currentPage}
            numberOfPages={this.state.numberOfPages}
            numberOfColumns="3"
            name={this.props.name || 'table'}
            rowCount={this.props.data.length}
            rowsPerPage={props.rowsPerPage}
            onSelectRowsPerPage={this.props.onSelectRowsPerPage}
            setTableCurrentPage={this.props.setTableCurrentPage}
            />
        </Table>
      </div>
    );
  }
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  includeAction: PropTypes.bool.isRequired
}

TableComponent.defaultProps = {
  complexRecords: []
}

export default TableComponent;
