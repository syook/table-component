import './actions.css';

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const TableActions = ({ actions, row }) => {
  return (
    <div className="table-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {(actions || []).map((action, index) =>
        typeof action.show === 'function' && action.show(row) ? (
          <Button
            icon
            key={`TableActions-${index}`}
            onClick={() => action.function(row)}
            size="small"
            style={{ flex: '1 0 auto', background: action.color || '#5DA1CD' }}>
            <Icon name={action.icon} /> {action.name}
          </Button>
        ) : null
      )}
    </div>
  );
};

export default TableActions;
