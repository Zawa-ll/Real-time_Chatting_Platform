import React, { Component } from 'react';

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    updateEmail = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value
        })
    }

    updatePassword = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log('App', this.state);
    }

    login = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state.email);
    }

    render() {
        return (
            <>
                <form onSubmit={this.login}>
                    <input type='text'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.updateEmail} />
                    <input type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.updatePassword} />
                    <button type='submit'>Login</button>
                </form>
            </>
        )
    }
}

export default LoginForm;