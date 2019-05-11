import React from 'react';

import './Auth.css';

class AuthPage extends React.Component {
  render() {
    return(
      <form class='auth-form  '>
        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <input type='email' id='email' />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>password</label>
          <input type='password' id='password' />
        </div>

        <div className='form-actions'>
          <button type='button'>swith to sign up</button>
          <button type='submit'>submit</button>
        </div>
      </form>
    )
  }
}

export default AuthPage;