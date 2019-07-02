import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import OwnerServices from '../../../service/owner-services'
import TopNav from '../../top-nav'
import BottomNav from '../../bottom-nav'
import { InputAdornment, FormControl, InputLabel, Button, TextField, NativeSelect, Input } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import styled from 'styled-components'


const Finished = styled.div`
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: #fff;
    background-color: #000000;
    margin-top: 20px;
    width: 40%;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
    text-align:center;
    margin: 20px 0;
`;

class MenuForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            menu: {
                type: 'first_courses',
                name: '',
                price: '',
                image: '',
                description: '',
            },
            restaurant: {
                id: this.props.match.params.restaurant_id
            },
            redirect: false,
            show: false
        }

        this.services = new OwnerServices()
    }


    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            menu: {
                ...this.state.menu,
                [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.services.postMenu(this.state.menu, this.state.restaurant.id)
            .then((user) => {
                this.props.setTheUser(user)
                this.setState({
                    menu: {
                        ...this.state.menu,
                        name: '',
                        price: '',
                        image: '',
                        description: '',
                    }
                })
            })
    }

    uploadImg = e => {
        e.preventDefault()
        document.getElementById('image').click()
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                console.log(response)
                this.setState({
                    menu: {
                        ...this.state.menu, image: response.secure_url
                    }
                })

            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <div>
                <TopNav user={this.props} />
                <section className="content">
                    <header className="col-2-header">
                        <h2>Agregar Platos</h2>
                        <Link to={`/owner/${this.state.restaurant.id}/courses/`} >Ver lista</Link>
                    </header>

                    <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                        <FormControl>
                            <InputLabel shrink htmlFor="type">
                                Categoría
                                </InputLabel>
                            <NativeSelect
                                onChange={this.handleChange}
                                input={<Input name="type" id="type" />}
                            >
                                <option value="" />
                                <option value={'first_courses'}>Entrantes</option>
                                <option value={'second_courses'}>Segundos</option>
                                <option value={'drinks'}>Bebidas</option>
                                <option value={'desserts'}>Postre</option>
                            </NativeSelect>
                        </FormControl>

                        <TextField
                            required
                            id="name"
                            name="name"
                            placeholder="Introduzca el nombre"
                            label="Nombre Plato"
                            value={this.state.menu.name}
                            onChange={this.handleChange}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"

                        />
                        <TextField
                            required
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Introduzca el precio"
                            label="Precio del plato"
                            value={this.state.menu.price}
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true,

                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            }}
                            margin="normal"
                            variant="outlined"
                        />

                        <label htmlFor="image" className="upload">
                            <input onChange={this.handleFileUpload} type="file" id="image" name="image" />
                        </label>
                        <div className="width">
                            <Button variant="contained" color="default" onClick={this.uploadImg} >Subir imagen<CloudUploadIcon />
                            </Button>
                        </div>

                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Descripción"
                            placeholder="Introduzca una descripción"
                            multiline
                            rows="2"
                            value={this.state.menu.description}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className="btn-bottom">
                            {/* Agrega los platos al menu  */}
                            <Button variant="contained" type="submit" color="primary">Añadir
                        </Button>
                            {/* Redirige al home del restaurante  */}
                            <Finished>
                                <Link to="/owner/home">
                                    Finalizar
                            </Link>
                            </Finished>
                        </div>

                    </form>
                </section>
                <BottomNav user={this.props.loggedInUser} />
            </div>
        )
    }
}


export default MenuForm