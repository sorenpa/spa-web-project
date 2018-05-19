import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Engine from './Engine'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './UI';

ReactDOM.render(
  <App initializeCallback={initializeCallBack} />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

// Boot the game engine once the DOM has been generated.
// TODO Possibly transform into an observable passed to App/Engine
function initializeCallBack(){
  Engine();
}
