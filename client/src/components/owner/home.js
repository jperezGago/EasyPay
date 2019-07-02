import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardRestaurant from './cards/card-restaurant'


class HomeOwner extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      show: false
    }
  }

  handleChange = e => {

    this.setState({
      redirect: true
    })
  }


  render() {

    const restaurant = this.props.loggedInUser.restaurant

    if (this.state.redirect) {
      return <Redirect to={`/owner/restaurant/new`} />

    } else {
      return (

        <div>

          <div>
            <TopNav user={this.props} />
            <section className="content-home">
              <header className="hero">
                <h1>Welcome to Easypay</h1>
              </header>

              <div>
                {
                  restaurant ?
                    <section className="container">
                      <h2>Your restaurant</h2>
                      <CardRestaurant restaurant={restaurant} />
                    </section> :
                    <section className="container">
                      <h2>Crear restaurante</h2>
                      <Fab color="primary" aria-label="Add" onClick={this.handleChange}>
                        <AddIcon />
                      </Fab>
                    </section>
                }
              </div>


            </section>


            <BottomNav user={this.props.loggedInUser} />
          </div>

        </div>
      )
    }
  }

}

export default HomeOwner
