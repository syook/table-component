import React, {Component} from 'react';
import TableComponent from '../../components/newTable';
import OldTableComponent from '../../components/table';
import { fetchMenuItems, deleteMenuItems } from './reducer';
import { connect } from 'react-redux';

class MenuItemList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchMenuItems())
  }

  findComplexRecords(attr, value){
    switch (attr) {
      case 'availablity':
        return (value || []).join(',');
      default:

    }
  }

  onDelete = (ids) => {
    this.props.dispatch(deleteMenuItems(ids))
  }

  tableConfig = [
    {
      heading: 'Name',
      cell: ({row}) => row.name,
      isSortable: true,
    },
    {
      heading: 'Description',
      cell: ({row}) => row.desc,
      isSortable: true
    },
    {
      heading: 'Category',
      cell: ({row}) => row.category,
      isSortable: true
    },
    {
      heading: 'Availablity',
      cell: ({row}) => row.availablity,
      isSortable: true
    },
    {
      heading: 'Expertised',
      cell: ({row}) => {
         return row.isExpertised ? 'true' : 'false'
      },
      isSortable: true
    },
    {
      heading: 'Feasible',
      cell: ({row}) => row.isFeasible ? 'true' : 'false',
      isSortable: true
    },
  ]

  actionConfig = [
    {
      action: 'Edit',
      show: (row) => {
       return true
      },
      function: this.onShow
    },
    {
      action: 'Delete',
      show: (row) => true,
      function: this.onShow
    }
  ]

  render(){
    const {menuItems} = this.props
    return(
      <div>
        MenuItem list
        <TableComponent
          data={menuItems} records={this.tableConfig}
          mandatoryFeilds={['Name']} includeAction={true}
          actionConfig={this.actionConfig}
          bulkActions={[{action: 'delete', function: this.onDelete}]}
         />
          <OldTableComponent data={menuItems}
          records={[{header: 'Name', column: 'name', sortable: true},{header: 'Description', column: 'desc', sortable: true}, {header: 'Category', column: 'category'}, {header: 'Availablity', column: 'availablity'},{header: 'Expertised', column: 'isExpertised'}, {header: 'Feasible', column: 'isFeasible'}, {header: 'Actions', column: 'action'}]} includeAction complexRecords={['availablity']} mandatoryFeilds={['name']} searchKeys={{name: true, desc: true}} findComplexRecords={this.findComplexRecords} name="Menuitems" defaultSortable='name' bulkActions={[{action: 'delete', function: this.onDelete}]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({menuItems}) => ({menuItems})

export default connect(
    mapStateToProps,
  )(MenuItemList);
