import * as React from 'react';
import * as ReactDOM from 'react-dom';

import bootEngine from './Engine'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './UI';

// Boot the game engine once the DOM has been generated.
// TODO Possibly transform into an observable passed to App/Engine
function initializeCallBack(){
  bootEngine();
}

ReactDOM.render(
  <App initializeCallback={initializeCallBack} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();


