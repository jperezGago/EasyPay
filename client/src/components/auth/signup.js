import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import AuthServices from '../../service/auth-services'
import styled from 'styled-components'
import { AccountCircle, Https, Group } from '@material-ui/icons'
import { FormControl, NativeSelect, Input, InputLabel } from '@material-ui/core'



const Body = styled.div`
    height: 100vh;
    width: 100vw;
    background: url('../../../img/signup.jpg') right no-repeat/ cover;

`
// falta actualizar state para recibir email y seleccion de profesion

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', role: '', redirect: false }
        this.services = new AuthServices()
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {

        e.preventDefault()
        const { username, password, role } = this.state
        this.services.signup(username, password, role)
            .then(response => {
                this.setState({ username: '', password: '', role: '', redirect: true })
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
                            <FormControl>
                                <InputLabel shrink htmlFor="role">
                                </InputLabel>
                                <NativeSelect
                                    onChange={this.handleChange}
                                    input={<Input
                                        name="role"
                                        id="role"
                                        startAdornment={
                                            <Group />
                                        }
                                    />}
                                >
                                    <option value={''}></option>
                                    <option value={'user'}>usuario</option>
                                    <option value={'owner'}>propietario</option>
                                </NativeSelect>
                            </FormControl>
                            <Input
                                required
                                id="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                                className="input-front"
                                type="text"
                                name="username"
                                placeholder='username'
                                startAdornment={
                                    <AccountCircle />
                                }
                            />
                            {/* <Input
                                required
                                id="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                className="input-front"
                                type="email"
                                name="email"
                                placeholder="email"
                                startAdornment={
                                    <Email />
                                }
                            /> */}
                            <Input
                                required
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


                            <button type="submit">Registrar</button>
                        </form>
                        <footer>
                            <Link to={'/'}>Forgot Details?</Link>
                            <Link to={'/login'}>Login</Link>
                        </footer>
                    </div>
                </Body>

            )
        }
    }

}

export default Signup