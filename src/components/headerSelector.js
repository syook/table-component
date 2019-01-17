import React from 'react';
import { Button, Popup, List, Icon } from 'semantic-ui-react'


const ColumnList = (props) => {
  return(
    <List>
      <List.Item>
        <List.Icon name='users' />
        <List.Content>Semantic UI</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='marker' />
        <List.Content>New York, NY</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='mail' />
        <List.Content>
          <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='linkify' />
        <List.Content>
          <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
        </List.Content>
      </List.Item>
    </List>
  )
}

const HeaderSelector = (props) => {
  return(
      <div style={{textAlign: 'left'}}>
        <Popup
          trigger={<Button icon> <Icon name='eye' /> n hidden feilds </Button>}
          content={<ColumnList/>}
          hoverable
        />
      </div>
  );
}

export default HeaderSelector;
