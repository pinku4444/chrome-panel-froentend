import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {PrivateRoute} from './utils';
const Login = lazy(() => import('./components/login'));
const Dashboard = lazy(() => import('./components/dashboard'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route render={() => { return (<h4>Page not found</h4>) }} />
        </Switch>
      </Suspense>
    </Router>

  );
}

export default App;
