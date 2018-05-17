import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Engine from './Engine'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './UI';


ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
Engine.boot();
registerServiceWorker();
