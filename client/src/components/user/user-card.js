import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import OwnerServices from '../../service/owner-services'


class CardCourses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: {
                name: this.props.course.name,
                price: this.props.course.price,
                description: this.props.course.description,
                image: this.props.course.image,
                quantity: '',
            },
            redirect: false,
            show: false
        }

        this.services = new OwnerServices()
    }


    handlechange = e => {
        const { value } = e.target

        this.setState({
            menu: {
                ...this.state.menu,
                quantity: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { menu } = this.state

        if (!this.props.inOrder(menu)) {

            if (menu.quantity != '') {

                this.services.postOrder(menu)
                    .then((order) => {
                        this.props.updateOrder(order)
                    })
            }
        }

        else {
            if (menu.quantity != '')
                this.services.updateCourse(this.props.inOrder(menu))
        }

        this.setState({ flag: false })

    }


    render() {
        const { course } = this.props

        return (
            <div className='cards order'>
                <figure>
                    <img src={course.image} alt="plato" />
                </figure>
                <section>

                    <h2>{course.name} <span>{course.price}€</span></h2>

                    <p>{course.description}</p>

                    <div className='sum'>
                        <form onSubmit={this.handleSubmit} className="form" autoComplete="off">
                            <TextField
                                id="quantity"
                                name="quantity"
                                label="Cantidad"
                                value={this.state.menu.quantity}
                                onChange={this.handlechange}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                            <Button variant="contained" type="submit" color="primary">Añadir</Button>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

export default CardCourses