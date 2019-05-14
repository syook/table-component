import './headerSelector.css';
import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react';

const ColumnList = props => {
  return (
    <>
      {(props.columns || []).map((column, index) => (
        <List key={`hide-selector-list-${index}`}>
          <List.Item>
            <List.Content>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={column.isVisible}
                onChange={(_e, { checked }) => props.toggleColumns(column.headerName, { checked })}
              />{' '}
              <span>{column.headerName}</span>
            </List.Content>
          </List.Item>
        </List>
      ))}
    </>
  );
};

const HeaderSelector = props => {
  const hiddenColumnsCount = props.hiddenColumnCount;
  return (
    <div style={{ textAlign: 'left', gridColumn: '1/2', gridRow: 1, alignSelf: 'center' }}>
      <Popup
        trigger={
          <Button
            size="small"
            icon
            style={{
              background: hiddenColumnsCount ? '#3498DB' : 'rgb(109, 180, 226)',
              color: '#fff',
              padding: hiddenColumnsCount ? '0.78em 0.6em 0.78em' : '',
            }}>
            <Icon name="eye slash outline" />{' '}
            {hiddenColumnsCount === 1
              ? '1 hidden column'
              : hiddenColumnsCount >= 1
              ? `${hiddenColumnsCount} hidden columns`
              : 'Hide columns'}
          </Button>
        }
        content={<ColumnList columns={props.columns || []} toggleColumns={props.toggleColumns} />}
        hoverable
        on="click"
        position="bottom center"
        className="selectColumns-btn"
      />
    </div>
  );
};

export default HeaderSelector;
