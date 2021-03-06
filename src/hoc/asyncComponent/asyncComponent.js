import React, { Component } from 'react';

// 外部匯入欲顯示的component，先透過componentDidMount執行，執行後之結果存在state.component中，接者使用render顯示(如果無component不顯示任何東西，有則顯示component)

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({ component: cmp.default });
        });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;


// lazy loading
// 點擊要進入的下一個頁面時才import component 進來，並且執行後存入state中，最後再使用render顯示