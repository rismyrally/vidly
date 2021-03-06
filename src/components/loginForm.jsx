import React, { Component } from 'react';
import Joi from 'joi';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  });

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.account, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Call the server
    console.log('Submitted');
  };

  validateProperty = ({ name, value }) => {
    const input = { [name]: value };
    const schema = Joi.object({
      [name]: this.schema._ids._byKey.get(name).schema,
    });
    const { error } = schema.validate(input);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            label='Username'
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            label='Password'
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
