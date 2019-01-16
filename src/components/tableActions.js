import React from 'react';
import { Button } from 'semantic-ui-react'

const findColor = (action) => {
  switch (action) {
    case 'Edit': return 'yellow';
    case 'Delete': return 'red';
    default: return ''
  }
}

const TableActions = (props) =>  {
  return (
    <div>
      {props.actions.map((action) => (
        <Button color={findColor(action)}> {action} </Button>
      ))}
    </div>
  )
}

export default TableActions;
