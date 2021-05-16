import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import apple from './stores/AppleStore'
import { Provider } from 'mobx-react'

ReactDOM.render(
  <Provider apple={apple}><App /></Provider>,
  document.getElementById('root')
);


