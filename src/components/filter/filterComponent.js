import DateTime from 'react-datetime';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import { Popup, Button, Icon, List, Grid, Input, Checkbox } from 'semantic-ui-react';

import { createPropertyOption } from '../utils';
import { findColumnOptions } from './utils';

import { predicateOptions, filterOperators } from '../constants';

const TableFilter = props => {
  const selectedFilters = (props.selectedFilters || []).length;
  let buttonText = selectedFilters === 1 ? '1 filter' : selectedFilters >= 1 ? `${selectedFilters} filters` : 'Filter';

  return (
    <Popup
      trigger={
        <Button size='small' style={{ backgroundColor: selectedFilters ? '#d1f7c4' : null }}>
          <Icon name='filter' /> {buttonText}
        </Button>
      }
      content={<FilterDiv {...props} filtersSelected={!!selectedFilters} />}
      on='click'
      position='bottom center'
    />
  );
};

const FilterDiv = props => {
  const selectedFilters = props.selectedFilters || [];
  const indexOnePredicate = selectedFilters.length > 1 ? selectedFilters[1].predicate : null;
  const secondarySelectionDisabled = selectedFilters.length > 1;
  return (
    <div style={{ width: '60em' }}>
      {selectedFilters.length ? (
        <List divided relaxed>
          {selectedFilters.map((column, index) => (
            <List.Item key={index}>
              <List.Content>
                <FilterGrid
                  index={index}
                  column={column}
                  removeFilter={props.removeFilter}
                  updateSelectedFilters={props.updateSelectedFilters}
                  indexOnePredicate={indexOnePredicate}
                  filterableColumns={props.filterableColumns}
                  secondarySelectionDisabled={secondarySelectionDisabled}
                />
              </List.Content>
            </List.Item>
          ))}
        </List>
      ) : (
        <div style={{ opacity: 0.5 }}>No filters applied</div>
      )}
      <div>
        <Button primary size='small' onClick={props.addFilter}>
          <Icon name='add' /> Add Filter{' '}
        </Button>
        <Button positive size='small' onClick={props.applyFilter} disabled={!props.filtersSelected}>
          {' '}
          Apply Filter{' '}
        </Button>
      </div>
    </div>
  );
};

const FilterGrid = props => {
  let predicateOptionConditions = [];
  if (props.index === 0) {
    predicateOptionConditions = [{ value: 'Where', label: 'Where' }];
  } else if (props.index > 1) {
    predicateOptionConditions = [{ value: props.indexOnePredicate, label: props.indexOnePredicate }];
  } else {
    predicateOptionConditions = predicateOptions;
  }
  const queryOperatorOptions = filterOperators[props.column.type] || [];
  return (
    <Grid columns={5}>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: '40px', paddingTop: 'inherit' }}>
          <Icon name='remove' onClick={() => props.removeFilter(props.index)} />
        </Grid.Column>
        <Grid.Column>
          <Select
            isSearchable={false}
            isDisabled={props.column.predicate === 'Where' || (props.secondarySelectionDisabled && props.index > 1)}
            options={predicateOptionConditions}
            value={{ value: props.column.predicate, label: props.column.predicate }}
            onChange={value => props.updateSelectedFilters('predicate', value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
          <Select
            options={props.filterableColumns.map(createPropertyOption('column', 'heading'))}
            value={{ value: props.column.label, label: props.column.label }}
            onChange={value => props.updateSelectedFilters('attribute', value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
          <Select
            options={queryOperatorOptions}
            isDisabled={queryOperatorOptions.length <= 1}
            value={{ value: props.column.query, label: props.column.query }}
            onChange={value => props.updateSelectedFilters('query', value.value, props.index)}
          />
        </Grid.Column>
        {['is empty', 'is not empty'].includes(props.column.query) ? null : (
          <Grid.Column>
            <InputCategories
              column={props.column}
              updateSelectedFilters={props.updateSelectedFilters}
              index={props.index}
              filterableColumns={props.filterableColumns}
            />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

const InputCategories = props => {
  switch (props.column.type) {
    case 'String':
    case 'Number':
      return (
        <Input
          // placeholder='Search...'
          value={props.column.value}
          onChange={e => props.updateSelectedFilters('value', e.target.value, props.index)}
        />
      );
    case 'SingleSelect':
    case 'MultiSelect':
      const isMultiSelect = !['is', 'is not'].includes(props.column.query);
      const selectValue = isMultiSelect
        ? (props.column.value || []).length
          ? props.column.value.map(v => ({ value: v, label: v }))
          : []
        : (props.column.value || []).length === 1
        ? { value: props.column.value[0], label: props.column.value[0] }
        : null;
      return (
        <Select
          isMulti={isMultiSelect}
          options={findColumnOptions(props.filterableColumns, props.column.attribute)}
          value={selectValue}
          onChange={value => {
            const newValue = isMultiSelect ? value.map(({ value }) => value) : (value || {}).value ? [value.value] : [];
            props.updateSelectedFilters('value', newValue, props.index);
          }}
        />
      );
    // case 'MultiSelect':
    //   return (
    //     <Select
    //       isMulti
    //       options={findColumnOptions(props.filterableColumns, props.column.attribute)}
    //       value={(props.column.value || []).length ? props.column.value.map(v => ({ value: v, label: v })) : []}
    //       onChange={value => props.updateSelectedFilters('value', value.map(({ value }) => value), props.index)}
    //     />
    //   );
    case 'Boolean':
      return (
        <Checkbox
          checked={props.column.value}
          onChange={(e, { checked }) => props.updateSelectedFilters('value', checked, props.index)}
        />
      );
    case 'Date':
      return (
        <DateTime
          closeOnSelect={true}
          dateFormat='DD-MMM-YYYY'
          open={false}
          value={
            props.column.value instanceof moment ? props.column.value : moment(props.column.value || '', 'DD-MMM-YYYY')
          }
          onChange={date => props.updateSelectedFilters('value', date, props.index)}
          timeFormat={false}
        />
      );
    default:
      return null;
  }
};

FilterDiv.propTypes = {
  filterableColumns: PropTypes.array.isRequired,
  selectedFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
  updateSelectedFilters: PropTypes.func.isRequired,
};

FilterDiv.defaultProps = {
  filterableColumns: [],
  selectedFilters: [],
};
export default TableFilter;
