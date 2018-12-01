import React from 'react'
import { Navbar } from 'react-bootstrap'
import './title.css'

class Title extends React.Component {
  render() {
    return (
      <div className="nav">
        <Navbar>
          <Navbar.Header>
            <a className="title" href='/'><h1><i>pillBox</i></h1></a>
          </Navbar.Header>
        </Navbar>
      </div>

    )
  }
}

export default Title