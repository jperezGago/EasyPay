import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import OwnerServices from '../../service/owner-services'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import { TextField, Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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


class RestaurantEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: this.props.loggedInUser,
      restaurant: {
        name: this.props.loggedInUser.restaurant.name,
        address: this.props.loggedInUser.restaurant.address,
        phone: this.props.loggedInUser.restaurant.phone,
        description: this.props.loggedInUser.restaurant.description,
        logo: this.props.loggedInUser.restaurant.logo,
        tables_quantity: this.props.loggedInUser.restaurant.tables.length,
        id: this.props.loggedInUser.restaurant._id
      },
      redirect: false,
      show: false
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

    this.services.updateRestaurant(this.state.restaurant)
      .then((user) => {
        this.props.setTheUser(user)
        this.setState({
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
      return <Redirect to={`/owner/home`} />

    } else {
      return (
        <div>
          <TopNav user={this.props} />
          <section className="content">
            <h2>Editar restaurante</h2>
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
              <div className="btn-bottom">
                <Button variant="contained" type="submit" color="primary">Guardar</Button>
                <Finished>
                  <Link to={`/owner/${this.state.restaurant.id}/courses`} variant="contained" type="submit" color="primary">Courses</Link>
                </Finished>
              </div>

            </form>
          </section>
          <BottomNav user={this.props.loggedInUser} />
        </div>
      )
    }
  }
}


export default RestaurantEdit