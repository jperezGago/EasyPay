import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CardRestaurant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    render() {
        const { restaurant } = this.props

        return (
            <div className='cards'>
                <figure>
                    <img src={restaurant.logo} alt='restaurant' />
                </figure>
                <section>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.address}</p>
                    <div>
                        <Link to={`/owner/${restaurant._id}/tables`}>Entrar</Link>
                        <Link to={`/owner/${restaurant._id}/edit`}>Editar</Link>
                    </div>
                </section>

            </div>
        )
    }
}

export default CardRestaurant
