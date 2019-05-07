import './actions.css';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

// const findColor = action => {
//   switch (action) {
//     case 'Edit':
//       return '#FAC51D';
//     case 'Delete':
//       return '#E8515D';
//     default:
//       return '';
//   }
// };

const TableActions = props => {
  return (
    <div className="table-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {(props.actions || []).map((action, index) =>
        typeof action.show === 'function' && action.show(props.row) ? (
          <Button
            style={{ flex: '1 0 auto', background: action.color || '#5DA1CD' }}
            key={index}
            icon
            // color={findColor(action.action)} // Parent need to pass the color, if needed to display
            onClick={() => action.function([props.ids])}
            size="small">
            <Icon name={action.icon} /> {action.action}
          </Button>
        ) : null
      )}
    </div>
  );
};

export default TableActions;
