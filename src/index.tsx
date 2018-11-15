// import App from './App';
import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReactGridLayoutComponent } from './components/ReactGridLayoutComponent';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ReactGridLayoutComponent />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
