import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user, setUser, setRestaurant, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {

                if (user) {
                    return <Component {...props} loggedInUser={user} setTheUser={setUser} setRestaurant={setRestaurant} />
                } else {
                    return <Redirect to={{ pathname: '/' }} />
                }
            }
            }
        />
    )
}
export default protectedRoute