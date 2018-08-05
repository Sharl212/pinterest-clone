import React, { Component } from 'react'

// functions
import {register} from './authentication/register'

import './App.css'

class App extends Component {
  
  render () {
    return (
      <div className='row'>
        <div className='col s12'>
          <div className='row'>
            <div className='input-field col s6'>
              <input
                placeholder='Placeholder'
                name='username'
                type='text'
                className='validate' />
              <label htmlFor='username'>
                Username
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input name='email' type='email' className='validate' />
              <label htmlFor='email'>
                Email
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input name='password' type='password' className='validate' />
              <label htmlFor='password'>
                Password
              </label>
            </div>
          </div>
          <button className="waves-effect waves-light btn" onClick={register}>Create</button>
        </div>
      </div>
    )
  }
}

export default App
