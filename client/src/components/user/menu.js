import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import UserTab from './user-tab'
import OwnerServices from '../../service/owner-services'


class UserMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: [],
            order: [],
            restaurant_id: '',
            table_id: 0
        }

        this.services = new OwnerServices()
    }

    componentDidMount() {
        this.services.getMenu(this.props.match.params.restaurant_id)
            .then(menu => {
                this.setState({ menu })
            })
        this.services.getOrder()
            .then(theOrder => {
                this.setState({ order: theOrder })
            })
    }


    inOrder = course => {
        let menuIncludes

        this.state.order.forEach(theCourse => {
            if (theCourse.name === course.name) {
                menuIncludes = theCourse
                menuIncludes.quantity = course.quantity
            }
        })

        this.stateUpdated = false

        if (menuIncludes) {
            return menuIncludes
        }

    }


    updateOrder = (course) => {

        const orderCopy = [...this.state.order]
        orderCopy.push(course)

        this.setState({
            order: orderCopy
        })

        this.stateUpdated = true
    }


    handlechange = e => {
        const { name, value } = e.target
        this.setState({
            menu: {
                ...this.state.menu,
                [name]: value
            }
        })
    }


    render() {

        return (

            < div >
                <TopNav user={this.props} />
                <section className="content-home">
                    <header className="hero-menu">
                        <h1>Welcome to EasyPay</h1>
                    </header>
                    <UserTab menu={this.state.menu} inOrder={this.inOrder} updateOrder={this.updateOrder} />

                    <section className="container">

                    </section>
                </section>

                <BottomNav user={this.props.loggedInUser} />
            </div >
        )
    }
}


export default UserMenu