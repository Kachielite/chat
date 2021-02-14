import React from 'react';
import {Route,Switch} from 'react-router-dom';
import SignIn from './PageComponent/SignIn';
import SignUp from './PageComponent/SignUp';
import ForgetPassword from './PageComponent/ForgetPassword';
import ProtectChat from './PageComponent/ProtectChat';



const App = ()=> {

  return (
    <div>
      <Switch>
        <Route exact path='/'component={SignIn}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route exact path='/forgotten-password' component={ForgetPassword}/>
        <Route exact path='/chat' component={ProtectChat}/>
      </Switch>
    </div>
  )
}

export default App;
