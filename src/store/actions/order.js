import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purcahseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

// 將purchaseBurger分成兩步驟，第一步觸發start，接著根據執行結果觸發success或failed
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purcahseBurgerStart())
    axios.post('/orders.json?auth=' + token, orderData)
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error))
    });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
};

export const fetchOrdersFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  }
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    // 檢索orders中符合id的項目
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            // 將res.data[key]的值分開存到{}中
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
}
