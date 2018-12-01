import React from 'react'
import Title from '../../components/Title/title'
import FieldGroup from '../../components/Fieldgroup'
import './reset.css'

class Reset extends React.Component {
    state = { password: '' }

    handleInput = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state
        console.log(`Username ${username}`)
        console.log(`Password is ${password}`)
    }
    render() {
        return (
            <div>
                <div className="gradient-background">
                    <Title />
                </div>                <div className='row'>
                    <div className='col-md-12 boxStyle'>
                        <p>Please enter your email address, and check your email for information on how to reset your password.</p>
                        <form className='inputForm first' >
                            <FieldGroup
                                name='password'
                                id='password'
                                value={this.state.password}
                                onChange={this.handleInput}
                                placeholder='E-mail'
                            />
                        </form>
                        <input id='submit' type='submit' value='RESET' onClick={this.handleSubmit} />
                    </div>
                </div>
            </div>

        )
    }
}

export default Reset
