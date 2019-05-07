import './list.css';
import React, { Component } from 'react';
import format from 'date-fns/format';
import { Button, Input } from 'semantic-ui-react';

import TableComponent from '../table';

class MenuItemList extends Component {
  state = { data: [] };

  async componentDidMount() {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      // const baseUrl = 'http://localhost:5000';
      if (baseUrl) {
        const response = await fetch(`${baseUrl}/menuItems`);
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
    console.log('onDelete', ids);
  };

  onShow = args => {
    console.log('onShow', args);
  };

  onInputChange = ({ row, value: newValue }) => {
    console.log({ row, newValue });
  };

  tableConfig = [
    {
      heading: 'Name',
      column: 'name',
      type: 'String',
      cell: ({ row }) => (
        <Input
          className="name_input"
          value={row.name}
          onChange={(_e, { value }) => this.onInputChange({ value, row })}
        />
      ),
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
    },
    {
      heading: 'Description',
      column: 'description',
      type: 'String',
      cell: ({ row }) => row.description,
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      // className: 'description',
    },
    {
      heading: 'Category',
      column: 'category',
      type: 'SingleSelect',
      cell: ({ row }) => row.category,
      options: ['Grocery', 'Electronics', 'Home', 'Shoes', 'Computers', 'Outdoors', 'Clothing'].map(category => ({
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
      cell: ({ row }) => (row.isExpertised ? 'Yes' : 'No'),
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
      cell: ({ row }) => format(new Date(row.created), 'dd-MMM-yyyy hh:mm a'),
      type: 'Date',
      isSortable: true,
      isSearchable: false,
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
      cell: ({ row }) => (row.isExpertised ? 'Yes' : 'No'),
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
      cell: ({ row }) => (row.isExpertised ? 'Yes' : 'No'),
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
      color: '#FAC51D',
    },
    {
      action: 'Delete',
      show: _row => true,
      function: this.onDelete,
      icon: 'trash',
      color: '#E8515D',
    },
  ];

  customComponents = () => (
    <>
      <Button disabled size="small" onClick={() => null}>
        Button 1
      </Button>
      {/* <Button onClick={() => null}>Button 2</Button> */}
    </>
  );

  render() {
    return (
      <TableComponent
        data={this.state.data || []}
        records={this.tableConfig}
        mandatoryFields={['Name']}
        includeAction={true}
        actionConfig={this.actionConfig}
        bulkActions={[{ action: 'delete', function: this.onDelete }]}
        name="MenuItems">
        {this.customComponents}
      </TableComponent>
    );
  }
}

export default MenuItemList;

// resize: horizontal;
//     overflow: auto;
//     width: 210px;

//     display: block;
//     min-width: 210px;
