import React, { Component } from 'react';
import TableComponent from '../../components/newTable';
// import OldTableComponent from '../../components/table';
import { fetchMenuItems, deleteMenuItems } from './reducer';
import { connect } from 'react-redux';

import moment from 'moment';

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
    // {
    //   heading: 'Description',
    //   column: 'desc',
    //   type: 'String',
    //   cell: ({ row }) => row.desc,
    //   isSortable: true,
    //   isSearchable: true,
    //   isFilterable: true,
    // },
    {
      heading: 'Category',
      column: 'category',
      type: 'SingleSelect',
      cell: ({ row }) => row.category,
      options: ['Electrical', 'Mechanical', 'Home', 'Shoes', 'Computers', 'Outdoors'].map(category => ({
        value: category,
        label: category,
      })),
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
    },
    {
      heading: 'Price',
      column: 'price',
      type: 'Number',
      cell: ({ row }) => row.price,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
    },
    {
      heading: 'Expertise',
      column: 'isExpertised',
      type: 'Boolean',
      cell: ({ row }) => (row.isExpertised ? 'true' : 'false'),
      isSortable: true,
      isSearchable: false,
      isFilterable: true,
    },
    {
      heading: 'Availability',
      column: 'availability',
      type: 'MultiSelect',
      cell: ({ row }) => row.availability.join(', '),
      options: ['Yes', 'No', 'Maybe'].map(a => ({ value: a, label: a })),
      isSortable: true,
      isSearchable: false,
      isFilterable: true,
    },
    {
      heading: 'Started at',
      column: 'created',
      cell: ({ row }) => moment(row.created).format('DD-MMM-YYYY'),
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
          // includeAction={true}
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
