import React from 'react'
import './bottomBar.css'

class TabScreens extends React.Component {

    removeToken = () => {
        console.log("removing JWT");
        localStorage.removeItem('JWT')
        let accessString = localStorage.getItem('JWT');
        console.log(accessString);
    }

    render() {
        return (
            <div className='bottomNav'>
                <div className='row'>
                    <div className='col-3 bar-cols'>
                        <a href='/dashboard' data-toggle="tooltip" data-placement="top" title="Dashboard"><i className="fas fa-home"></i></a>
                    </div>
                    <div className='col-3 bar-cols'>
                        <a href='/addRx' data-toggle="tooltip" data-placement="top" title="Add Rx"><i className="fas fa-prescription-bottle-alt"></i></a>
                    </div>
                    <div className='col-3 bar-cols'>
                        <a href='/addpatient' data-toggle="tooltip" data-placement="top" title="Add patient"><i className="fas fa-users"></i></a>
                    </div>
                    <div className='col-3 bar-cols'>
                        <a href='/signout' data-toggle="tooltip" data-placement="top" title="Sign Out" onClick={this.removeToken}><i className="fas fa-sign-out-alt"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default TabScreens