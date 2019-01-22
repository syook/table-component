import React, {Component} from 'react';
import TableComponent from '../../components/table';
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

  onDelete = () => {
    this.props.dispatch(deleteMenuItems())
  }

  render(){
    const {menuItems} = this.props
    return(
      <div>
        MenuItem list
        <TableComponent data={menuItems} records={[{header: 'Name', column: 'name', sortable: true},{header: 'Description', column: 'desc', sortable: true}, {header: 'Category', column: 'category'}, {header: 'Availablity', column: 'availablity'},{header: 'Expertised', column: 'isExpertised'}, {header: 'Feasible', column: 'isFeasible'}, {header: 'Actions', column: 'action'}]} includeAction complexRecords={['availablity']} mandatoryFeilds={['name']} searchKeys={{name: true, desc: true}} findComplexRecords={this.findComplexRecords} name="Menuitems" defaultSortable='name' bulkActions={[{action: 'delete', function: this.onDelete}]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({menuItems}) => ({menuItems})

export default connect(
    mapStateToProps,
  )(MenuItemList);
