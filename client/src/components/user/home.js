import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthServices from '../../service/auth-services'
import styled from 'styled-components'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'

const Body = styled.div`
    height: calc(100vh - 70px);
    width: 100vw;
    background: url('../../../img/userhome.jpg') center no-repeat/ cover;
   `


class UserHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '', password: '', redirect: false
        }
        this.services = new AuthServices()
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/owner/restaurant/new' />
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { username, password } = this.state

        this.services.login(username, password)
            .then(response => {
                this.setState({ username: '', password: '', redirect: true })
                this.props.setTheUser(response)
            })
            .catch(error => console.log(error.response.data.message))
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        } else {
            return (

                <Body>
                    <TopNav user={this.props} />
                    <div className='section-1'>
                        <img src="../../../img/logoWHITE.png" alt="logo white" className="logowhite" />
                        <p>"scans the QR of the table and orders "</p>
                    </div>
                    <BottomNav user={this.props.loggedInUser} restaurant={this.props.restaurant} />
                </Body>
            )
        }
    }
}

export default UserHome