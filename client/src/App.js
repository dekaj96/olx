import React from 'react';
import './App.css';

import Register from './Pages/Users/Register'
import Login from './Pages/Users/Login';
import MyAccount from './Pages/Users/MyAccount';
import Logout from './Pages/Users/Logout';

import NewPost from './Pages/Posts/NewPost';
import EditPost from './Pages/Posts/EditPost';
import PostPage from './Pages/Posts/PostPage';

import RedirectPage from './Pages/Infos/RedirectPage';
import Page404 from './Pages/Infos/Page404';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('usertoken')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const SafeRoute = ({ component: Component, ...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      localStorage.getItem('usertoken') && JSON.parse(localStorage.getItem('userLogged'))._id === rest.computedMatch.params.userId
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PostPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/show-info" component={RedirectPage} />

          <PrivateRoute path="/new-post" component={NewPost} />
          <PrivateRoute path='/my-account/:userId' component={MyAccount} />

          <SafeRoute path="/post-edit/:userId/:postId/" component={EditPost} />

          <Route component={Page404} />
          </Switch>
      </div>
    </Router>
  );
};

export default App;
