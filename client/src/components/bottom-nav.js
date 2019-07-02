import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Home, AccountBox, AspectRatio, ShoppingBasket, InsertChart } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import OwnerServices from '../service/owner-services'


class SimpleBottomNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 'recents',
            table_id: '',
            restaurant_id: '',
            order: [],
            redirect: false
        }
        this.services = new OwnerServices()
    }


    componentDidMount() {
        this.services.getCurrentRestaurant()
            .then(currentRestaurant => {
                this.setState({
                    restaurant_id: currentRestaurant.restaurant_id,
                    table_id: currentRestaurant.table_id
                })
            })
    }


    handleChange = (event, newValue) => {
        this.setState({ value: newValue })

    }


    handlesubmit = e => {
        e.preventDefault()
        this.setState({ redirect: true })
    }



    render() {

        if (this.props.user.role === 'owner')

            return (

                <BottomNavigation value={this.state.value} onChange={this.handleChange}>
                    <BottomNavigationAction label="Home" value="home" icon={<Home />}
                        component={Link}
                        to="/home" />
                    <BottomNavigationAction label="Detalles" value="detalles" icon={<InsertChart />} />
                    <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                        to={`/owner/${this.props.user._id}/perfil_edit`} />
                </BottomNavigation>
            )
        else
            return (

                <BottomNavigation value={this.state.value} onChange={this.handleChange}>

                    <BottomNavigationAction label="Home" value="home" icon={<Home />}
                        component={Link}
                        to="/home" />

                    <BottomNavigationAction label="QR" value="qr" icon={<AspectRatio />}
                        component={Link}
                        to="/qr" />

                    {
                        this.props.user.currentRestaurant && this.props.user.currentRestaurant.restaurant_id !== '' ?

                            <BottomNavigationAction label="Cart" value="cart" icon={<ShoppingBasket />}
                                // onClick={this.handlesubmit}
                                component={Link}
                                // to={`/${this.props.user.currentRestaurant.restaurant_id}/${this.props.user.currentRestaurant.table_id}/order`} />
                                to={`/${this.state.restaurant_id}/${this.state.table_id}/order`} />

                            :
                            null
                    }

                    <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                        to={`/${this.props.user._id}/user_edit`} />

                </BottomNavigation>
            )
    }

}



export default SimpleBottomNavigation
