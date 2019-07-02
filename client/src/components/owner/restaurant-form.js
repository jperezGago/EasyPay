import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import OwnerServices from '../../service/owner-services'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



class RestaurantForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            restaurant: {
                name: '',
                address: '',
                phone: '',
                description: '',
                logo: '',
                tables_quantity: '',
                id: ''
            },
            redirect: false,
        }
        this.services = new OwnerServices()
    }

    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            restaurant: {
                ...this.state.restaurant,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.services.postRestaurant(this.state.restaurant, this.props.loggedInUser)
            .then((user) => {
                this.props.setTheUser(user)
                this.setState({
                    restaurant: {
                        ...this.state.restaurant,
                        id: user.restaurant._id
                    },
                    redirect: true
                })
            })

    }

    uploadImg = e => {
        e.preventDefault()

        document.getElementById('logo').click()
    }



    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    restaurant: {
                        ...this.state.restaurant, logo: response.secure_url
                    }
                })

            })
            .catch(err => console.log(err))
    }



    render() {

        if (this.state.redirect) {
            return <Redirect to={`/owner/${this.state.restaurant.id}/menu/new`} />

        } else {
            return (
                <div>
                    <TopNav user={this.props} />

                    <section className="content">
                        <h2>Crear restaurante</h2>
                        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                            <TextField
                                required
                                id="name"
                                name="name"
                                placeholder="Introduzca el nombre de su restaurante"
                                label="Nombre"
                                value={this.state.restaurant.name}
                                onChange={this.handlechange}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"

                            />

                            <TextField
                                required
                                id="address"
                                name="address"
                                label="Dirección"
                                placeholder="Introduzca la dirección del restaurante"
                                value={this.state.restaurant.address}
                                onChange={this.handlechange}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />

                            <TextField
                                required
                                id="phone"
                                name="phone"
                                label="Teléfono"
                                placeholder="Introduzca un número de contacto"
                                value={this.state.restaurant.phone}
                                onChange={this.handlechange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />

                            <label htmlFor="logo" className="upload">
                                <input onChange={this.handleFileUpload} type="file" id="logo" name="logo" />
                            </label>
                            <div className="width">
                                <Button variant="contained" color="default" onClick={this.uploadImg} >Subir logo<CloudUploadIcon />
                                </Button>
                            </div>


                            <TextField
                                required
                                id="tables_quantity"
                                name="tables_quantity"
                                label="Número de mesas"
                                placeholder="Introduzca número de mesas"
                                value={this.state.restaurant.tables_quantity}
                                onChange={this.handlechange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Descripción"
                                placeholder="Introduzca una descripción"
                                multiline
                                rows="2"
                                value={this.state.restaurant.description}
                                onChange={this.handlechange}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button variant="contained" type="submit" color="primary">Siguiente</Button>

                        </form>
                    </section>
                    <BottomNav user={this.props.loggedInUser} />
                </div>
            )
        }
    }
}


export default RestaurantForm