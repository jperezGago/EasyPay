import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Badge } from '@material-ui/core'
import KeyLeft from '@material-ui/icons/KeyboardArrowLeft'
import Message from '@material-ui/icons/Message'


const TopNav = (props) => {

    if (props.user.match.url === '/owner/home')
        return (
            <AppBar position="static" color="default" >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back">
                    </IconButton>

                    <Link to="/">
                        <img src='/img/logo.png' alt="logo" className="logo" />
                    </Link>
                </Toolbar>
            </AppBar>
        )
    else if (props.user.match.url === '/home')

        return (

            <AppBar position="static" color="default" >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back">
                    </IconButton>
                    <Link to="/">
                        <img src='/img/logo.png' alt="logo" className="logo" />
                    </Link>
                </Toolbar>
            </AppBar>

        )
    else if (props.user.match.params.table_id)

        return (
            < AppBar position="static" color="default" >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" onClick={e => props.user.history.goBack()}>
                        <KeyLeft />
                    </IconButton>

                    <Link to="/">
                        <img src='/img/logo.png' alt="logo" className="logo" />
                    </Link>
                    <Link to={`/${props.user.match.params.restaurant_id}/${props.user.match.params.table_id}/chat`}>
                        <IconButton aria-label="Show 11 new notifications" color="inherit"  >
                            <Badge color="secondary">
                                <Message />
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar >

        )
    else
        return (
            < AppBar position="static" color="default" >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" onClick={e => props.user.history.goBack()}>
                        <KeyLeft />
                    </IconButton>

                    <Link to="/">
                        <img src='/img/logo.png' alt="logo" className="logo" />
                    </Link>
                </Toolbar>
            </AppBar >
        )

}

export default TopNav