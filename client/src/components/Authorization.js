import React from "react";
import Navbar from './Navbar';


const Authorization = {
  isAuthenticated: false,
  authenticate(user, pass) {
    let base64 = require('base-64');
    const h = new Headers();
    h.append('Accept', 'application/json');
    h.set('Authorization', 'Basic '+ base64.encode(user+ ":"+ pass));
    fetch('http://localhost:55555/user/login', {
      method: 'POST',
      headers:h ,
      body:JSON.stringify({'username': user, 'password':pass}),
      mode:'cors',
      cache:'default',
      })
      .then(function(response) {
        Authorization.isAuthenticated = true;
        localStorage.setItem('token', base64.encode(user+ ":"+ pass));
      })
      .catch( error => {
        Authorization.isAuthenticated = false;
      })
    },
    signout(cb) {
      Authorization.isAuthenticated = false;
      localStorage.removeItem('token');
    }
}

export default Authorization
