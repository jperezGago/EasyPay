import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute = ({ component: Component, user, setUser, updateTotal, restaurant, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props => {
        if (user && user.role === 'user') {
          return <Component {...props} loggedInUser={user} setTheUser={setUser} updateTotal={updateTotal} restaurant={restaurant} />
        } else {
          return <Redirect to={{ pathname: '/' }} />
        }
      }
      }
    />
  )
}
export default protectedRoute