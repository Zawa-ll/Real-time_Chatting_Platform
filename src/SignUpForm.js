import React, { Component } from 'react';

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
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
            password: e.target.password
        })
    }

    render() {
        return (
            <>
                <h1>SignUpForm</h1>
                <form onSubmit={this.props.onSignUp}>
                    <input type='text'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.updateEmail} />
                    <input type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.updatePassword} />
                    <button type='submit'>Sign Up</button>
                </form>
            </>
        );
    }
}

export default SignUpForm;