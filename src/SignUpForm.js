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
            password: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.onSignUp(email, password);
        this.setState({
            email: '',
            password: '',
        })
    }

    render() {
        return (
            <>
                <h1>SignUpForm</h1>
                <form onSubmit={this.onSubmit}>
                    <input type='email'
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