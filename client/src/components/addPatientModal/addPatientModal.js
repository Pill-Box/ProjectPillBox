import React from 'react'
import '../RxModal/rxModal.css'


const AddPatientModal = ({ handleClose, show, children }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    
    return ( 
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button id='modal' onClick={handleClose}>close</button>
        </section>
      </div>
     
    )
  }
  
  export default AddPatientModal