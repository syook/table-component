import React, {Component} from 'react';
import TableComponent from '../../components/table';
import { fetchCategories } from './reducer';
import { connect } from 'react-redux';

class CategoryList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  render(){
    const {categories} = this.props
    return(
      <div>
        category list
        <TableComponent data={categories} records={[{header: 'name', column: 'name'}, {value: 'Description', column: 'desc'}]} includeAction mandatoryFeilds={['name']} />
      </div>
    );
  }
}

const mapStateToProps = ({categories}) => ({categories})

export default connect(
    mapStateToProps,
  )(CategoryList);
