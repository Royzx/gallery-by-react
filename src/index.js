/*import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route ,browserHistory} from 'react-router-dom'

import APP from './components/Main';
import Login from './components/Login';

ReactDOM.render((
    <Router history={browserHistory}>
        <div>
            <Route path="/Login" component={Login}/>
            <Route path="/APP" component={APP}/>
        </div>
    </Router>
),document.getElementById('app'));*/

import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route,browserHistory } from 'react-router-dom'
import Login from './components/Login'
import APP from './components/Main'
// import configureStore from './stores/configureStore'

render(
    <Router history={browserHistory}>
        <div>
            <Route path="/Login" component={Login}/>
            <Route path="/APP" component={APP}/>
        </div>
    </Router>,
  document.getElementById('root')
)

