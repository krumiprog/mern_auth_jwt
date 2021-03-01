import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContext from './context/AppContext';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';

function Router() {
  const { logged } = useContext(AppContext);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <div className="container">
              <h1>Hello, world!</h1>
            </div>
          </Route>
          {logged ? (
            <Route path="/users" component={Users} />
          ) : (
            <>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
