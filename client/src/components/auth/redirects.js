import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Redirects extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      show: false
    }
  }


  render() {


    if (!this.props.user) {
      console.log('no hay usuario')
      return <Redirect to={"/login"} />
    }

    else {
      const { role } = this.props.user

      if (role === 'user')
        return <Redirect to={"/home"} />

      else if (role === 'owner')
        return <Redirect to={"/owner/home"} />
    }


    // else
    //   return (<div><h1>Redirects</h1></div>)


  }

}

export default Redirects