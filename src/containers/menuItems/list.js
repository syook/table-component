import React, { Component } from 'react';
import TableComponent from '../../components/newTable';
// import OldTableComponent from '../../components/table';
import { fetchMenuItems, deleteMenuItems } from './reducer';
import { connect } from 'react-redux';

class MenuItemList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchMenuItems());
  }

  findComplexRecords(attr, value) {
    switch (attr) {
      case 'availablity':
        return (value || []).join(',');
      default:
    }
  }

  onDelete = ids => {
    this.props.dispatch(deleteMenuItems(ids));
  };

  onShow = args => {
    console.log(args);
  };

  tableConfig = [
    {
      heading: 'Name',
      column: 'name',
      type: 'String',
      cell: ({ row }) => row.name,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
    },
    {
      heading: 'Description',
      column: 'desc',
      type: 'String',
      cell: ({ row }) => row.desc,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
    },
    // {
    //   heading: 'Category',
    //   column: 'category',
    //   type: 'Select',
    //   cell: ({ row }) => row.category,
    //   options: [{ value: 'Electrical', label: 'Electrical' }, { value: 'Mechanical', label: 'Mechanical' }],
    //   isSortable: true,
    //   isSearchable: true,
    //   isFilterable: true,
    // },
    {
      heading: 'Expertised',
      column: 'isExpertised',
      type: 'Boolean',
      cell: ({ row }) => {
        return row.isExpertised ? 'true' : 'false';
      },
      isSortable: true,
      isSearchable: false,
      isFilterable: true,
    },
    {
      heading: 'Created at',
      column: 'createdAt',
      cell: ({ row }) => row.createdAt,
      type: 'Date',
      isSortable: true,
      isSearchable: false,
      isFilterable: true,
    },
  ];

  actionConfig = [
    {
      action: 'Show',
      show: _row => true,
      function: this.onShow,
      icon: 'eye',
    },
    {
      action: 'Edit',
      show: _row => true,
      function: this.onShow,
      icon: 'pencil',
    },
    {
      action: 'Delete',
      show: _row => true,
      function: this.onDelete,
      icon: 'trash',
    },
  ];

  render() {
    const { menuItems } = this.props;
    return (
      <div>
        MenuItem list
        <TableComponent
          data={menuItems}
          records={this.tableConfig}
          mandatoryFields={['Name']}
          includeAction={true}
          actionConfig={this.actionConfig}
          bulkActions={[{ action: 'delete', function: this.onDelete }]}
          name='MenuItems'
        />
        {/* <OldTableComponent data={menuItems}
          records={[{header: 'Name', column: 'name', sortable: true},{header: 'Description', column: 'desc', sortable: true}, {header: 'Category', column: 'category'}, {header: 'Availablity', column: 'availablity'},{header: 'Expertised', column: 'isExpertised'}, {header: 'Feasible', column: 'isFeasible'}, {header: 'Actions', column: 'action'}]} includeAction complexRecords={['availablity']} mandatoryFeilds={['name']} searchKeys={{name: true, desc: true}} findComplexRecords={this.findComplexRecords} name="Menuitems" defaultSortable='name' bulkActions={[{action: 'delete', function: this.onDelete}]}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ menuItems }) => ({ menuItems });

export default connect(mapStateToProps)(MenuItemList);
