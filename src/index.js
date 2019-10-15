import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './index.css';
// // import App from './App';
// import * as serviceWorker from './serviceWorker';
// // import Login from './Login';
// // import DataForm from './DataForm';
// import DataForm1 from './DataForm1';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// import Home from './Home';
// import LoginRoute from './LoginRoute';
// import DataRoute from './DataRoute';




// const routing = (
//     <Router>
//       <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         <li>
//           <Link to="/data">Data</Link>
//         </li>
//       </ul>
//       <switch>
//                 <Route exact path="/" component={Home} />
//         <Route exact path="/login" component={LoginRoute} />
//         <Route exact path="/data" component={DataRoute} />
//         <Route component={Home} />
//         </switch>

//       </div>
//     </Router>
//   )
// ReactDOM.render(routing, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

