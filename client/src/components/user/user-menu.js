import React, { Component } from 'react'
import UserCard from './user-card'


class UserMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            order: [],
            redirect: false,
        }
    }


    render() {

        const { menu, coursesType } = this.props
        const filteredMenu = menu.filter(course => course.type === coursesType)

        if (menu.length) {

            return (

                <div>
                    <section className='container'>
                        {filteredMenu.map((course, idx) => {
                            return <UserCard key={idx} course={course} inOrder={this.props.inOrder} updateOrder={this.props.updateOrder} />
                        })}
                    </section>

                </div>
            )

        } else {

            return (
                <h2>No existen platos</h2>
            )
        }
    }
}


export default UserMenu