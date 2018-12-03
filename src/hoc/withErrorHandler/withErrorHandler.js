import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

// 建立HOC (一個function接收Component後加工成另外一個Component)
// 需傳入想要加工的Component及axios(取得錯誤訊息)
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }
    // componentDidMount在component一開始無法顯示的時候無法正確執行 ex. 無法連線到資料庫 >> 更改成componentWillMount
    componentWillMount() {
      // 要讓withErrorHandler接收到error，使用interceptor接收全部req/res
      // req 每次開始時將error重製
      // 使用this.需告變數才能在不同的function裡面呼叫變數
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req;
      });
      // res 回傳收到的res，error訊息更新到state裡供後續使用
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      });
    }
    // 避免佔用多餘記憶體，在離開頁面時將先前的interceptor釋出
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    // 更改state.error以更改modal顯示
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          {/* 使用state.error控制是否顯示modal及錯誤訊息，並且在container中建立關閉功能(errorConfirmHandler) */}
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
};

export default withErrorHandler;