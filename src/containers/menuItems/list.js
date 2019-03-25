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
      sortable: true
    },
    {
      heading: 'Description',
      cell: ({row}) => row.desc,
      sortable: true
    },
    {
      heading: 'Category',
      cell: ({row}) => row.category,
      sortable: true
    },
    {
      heading: 'Availablity',
      cell: ({row}) => row.availablity,
      sortable: true
    },
    {
      heading: 'Expertised',
      cell: ({row}) => {
         return row.isExpertised ? 'true' : 'false'
      },
      sortable: true
    },
    {
      heading: 'Feasible',
      cell: ({row}) => row.isFeasible ? 'true' : 'false',
      sortable: true
    },
    // {
    //   heading: 'Actions',
    //   cell: ({data}) => <span> 'test' </span>,
    //   sortable: true
    // },
  ]

  actionConfig = [
    // {
    //   action: 'Show',
    //   show: ({row}) => true,
    //   function: this.onShow
    // },
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
