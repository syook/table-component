import React, { Component } from 'react';
import {  Table, Label, Menu, Checkbox } from 'semantic-ui-react'
import TableActions from './tableActions';
import BulkActionList from './bulkActionDropdown';
import HeaderSelector from './headerSelector';
import SearchProvider from './searchProvider';

class TableComponent  extends Component {
  constructor(props){
    super(props);

    this.state = {
      columns: props.records.map(record => {
         record.isVisible = true
         return record
      }),
      bulkSelect: false,
      selectedRows: []
    };
  }

  enableBulkSelect = ({checked}) => {
    const selectedRows = checked ? this.props.data.map(i => i._id) : []
    this.setState({bulkSelect: checked, selectedRows})
  }

  updateSelectedRows = ({checked}, row_id) => {
    let selectedRows = this.state.selectedRows
    const rowIndex = selectedRows.indexOf(row_id);
    if (rowIndex > -1 && !checked) selectedRows.splice(rowIndex, 1);
    if (rowIndex === -1) selectedRows.push(row_id);
    this.setState({ selectedRows });
  }

  toggleColumns = (column, {checked}) => {
    let columns = this.state.columns
    let updatedColumn = this.state.columns.find(c => c.heading === column) || {}
    updatedColumn.isVisible = !checked
    this.setState({ columns })
  }

  render(){
    const props = this.props
    const hasBulkActions = props.bulkActions.length
    const visibleColumns = this.state.columns.filter(d => d.isVisible)
    const hiddenColumnCount = this.state.columns.length - visibleColumns.length
    return(
      <SearchProvider {...props}>
        <div>
        <HeaderSelector hiddenColumnCount = {hiddenColumnCount} columns={this.state.columns.filter(c => !props.mandatoryFeilds.includes(c.heading))} toggleColumns={this.toggleColumns}/>
        {hasBulkActions && this.state.selectedRows.length ? <BulkActionList bulkActions={this.props.bulkActions} selectedRows={this.state.selectedRows}/> : null}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{hasBulkActions ? <Checkbox checked={this.state.bulkSelect} onChange={(e, {checked}) => this.enableBulkSelect({checked})}/> : null } Sl.no
              </Table.HeaderCell>
              {visibleColumns.map((column, index) => _TableHeader({column, index}))}
              {props.includeAction ?  <Table.HeaderCell> Actions </Table.HeaderCell> : null}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.data.map((row, index) => (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>
                    {index + 1}
                  </Label>
                  {hasBulkActions ? <Checkbox checked={this.state.selectedRows.includes(row._id)} onChange={(e, {checked}) => this.updateSelectedRows({checked}, row._id)}/> :  null}
                </Table.Cell>
                {visibleColumns.map((column, index) => _TableCell({column, index, data: props.data, row}))}
                {props.includeAction ?
                <Table.Cell>
                  <TableActions actions={props.actionConfig} row={row} />
                </Table.Cell> : null }
              </Table.Row>
              ))
            }
        </Table.Body>
      </Table>
      </div>
      </SearchProvider>
    );
  }
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
