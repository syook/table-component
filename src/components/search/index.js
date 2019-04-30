import React from 'react';
import { Icon, Input } from 'semantic-ui-react';

const SearchComponent = props => {
  return (
    <div>
      <span
        style={{
          fontSize: '24px',
          fontWeight: 'normal',
          color: 'rgb(102, 119, 151)',
        }}
      >
        {props.name}
      </span>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Input
          iconPosition='left'
          placeholder={props.placeholder || 'Search...'}
          style={styles.searchInputDiv}
          onChange={props.onChangeSearchText}
        >
          <Icon name='search' />
          <input className='searchInput' style={styles.searchInput} value={props.searchText} />
          <Icon
            name='close'
            style={styles.closeIcon}
            onClick={() => props.onChangeSearchText({ target: { value: '' } })}
          />
        </Input>
      </div>
    </div>
  );
};

const styles = {
  searchInputDiv: {
    border: '1px solid rgb(214, 231, 243)',
    color: '#667797',
    position: 'relative',
    marginLeft: '10px',
  },
  closeIcon: {
    position: 'absolute',
    right: '0px',
    left: 'unset',
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
  searchInput: {
    background: '#d6e7f3',
    borderRadius: '0px',
    fontWeight: 'normal',
    border: '1px solid rgb(214, 231, 243)',
  },
};

export default SearchComponent;
