import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../UI/Button/Button';

// 實驗用，不須為class component
class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            {/* 想要修改CSS的地方用span 圍起來，inline style使用{} */}
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continued to CheckOut?</p>
        {/* 自己設計Button */}
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  };
}

export default OrderSummary;