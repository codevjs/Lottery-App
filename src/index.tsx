import React from 'react';
import { render } from "react-dom";
import Router from 'router';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.less';
import 'assets/styles/main.less';

const rootElement = document.getElementById("root");

render(<Router />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
