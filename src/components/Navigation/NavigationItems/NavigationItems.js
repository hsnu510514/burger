import React from 'react';
import NavigationItem from './NavigationItem/NavigaionItem';
import classes from './NavigationItems.module.css';

// css設計: margin: 0; padding: 0; list-style: none;
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.isAuthenticated 
      ? <NavigationItem link="/auth">Authenticate</NavigationItem> 
      : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default navigationItems;