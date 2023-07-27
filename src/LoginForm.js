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

    login = (e) => {
        e.preventDefault();
        // const { email, password } = this.state;
        this.props.onLogin(this.state);
    }

    render() {
        return (
            <div className='box'>
                <h1 className='title'>Log In!</h1>
                <form onSubmit={this.login}>
                    <div className='field'>

                        <div className='control'>
                            <input type='text'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={this.updateEmail}
                                className='input' />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <input type='password'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={this.updatePassword}
                                className='input' />
                        </div>
                    </div>
                    <button type='submit' className='button is-primary is-fullwidth'>Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;