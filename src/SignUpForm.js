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
            <div className='box'>
                <h1 className='title'>Sign Up!</h1>
                <form onSubmit={this.onSubmit}>

                    <div className='field'>
                        <div className='control'>
                            <input type='email'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={this.updateEmail}
                                className='input'
                            />
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


                    <button type='submit' className='button is-fullwidth is-primary'>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUpForm;