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
        <TableComponent data={menuItems} headers={['name', 'Description', 'Category', 'Availablity', 'Expertised', 'Feasible']} records={['name', 'desc', 'category', 'availablity', 'isExpertised', 'isFeasible']} includeAction complexRecords={['availablity', 'category']} findComplexRecords={this.findComplexRecords}
        />
      </div>
    );
  }
}

const mapStateToProps = ({menuItems}) => ({menuItems})

export default connect(
    mapStateToProps,
  )(MenuItemList);
