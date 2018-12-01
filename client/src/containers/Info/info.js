import React from 'react'
import Title from '../../components/Title/title'
import image from '../../components/Images/pillbox.png'
import './info.css'

class Info extends React.Component {
    render() {
        return (
            <div>
                <div className="gradient-background-title">
                    <Title />
                </div>
                <div className='container bbstyle'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='col-md-12' id='image'>
                                <img id="logoImg" src={image} alt="pillbox" />
                            </div>
                            <p><i>The digital Rx aid</i></p>
                            <br />
                            <p className="infoText">Pillbox was born out of the need to easily track, schedule, and organize prescriptions.
                                Whether you only take one pill once a day, multiple medications, or are a caregiver,
                                pillBox was designed to help ease the stress of remembering when and how to take medications.</p>

                            <br />
                            <a href='https://github.com/Pill-Box'><p className="infoText"><i class="fab fa-github"></i></p></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info