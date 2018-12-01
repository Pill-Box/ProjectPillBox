import React from 'react'
import Title from '../../components/Title/title'
import TabScreens from '../../components/Sidebar/bottomBar'
import axios from 'axios'
import './patientProfile.css'


class patientProfile extends React.Component {
    render() {

        return (
            <div className="dashboard-body gradient-background">
                <Title />
                <div className="container">
                    <div className='row dashboard'>
                        <div className='col-md-12 patient-cards'>
                            {this.state.patients.map(patient => (
                                <h1>Patient Name</h1>
                            ))}
                        </div>
                    </div>
                </div>
                <TabScreens />
            </div>

        )
    }
}

export default patientProfile
