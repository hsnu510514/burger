import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

// css設計: .NavigationItem a:hover,
//          .NavigationItem a:active,
//          .NavigationItem a.active
const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
  {/* 因為css module關係無法顯示NavLink 之 active樣式，解決方法為自行創造一個active樣式 */}
    <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>{props.children}</NavLink>
  </li>
);

export default navigationItem;