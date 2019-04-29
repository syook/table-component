import React, { Component } from 'react';
import moment from 'moment';
// import { Button } from 'semantic-ui-react';

import TableComponent from '../../components/table';

class MenuItemList extends Component {
  state = { data: [] };

  async componentDidMount() {
    try {
      if (process.env.REACT_APP_BASE_URL) {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/menuItems`);
        const { data } = await response.json();
        if ((data || []).length) {
          this.setState({ data });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  onDelete = ids => {
    console.log(ids);
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
      cell: ({ row }) => moment(row.created).format('DD-MMM-YYYY hh:mm A'),
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

  customComponents = () => (
    <>
      {/* <Button onClick={() => null}>Button 1</Button> */}
      {/* <Button onClick={() => null}>Button 2</Button> */}
    </>
  );

  render() {
    return (
      <div>
        MenuItem list
        <TableComponent
          data={this.state.data || []}
          records={this.tableConfig}
          mandatoryFields={['Name']}
          includeAction={true}
          actionConfig={this.actionConfig}
          bulkActions={[{ action: 'delete', function: this.onDelete }]}
          name='MenuItems'
        >
          {this.customComponents}
        </TableComponent>
      </div>
    );
  }
}

export default MenuItemList;
