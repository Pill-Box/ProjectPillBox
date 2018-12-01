import React from 'react'
import Title from '../../components/Title/title'
import { PatientCard } from '../../components/PatientCard/patientCard'
import { Rx } from '../../components/PatientCard/rx'
import TabScreens from '../../components/Sidebar/bottomBar'
import axios from 'axios'
import './dashboard.css'
import DeleteBtn from '../../components/Buttons/deleteBtn'
import RxModalBtn from '../../components/Buttons/ModalBtn'
import RxModal from '../../components/RxModal/rxModal'
import Moment from 'react-moment'
import { SIGURG } from 'constants';

class Dashboard extends React.Component {

    state = {
        patients: [],
        drugNames: [],
        userId: "",
        show: false,
        patientId: '',
        isLoggedIn: ''
       }

    async componentDidMount() {
        console.log("getting access string");
        let accessString = localStorage.getItem('JWT');
        // console.log(accessString);
        if (accessString == null) {
            this.setState({
                error: true,
                isLoggedIn: false
            });
        } else {
            await axios
                .get('/findUser', {
                    params: {
                        username: this.props.match.params.username,
                    },
                    headers: {
                        Authorization: `JWT ${accessString}`
                    }
                })
                .then(response => {
                    this.setState({
                        userId: response.data.id,
                        error: false,
                        isLoggedIn: true
                    });

                    // console.log(response.data)
                    // console.log(this.state.userId)
                    this.loadUser();
                })
                .catch(error => {
                    console.log(error.data);
                });
        }
    }

    loadUser = () => {
        axios.get('/api/user/patient/rx/' + this.state.userId)
            .then(patientData => {
                // console.log(patientData.data.Patients);
                this.setState({
                    patients: patientData.data.Patients
                })
            })
            .catch(err => console.log(`Error: ${err}`)
            );
    }

    deleteRx = id => {
        axios.delete('/api/Rxs/' + id)
            .then(res => this.loadUser())
            .catch(err => console.log(err));
    };

    deletePatient = id => {
        axios.delete('/api/user/patient/' + id)
            .then(res => this.loadUser())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleRxModal = id => {
        // console.log(id)
        this.setState({ show: true, patientId: id })

    }

    handleHideModal = () => this.setState({ show: false })

    getDrugInfo = id => window.open("https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=" + id)

    render() {
        if (this.state.isLoggedIn === false) {
            window.location.href = '/login'
        }

        return (
            <div className="dashboard-body gradient-background">
                <Title />
                <div className="container">
                    <h1 id='clock'><Moment format='MMMM D, YYYY'>{this.props.dateToFormat}</Moment></h1>
                    <div className='row dashboard'>
                        {/* {console.log(this.state.patients)} */}
                        {this.state.patients.filter(patient => patient.id === this.state.patientId).map(patient => (
                            <RxModal
                                show={this.state.show}
                                handleClose={this.handleHideModal}
                                key={patient.id}>
                                <strong>{patient.name_first} </ strong>
                                <strong>{patient.name_last}</strong>
                                <hr />
                                {patient.Rxes.map(drug => (
                                    <Rx key={drug.id}>
                                        Medication: {drug.drug_name}<br />
                                        Prescription Number: {drug.rx_num}<br />
                                        Refills: {drug.refills}<br />
                                        Quantity Dispensed: {drug.dispensed_qty}<br />
                                        Frequency: {drug.frequency}<br />
                                        Usage Per Day: {drug.perDay}<br />
                                        Time of Day: {drug.time_of_day}<br />
                                        Prescriber: {drug.prescriber}<br />
                                        Prescriber Number: {drug.prescriber_number}<br />
                                        Pharmacist: {drug.pharmacist}<br />
                                        Pharmacy Number: {drug.pharmacy_number}<br />
                                        Notes: {drug.notes}<br />
                                        <button className="get-drug-info" onClick={() => this.getDrugInfo(drug.ndc)}><i className="fas fa-notes-medical"></i>  Get Drug Info</button>
                                        <br/>
                                        <hr/>
                                    </Rx>
                                ))}
                            </RxModal>
                        ))}

                        <div className='col-md-12 patient-cards'>
                            {this.state.patients.map(patient => (
                                <PatientCard
                                    key={patient.id}>
                                    <RxModalBtn onClick={() => this.handleRxModal(patient.id)} />
                                    <DeleteBtn onClick={() => this.deletePatient(patient.id)} />
                                    {patient.name_first}
                                    {patient.name_last}
                                    {patient.Rxes.map(drug => (
                                        <Rx key={drug.id}>
                                            <strong><i className="fas fa-prescription-bottle-alt"></i></strong> {drug.drug_name}<strong> <i className="fa-icon far fa-clock"></i></strong>   {drug.time_of_day}  <strong><i class="fa-icon far fa-calendar-alt"></i></strong>  {drug.frequency}
                                            <DeleteBtn onClick={() => this.deleteRx(drug.id)} />
                                            <br/>
                                            <br/>
                                        </Rx>
                                    ))}
                                </PatientCard>
                            ))}
                            <a href='/addpatient'><button className="standard-btn">ADD NEW PATIENT</button></a>
                        </div>
                    </div>
                </div>
                <TabScreens />
            </div>

        )
    }
}

export default Dashboard
