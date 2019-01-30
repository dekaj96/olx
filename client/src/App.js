import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import RedirectPage from './Pages/RedirectPage';
import Page404 from './Pages/Page404';
import NewPost from './Pages/NewPost';
import PostPage from './Pages/PostPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('usertoken')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/show-info" component={RedirectPage} />

          <PrivateRoute path="/new-post" component={NewPost} />

          <Route component={Page404} />
          </Switch>
      </div>
    </Router>
  );
};

export default App;
