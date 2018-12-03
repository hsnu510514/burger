import React from 'react';
import classes from './Button.module.css'

const Button = (props) => (
  // 設計Button class，className=[預設樣式, 添加樣式]，添加樣式由props帶入，最後使用join轉換成字串 
  <button 
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>
    {props.children}
  </button>
);

export default Button;