import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import OwnerServices from '../../../service/owner-services'
import Button from '@material-ui/core/Button'


class CardCourses extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            show: false
        }

        this.services = new OwnerServices()
    }

    handleChange = e => {
        e.preventDefault()

        const editButton = document.getElementById('editar')
        const clearButton = document.getElementById('borrar')


        if (editButton.id === e.currentTarget.id) {
            this.setState({ redirect: true })

        } else if (clearButton.id === e.currentTarget.id) {
            this.services.deleteMenu(this.props.course)
                .then(user => {
                    this.props.setTheUser(user)
                })
        }
    }

    render() {

        const { course, restaurant } = this.props

        if (this.state.redirect) {
            return <Redirect to={`/owner/${restaurant._id}/menu/${course._id}/edit`} />

        } else {
            return (
                <div>
                    <div className='cards order'>
                        <figure>
                            <img src={course.image} alt='restaurant' />
                        </figure>
                        <section>
                            <div className='sum'>
                                <h2>{course.name} <span>€{course.price}</span></h2>
                            </div>
                            <p>{course.description}.</p>
                            <div className='bottom'>
                                <Button id="editar" onClick={this.handleChange} name='editar' className='btn-edit'>Editar</Button>
                                <Button id="borrar" onClick={this.handleChange} name='borrar' className='btn-del'>Borrar</Button>
                            </div>
                        </section>

                    </div>
                </div>
            )
        }
    }
}

export default CardCourses