import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthServices from '../service/auth-services'


class navigation extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthServices()
  }

  logout = () => {
    this.service.logout()
      .then(x => {
        this.props.setTheUser(null)
      })
  }

  render() {

    return (

      <div className="display">

        <Link to="/">Inicio</Link> <br></br>
        <Link onClick={this.logout} to="/">Cerrar sesión</Link> <br></br>

      </div >

    )
  }
}

export default navigation