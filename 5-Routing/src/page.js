/* src/home.js */
/* Ross Nelson Assignment 5: Routing */
/* Mayu 12th, 2020 */

import React, { useState } from 'react';
import './index.css';
import {
    Link, Redirect, Route, Switch, useLocation
} from "react-router-dom";
import {
    AppBar, CssBaseline, Drawer, List, ListItem, makeStyles, Toolbar, Typography
} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function Page() {
    const classes = useStyles();

    const [message, setMessage] = useState('');
    const [query, setQuery] = useState(message);
    const [redirect, setRedirect] = useState(false);


    // set message to be the new value of the text box
    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    // set the value of the query and set redirect to true
    const handleSubmit = (event) => {
        if (message !== "") {
            let params = new URLSearchParams("?msg=" + message);
            setQuery(params);
        } else {
            setQuery("");
        }
        setRedirect(true);
        event.preventDefault();
    }

    // return the value of msg in the url
    let location = useLocation();
    const getQuery = () => {
        return new URLSearchParams(location.search).get('msg');
    }

    // Return the contents of the home page
    const Home = () => {
        if (redirect) { // redirect to the welcome page if true
            setRedirect(false);
            return (
                <Redirect push to={{
                    pathname: "/welcome",
                    search: query.toString()
                }} />
            );
        } else { // display form if redirect is false
            return (
                <section>
                    <p>Hello!</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Please enter welcome message:
                    <input
                                type="text"
                                value={message}
                                onChange={handleChange}
                                autoFocus="true"
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </section>
            );
        }
    }

    // Return the contents of the welcome page
    const Welcome = () => {
        return (
            <p>Welcome! {getQuery()}</p>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Ross Nelson - Routing
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <List>
                    {['Home', 'Welcome'].map((text, index) => (
                        <Link
                            className='drawerLink'
                            to={
                                (text === "Welcome") ?
                                    {
                                        pathname: "/welcome",
                                        search: query.toString()
                                    }
                                    : "/"
                            }
                            refresh='true'
                        >
                            <ListItem button key={text}>
                                {text}
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/welcome">
                        <Welcome />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
        </div >
    );
}
