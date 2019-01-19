import React, {Component} from 'react';
import TableComponent from '../../components/table';
import { fetchMenuItems } from './reducer';
import { connect } from 'react-redux';

class MenuItemList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchMenuItems())
  }

  findComplexRecords(attr, value){
    switch (attr) {
      case 'availablity':
        return (value || []).join(',');
        case 'category':
        return (value||{}).name;
      default:

    }
  }

  render(){
    const {menuItems} = this.props
    return(
      <div>
        MenuItem list
        <TableComponent data={menuItems} records={[{header: 'Name', column: 'name'},{header: 'Description', column: 'desc'}, {header: 'Category', column: 'category'}, {header: 'Availablity', column: 'availablity'},{header: 'Expertised', column: 'isExpertised'}, {header: 'Feasible', column: 'isFeasible'}, {header: 'Actions', column: 'action'}]} includeAction complexRecords={['availablity', 'category']} mandatoryFeilds={['name']} findComplexRecords={this.findComplexRecords}
        />
      </div>
    );
  }
}

const mapStateToProps = ({menuItems}) => ({menuItems})

export default connect(
    mapStateToProps,
  )(MenuItemList);
