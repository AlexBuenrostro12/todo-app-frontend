import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auxiliar from './Auxiliar';
import SignIn from '../components/LogComponents/SignIn';
import SignUp from '../components/LogComponents/SignUp';
import ToDo from '../components/ToDoComponents/ToDo';

const Layout = () => (
  <Auxiliar>
    <Switch>
      <Route path="/toDo" component={ToDo} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/" exact component={SignIn} />
    </Switch>
  </Auxiliar>
);

export default Layout;