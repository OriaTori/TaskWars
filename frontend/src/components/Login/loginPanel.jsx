import jwt from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import ErrorMessage from '../ErrorMessage';
const axios = require('axios');

class LoginPanel extends React.Component {

  state = {
    email: '',
    password: '',
  }

  static contextType = Store;

  onButtonSubmit = async e => {
    e.preventDefault();
    const data = this.state;
    delete this.state["invalidData"];
    try {
      const res = await axios({
        method: 'post',
        url: '/api/auth',
        data: data,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(res.status);

      if (res.status === 203) {
        localStorage.setItem('email', this.state.email);
        document.location.href = '/login/notVerified';
      } else if (res.status === 200) {
        const token = res.headers["x-auth-token"];
        localStorage.setItem('token', token);
        localStorage.setItem('id', jwt(token)._id);
        this.context.changeStore('isLogged', true);
        this.setState({ isLogged: true });
      } else {
        this.setState({ invalidData: true });
      }
    }
    catch (error) {
      console.error('Error Login:', error);
      this.setState({ invalidData: true });
    }
  }

  loginValidate = (e) => {
    if (this.state.invalidData) {
      return <ErrorMessage message='Invalid email or password' />
    }
    else { return null }
  }

  render() {
    if (this.context.isLogged) return <Redirect to="/" />;

    return (
      <Segment color={'pink'} inverted >
        <Segment textAlign='left' inverted>
          <Form error onSubmit={this.onButtonSubmit} inverted>
            <Grid>
              <Grid.Row centered>
                <Header inverted textAlign='center'>Login</Header>
              </Grid.Row>
              <Grid.Row centred columns={2}>
                <Grid.Column>
                  <Form.Input
                    label='Email'
                    placeholder='Email'
                    name='email'
                    type='email'
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    label='Password'
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    error={this.loginValidate()}
                  />
                </Grid.Column>

              </Grid.Row>

              <Grid.Row textAlign='center' padded centered>
                <Button color='blue' type='submit'>Submit</Button>
              </Grid.Row>
            </Grid>

          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default LoginPanel;