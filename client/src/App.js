import React, { Component } from 'react';
import HackersContainer from './components/HackersContainer';
import Hacker from './components/Hacker';
import UserStats from './components/userstat/UserStats'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import Challenge from './components/challenge/Challenge'

import MenuComment from './components/comments/MenuComment';
import ResponsesContainer from './components/comments/ResponsesContainer';
import PrivateRoute from './components/PrivateRoute';
import ResetPass from './components/componentsUser/EmailContainer';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About} />
            <Route path='/userstats' component={UserStats} />
            <Route path="/challenge" component={Challenge} />
            <Route path='/comments' component={MenuComment} />
            <Route path='/responses/:id' component={ResponsesContainer} />
            <Route exact path='/resetPassword' component={ResetPass}/>
            <PrivateRoute path='/hackers' component={HackersContainer} />
            <Route path="/:hacker_id" component={Hacker} ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
