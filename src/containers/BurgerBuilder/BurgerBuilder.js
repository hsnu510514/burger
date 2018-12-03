import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

// 做為測試用，與export default做區隔
export class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
    // 記得結尾要加json
    // axios.get('https://burger-18a73.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   // const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('./checkout');
      // 確認有無登入，如果沒有的話使用props.history跳轉到auth頁面
      this.props.history.push('/auth');

    }
  }

  purchaseCancelHandler = () => {
    this.props.onInitPurcahse();
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   // 將ingredient轉換成URI上顯示的格式
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // // 將queryParams轉換成String並加上&
    // const queryString = queryParams.join('&');

    // 點擊後跳到checkout page (因為BurgerBuilder有使用withRouter將props傳下來)
    this.props.history.push('/checkout');
  }

  render() {
    // 讓按鈕套用disabeled
    // 根據ingredient數值決定
    const disabledInfo = {
      ...this.props.ings
    };
    // 檢查數值，小於等於0設定為true，接者將disabledInfo傳入BuildControls
    // BuildControls 傳入 BuildControl，根據個別數值設定disabled屬性
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    // 兩層error提示，外層error提示遇到的狀況是什麼，內層的error在無法顯示正確內容時更換內容
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded} 
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuedHandler}
          price={this.props.price} />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {/* 因為Modal設置shouldComponentUpdate，spinner一開始不會顯示，需到Modal中進一步調整 */}
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

// connect包在外層(withErrorHandler須確保有把props傳進去)
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
