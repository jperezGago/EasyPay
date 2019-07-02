import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import AuthServices from '../../service/auth-services'
import styled from 'styled-components'
import { Input } from '@material-ui/core'
import { AccountCircle, Https } from '@material-ui/icons'

const Body = styled.div`
    height: 100vh;
    width: 100vw;
    background: url('../../../img/login.jpg') center no-repeat/ cover;
`

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', redirect: false }
        this.services = new AuthServices()
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
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
                    <div className='section-1'>
                        <img src="../../../img/logoWHITE.png" alt="logo white" className="logowhite" />
                        <p>"your restaurant has never been this efficient"</p>

                        <form onSubmit={this.handleSubmit} autoComplete="off">


                            <Input
                                id="username"
                                onChange={this.handleChange}
                                value={this.state.username} className="input-front"
                                type="text"
                                name="username"
                                placeholder='username'
                                startAdornment={
                                    <AccountCircle />
                                }
                            />
                            <Input
                                id="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                className="input-front"
                                type="password"
                                name="password"
                                placeholder="password"
                                startAdornment={
                                    <Https />
                                }
                            />

                            <button type="submit">Login</button>
                        </form>
                        <footer>
                            <Link to={'/'}>Forgot Details?</Link>
                            <Link to={'/signup'}>Create Account</Link>
                        </footer>
                    </div>


                </Body>
            )
        }
    }

}

export default Login