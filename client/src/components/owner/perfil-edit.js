import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import { Button, TextField } from '@material-ui/core'
import AuthServices from '../../service/auth-services'


class PerfilEdit extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()
        this.state = {
            username: '',
            password: '',
            email: '',
            phone: ''
        }
    }


    logout = e => {
        this.service.logout()
            .then(x => {
                this.props.setTheUser(null)
            })
    }

    handlechange = e => {
        const { name, value } = e.target
        this.setState({

            [name]: value

        })
    }

    render() {
        return (

            <div>
                <TopNav user={this.props} />
                <section className="content">
                    <header className="col-2-header">
                        <h2>Editar Perfil</h2>
                    </header>

                    <form onSubmit={this.handleSubmit} className="form" autoComplete="off">

                        <TextField

                            label="Usuario"
                            id="username"
                            name="username"
                            placeholder="Introduzca un usuario"
                            value={this.state.username}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField

                            label="Nueva contraseña"
                            id="password"
                            name="password"
                            placeholder="Introduzca nueva contraseña"
                            value={this.state.password}
                            onChange={this.handlechange}
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField

                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Introduzca email de contacto"
                            value={this.state.email}
                            onChange={this.handlechange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField

                            id="phone"
                            name="phone"
                            label="Teléfono"
                            placeholder="Introduzca un número de contacto"
                            value={this.state.phone}
                            onChange={this.handlechange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />


                        <div className="btn-bottom">
                            {/* Agrega los platos al menu  */}
                            <Button variant="contained" type="submit" color="primary">Guardar
                        </Button>
                            <Button onClick={this.logout} variant="contained" className='logout' color="primary">Logout
                        </Button>
                        </div>

                    </form>
                </section>
                <BottomNav user={this.props.loggedInUser} />
            </div>
        )
    }
}


export default PerfilEdit