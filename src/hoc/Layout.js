import React from 'react';
import Auxiliar from './Auxiliar';
import SignIn from '../components/LogComponents/SignIn';
import SignUp from '../components/LogComponents/SignUp';


const Layout = (props) => (
  <Auxiliar>
      <SignIn />
      {/* <SignUp /> */}
  </Auxiliar>
);

export default Layout;