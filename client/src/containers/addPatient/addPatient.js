import React from 'react'
import TabScreens from '../../components/Sidebar/bottomBar'
import './addPatient.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Title from '../../components/Title/title'


class AddPatient extends React.Component {

    state = {
        patients: [],
        firstName: "",
        lastName: "",
        userId: "",
        redirect: false,
        isLoggedIn: ''
    };

    async componentDidMount() {

        let accessString = localStorage.getItem('JWT');
        // console.log(accessString);
        if (accessString == null) {
            this.setState({
                isLoggedIn: false,
                error: true,
            });
        } else {
            await axios
                .get('/findUser', {
                    params: {
                        username: this.props.match.params.username,
                    },
                    headers: { Authorization: `JWT ${accessString}` },
                })
                .then(response => {
                    this.setState({
                        userId: response.data.id,
                        isLoggedIn: true,
                        error: false,
                    });
                    console.log(response)
                    console.log(this.state.userId)
                })
                .catch(error => {
                    console.log(error.data);
                });
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("CLICK")
        axios.post('/api/patients', {
            name_first: this.state.firstName,
            name_last: this.state.lastName,
            UserId: this.state.userId
        }).then(response => {

            if (response !== null) {
                console.log("patient inserted");
                this.setState({ redirect: true })
            } else {
                console.log("patient NOT inserted");
            }
        })
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/dashboard' />
        }

        if (this.state.isLoggedIn === false) {
            window.location.href = '/login'
        }

        return (
            <div className="dashboard-body gradient-background">
                <Title />
                <div className="container">
                    {/* <div className='row'>
                    <div className='col-md-12'>

                        <h3>Current Patients:</h3>
                        {this.state.patients.length ?
                            (null) : (
                                <p className='add'>You currently have no other patients for whom you are tracking presciptions.</p>
                            )}

                    </div>
                </div> */}

                    <div className='row'>
                        <div className='col-md-12'>
                        <div className="bbstyle">
                            <h3 className="login-h3">ADD A NEW PERSON</h3>
                            <br/>
                            <div className="form-group">
                                <input type="text" className="form-control formFieldsStyle"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    name="firstName"
                                    placeholder="First Name"
                                />
                                <input type="text" className="form-control formFieldsStyle"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                    name="lastName"
                                    placeholder="Last Name"
                                />
                            </div>
                            <button onClick={this.handleFormSubmit} className="btn standard-btn gePatientData">SUBMIT</button>
                        </div >
                    </div >
                    </div>
                    <TabScreens />
                </div>
            </div>
        )
    }
}

export default AddPatient