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
        <TableComponent data={categories} headers={['name', 'Description']} records={['name', 'desc']} includeAction />
      </div>
    );
  }
}

const mapStateToProps = ({categories}) => ({categories})

export default connect(
    mapStateToProps,
  )(CategoryList);
