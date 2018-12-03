import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }

  // componentWillMount() {
  //   // 將URL欄的內容轉換回一般顯示方式
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   // 在query.entries()中逐個讀取，並且將內容存入ingredients中
  //   for (let param of query.entries()) {
  //     if(param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price});
  // }

  // 在componentWillMount呼叫onInitPurchase已經太晚了
  // componentWillMount = () => {
  //   this.props.onInitPurchase();
  // }

  checkoutCancelledHandler = () => {
    // 回到前一個
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route 
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      )
    }
    return summary
        
          // // 使用render執行function，將ingredients傳入props中使ContactData可以直接使用
          // render={(props)=>(
          //   <ContactData 
          //     ingredients={this.props.ings} 
          //     {...props}
          //   /> 
          // ) 
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   };
// };


export default connect(mapStateToProps)(Checkout);

