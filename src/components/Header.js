import React, {useEffect} from 'react';
import {
    AppBar, Button,
    Drawer,
    IconButton,
    Link, List,
    ListItem,
    ListItemText, makeStyles, Typography,
    useMediaQuery
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import logo from '../assets/pictures/logo.png'
import Login from "./Login";
import {useNavigate} from "react-router-dom";

const routes = [
    { to: '/', name: 'Home' },
    { to: '/download', name: 'Download' },
    { to: '/contactUs', name: 'Contact Us' },
    { to: '/how', name: 'How it works' },
    { to: '/faq', name: 'FAQ' }
]

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'fixed',
        left: 0,
        top: 0,
        // width: '100%',
        boxShadow: 'none',
        opacity: 0.9,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        // '&:hover' : {
        //     opacity: 1
        // }
    },
    drawerPaper: {
        width: '100%',
        backgroundColor: theme.palette.background.default
    },
    toolbar: {
        height: 90
    },
    logo: {
        width: 100,
        height: 75,
        objectFit: 'contain',
        marginTop: 10
    },
    link: {
        color: theme.palette.text.primary,
        transition: 'all 0.5s',
        fontSize: theme.typography.fontSize,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.primary.light,
        },
        cursor: 'default',
        [theme.breakpoints.up('md')]: {
            cursor: 'pointer',
        },
    },
    activeLink: {
        color: theme.palette.primary.main,
    },
    menuIconButton: {
        position: 'absolute',
        right: 0,
        color: '#ffffffff'
    },
    placeholder: {
        height: 90,
    },
    loginBtn: {
        fontWeight: 500,
        fontSize: '11px',
        borderRadius: '25px',
        border: `3px solid ${theme.palette.primary.light}`,
        '&:hover' : {
            backgroundColor: theme.palette.primary.light
        }
    },
    signUp: {
        '&:hover': {
            color: theme.palette.hover.extra,
            cursor: 'pointer'
        }
    }
}))

const Header = () => {
    const classes = useStyles()
    const md = useMediaQuery(theme => theme.breakpoints.up('md'))
    const [open, setOpen] = React.useState(false)
    const [backgroundColor, setBackgroundColor] = React.useState("#08091b")
    const [loginFormOpen, setLoginFormOpen] = React.useState(false)
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = (to) => {
        navigate(to)
        setOpen(false)
    }

    useEffect(() => {
        let listener = () => {
            if(window.scrollY < 20) {
                setBackgroundColor("#08091b")
            }
            if(window.scrollY > 20) {
                setBackgroundColor("#0a1227")
            }
        }
        window.addEventListener('scroll', listener)
        return () => {
            window.removeEventListener('scroll', listener)
        }
    }, [])

    return (
        <AppBar className={classes.appBar} style={{backgroundColor}}>
            <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'nowrap'}}>
                <div onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className={classes.logo} />
                </div>
                {md && (
                    <>
                        <nav style={{marginTop: '10px'}}>
                            <List style={{ display: 'flex' }}>
                                {routes.map(({ to, name }) => (
                                    <ListItem className={classes.link} style={{ whiteSpace: 'nowrap' }} key={name}>
                                        <ListItemText>
                                            <Link
                                                onClick={() => {
                                                    //navigate(to)
                                                    alert(`This route ${to} is yet to be done ASAP`)
                                                }}
                                                // component={RouterLink}
                                                className={classes.link}
                                                // activeClassName={classes.activeLink}
                                                // exact
                                            >
                                                {name}
                                            </Link>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </nav>
                        <div style={{display: 'flex', alignItems: 'center', columnGap: '5px'}}>
                            <Button className={classes.loginBtn}
                            onClick={() => {
                                setLoginFormOpen(true)
                            }}>
                                LOGIN
                            </Button>
                            or
                            <Typography color={"textPrimary"} className={classes.signUp} onClick={() => navigate("/sign-up")}>
                                 Sign Up
                            </Typography>
                        </div>
                    </>
                )}
                {!md && (
                    <>
                        <Button className={classes.loginBtn}
                                onClick={() => {
                                    setLoginFormOpen(true)
                                }}>
                            LOGIN
                        </Button>
                        <IconButton
                            aria-label={'menu button'}
                            className={classes.menuIconButton}
                            color={'primary'}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={handleDrawerClose}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <nav style={{marginTop: '5px'}}>
                                <List>
                                    {routes.map(({ to, name }) => (
                                        <ListItem key={name}>
                                            <ListItemText style={{ textAlign: 'center' }}>
                                                <Link
                                                    onClick={() => {
                                                        handleDrawerClose(to)
                                                    }}
                                                    className={classes.link}
                                                >
                                                    {name}
                                                </Link>
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </nav>
                        </Drawer>
                    </>
                )}
            </div>
            <Login visible={loginFormOpen} close={() => {
                setLoginFormOpen(false)}
            }/>
        </AppBar>
    );
}

export default Header;
