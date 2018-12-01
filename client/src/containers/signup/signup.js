import React from 'react'
import axios from 'axios'
import Title from '../../components/Title/title'
import FieldGroup from '../../components/Fieldgroup'
import { Message } from '../../components/Message/message'
import { Redirect } from 'react-router-dom'
import './signup.css'

class SignUp extends React.Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        redirect: false,
        error: false,
        errorMessage: ''
    }

    handleInput = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { username, password, firstName, lastName } = this.state
        console.log(`Username ${username}`)
        console.log(`Password is ${password}`)
        console.log(`Name is ${firstName} ${lastName}`)
        if (this.state.username && this.state.password && this.state.firstName && this.state.lastName !== '') {
            if (this.state.password === this.state.confirmPassword) {
                this.setState({ 
                    redirect: true,
                    error: true,
                    errorMessage: 'Passwords Do Not Match'
                })
            } else if (this.state.password !== this.state.confirmPassword) {
                this.setState({ 
                    redirect: false,
                    error: true,
                    errorMessage: 'Passwords Do Not Match'
                })
            }
        } else {
            this.setState({ 
                redirect: false,
                error: true,
                errorMessage: 'One or more fields is blank'
            })
        }
    }

    registerUser = e => {
        e.preventDefault();

        if (
            this.state.username === '' ||
            this.state.password === '' ||
            this.state.email === ''
        ) {
            this.setState({
                showError: true,
                loginError: false,
                registerError: true,
            });
        } else {
            axios
                .post('/registerUser', {
                    name_first: this.state.firstName,
                    name_last: this.state.lastName,
                    username: this.state.username,
                    password: this.state.password
                })
                .then(response => {
                    if (response.data === 'username or email already taken') {
                        this.setState({
                            showError: true,
                            loginError: true,
                            registerError: false,
                            error: true,
                            errorMessage: response.data
                        });
                    } else {
                        this.setState({
                            messageFromServer: response.data.message,
                            showError: false,
                            loginError: false,
                            registerError: false,
                        });

                        axios.post('/loginUser',
                            {
                                username: this.state.username,
                                password: this.state.password
                            }
                        ).then(response => {
                            if (response.data === 'Login failed') {
                                console.log(response.data);
                                this.setState({
                                    showError: true,
                                    showNullError: false,
                                    redirect: false
                                });
                            } else {
                                console.log('successful login');
                                localStorage.setItem('JWT', response.data.token);
                                this.setState({
                                    loggedIn: true,
                                    showError: false,
                                    showENullrror: false,
                                    redirect: true
                                });
                            }
                        })
                            .catch(error => {
                                console.log(error.data);
                            });
                    }
                })
                .catch(error => {
                    console.log(error.data);
                });
        }

        if (this.state.username && this.state.password && this.state.firstName && this.state.lastName !== '') {
            this.setState({ redirect: true })
        }
    };

    render() {

        
        if (this.state.redirect === true) {
            return <Redirect to='/dashboard' />
        }

        return (
            <div>
                <div className="gradient-background">
                    <Title />

                    <div className='signup bbstyle container'>
                        <h3 className="login-h3">SIGN UP</h3>
                        <br/>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form className="signupFormField">
                                    <label htmlFor="firstName" className="signupFormLabel">First Name</label>
                                    <FieldGroup
                                        name='firstName'
                                        id='firstName'
                                        value={this.state.firstName}
                                        onChange={this.handleInput}
                                    />
                                </form>
                            </div>

                            <div className='col-md-6 last'>
                            <form className="signupFormField">
                                    <label htmlFor="lastName" className="signupFormLabel">Last Name</label>
                                    <FieldGroup
                                        name='lastName'
                                        id='lastName'
                                        value={this.state.lastName}
                                        onChange={this.handleInput}
                                    />
                                </form>
                            </div>

                        </div>

                        <br/>

                        <div className='row'>
                            <div className='col-md-12'>
                            <form className="signupFormField">
                                    <label htmlFor="username" className="signupFormLabel">User Name</label>
                                    <FieldGroup
                                        name='username'
                                        id='username'
                                        value={this.state.username}
                                        onChange={this.handleInput}
                                    />
                                </form>
                            </div>
                        </div>

                        <br/>

                        <div className='row'>
                            <div className='col-md-6'>
                            <form className="signupFormField">
                                    <label htmlFor="password" className="signupFormLabel">Password</label>
                                    <FieldGroup
                                        name='password'
                                        id='signupPassword'
                                        type='password'
                                        value={this.state.password}
                                        onChange={this.handleInput}
                                        placeholder='Password'
                                    />
                                </form>
                            </div>
                            <div className='col-md-6'>
                            <form className="signupFormField">
                                    <label htmlFor="confirmPassword" className="signupFormLabel">Confirm Password</label>
                                    <FieldGroup
                                        name='confirmPassword'
                                        id='confirmPassword'
                                        type='password'
                                        value={this.state.confirmPassword}
                                        onChange={this.handleInput}
                                        placeholder='Confirm Password'
                                    />
                                </form>
                            </div>
                                <input id='submit' type='submit' value='SUBMIT' onClick={this.registerUser} />
                                <a href="login">Already signed up? Log in!</a>
                                {this.state.error ? <Message key='1'> {this.state.errorMessage} </Message> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp