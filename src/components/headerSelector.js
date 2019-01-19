import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react'


const ColumnList = (props) => {
  return(
    <div>
      {props.columns.map((column) => (
        <List>
          <List.Item>
            <Checkbox checked={!column.value} toggle onChange={(e, {checked}) => props.toggleColumns(column.header, {checked})}/>
            <List.Content>{column.header}</List.Content>
          </List.Item>
        </List>
      ))}
    </div>
  )
}

const HeaderSelector = (props) => {
  return(
      <div style={{textAlign: 'left'}}>
        <Popup
          trigger={<Button icon> <Icon name='eye' /> n hidden feilds </Button>}
          content={<ColumnList columns={props.columns} toggleColumns={props.toggleColumns}/>}
          hoverable
        />
      </div>
  );
}

export default HeaderSelector;
