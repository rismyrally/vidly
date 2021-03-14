import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import { login } from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  });

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      const { data: jwt } = await login(username, password);
      localStorage.setItem('token', jwt);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
