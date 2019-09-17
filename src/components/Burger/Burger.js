import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngreident';
// 將props傳入子component中
import { withRouter } from 'react-router-dom';
import classes from './Burger.module.css'

const burger = (props) => {

  // 將state轉換成array讓BurgerIngredient可以按照每一層輸出
  // array(2) >> [ , ]
  // map((_, i) => {}) _為輸入項，i為array之index
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} /> 
      });
    })
    // 將數列扁平化(方便後續計算長度)
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  // 漢堡原料為0時顯示提醒字串
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>      
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />      
    </div>
  );
};

export default withRouter(burger);
