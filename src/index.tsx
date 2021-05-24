import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { withStyles } from '@material-ui/core/styles';
import reportWebVitals from "./reportWebVitals"; 

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiDialog-paperScrollPaper': {
      display: 'flex',
      height: '70vh',
      flexDirection: 'column',
    },
    '.MuiGridListTile-imgFullWidth': {
      top: '50%',
      width: '50%',
      position: 'relative',
      transform: 'translateY(-50%)'
    }

  },
})(() => null);
 
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalCss />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
