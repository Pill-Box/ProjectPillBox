import React from 'react'
import './patientCard.css'

export const PatientCard = ({ children }) => (
    <div>
        <div className="patient-card">
            <div className="patient-card-header">
                {children[0]} {children[1]} {children[2]} {children[3]} 
            </div>
            <hr />
            <div className="patient-card-body">
                {/* {console.log(children)} */}
                <h6 className="card-text">{children[4]} {children[5]}</h6>
            </div>
        </div>
        <br />
    </div>
);

