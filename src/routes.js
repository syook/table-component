import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard/dashboard';
import CategoryList from './containers/categories/categoryList';
import MenuItemList from './containers/menuItems/list';

import React from 'react';

export const routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/categories" component={CategoryList} />
      <Route path="/menuItems" component={MenuItemList} />
    </Switch>
  )
}
