import React from 'react';
import {Dropdown } from 'semantic-ui-react';

const BulkActionList = (props) => {
  return (
    <>
      <Dropdown text='Choose Bulk Action'>
      <Dropdown.Menu>
        {props.bulkActions.map((action) => (
          <Dropdown.Item text={action.action}  onClick={action.function}/>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}

export default BulkActionList;
