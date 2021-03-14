import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import { register } from '../services/userService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label('Username'),
    password: Joi.string().required().min(8).label('Password'),
    name: Joi.string().required().label('Name'),
  });

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem('token', response.headers['x-auth-token']);
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
