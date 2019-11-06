import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {PrivateRoute} from './utils';
const Login = lazy(() => import('./components/login'));
const Dashboardcomponent = lazy(() => import('./components/dashboardComponent'));
const Admindashboard = lazy(() => import('./components/admin/dashboard'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute path='/dashboard' component={Dashboardcomponent} />
          <PrivateRoute exact path='/admin/update' component={Dashboardcomponent} />
          <PrivateRoute path='/admin' component={Admindashboard} />
          <Route render={() => { return (<h4>Page not found</h4>) }} />
        </Switch>
      </Suspense>
    </Router>

  );
}

export default App;
