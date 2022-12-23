import React, {useState} from 'react';
import {
    AppBar, Drawer,
    IconButton,
    Link,
    ListItemIcon,
    makeStyles,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import logo from "../../assets/pictures/logo.png";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {withStyles} from "@material-ui/core/styles";
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {NavLink, useNavigate} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import NavList from "./NavList";
import {logoutAction} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import {logout} from "../../api/userAPI";

const StyledMenu = withStyles((theme) => ({
    paper: {
        padding: 0,
        backgroundColor: theme.palette.primary.main
    },
}))((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        style={{top: '50px'}}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: '#0e1731'
        },
    },
}))(MenuItem);

const useStyles = makeStyles(theme => ({
    title: {
        letterSpacing: '0.1rem',
        marginLeft: '25px',
        fontSize: '20px',
        fontWeight: '300',
        '@media(max-width: 900px)' : {
            fontSize: '15px',
        }
    },
    appBar: {
        backgroundColor: '#0a1227',
        top: 0,
        transition: '0.8s',
        boxShadow: 'none',
        opacity: 0.9,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        '&:hover' : {
            opacity: 1
        }
        // boxSizing: 'border-box',
        // position: 'relative',
        // width: '100%',
        // height:'auto'
    },
    logo: {
        width: 100,
        height: 75,
        objectFit: 'contain',
        // marginRight: 25,
        marginTop: 10,
        '@media(max-width: 400px)' : {
            width: 75,
            height: 50,
        }
    },
    username: {
        fontSize: '20px',
        transition: '0.5s',
        '&:hover': {
            color: theme.palette.secondary.main
        },
        '@media(max-width: 400px)' : {
            fontSize: '15px'
        }
    },
    userMenu: {
        padding: 0
    },
    menuIconButton: {
        position: 'absolute',
        right:  50,
        color: '#ffffffff'
    },
    drawerPaper: {
        width: '100%',
        backgroundColor: theme.palette.background.default
    },
    drawer: {
        flex: '0 0 20%',
        position: 'relative',
        top: 5,
        // height: '100%',
        backgroundColor: '#0a1227',
        transition: '0.8s',
        boxShadow: 'none',
        opacity: 0.9,
        padding: '0',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
            opacity: 1
        }
    },
    linkList: {
        padding: 0
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '15px',
        height: '50px',
        letterSpacing: '0.1rem',
        color: 'white',
        '&:hover' : {
            backgroundColor: '#0e1731',
        }
    },
    linkColor: {
        '&:hover' : {
            backgroundColor: '#0e1731',
        }
    },
    activeLink: {
        backgroundColor: '#0e1731',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    subMenu: {
        '.MuiAccordion-root.Mui-expanded': {
            margin: '16px 0'
        }
    }
}))

const EnteredHeader = ({username}) => {
    const classes = useStyles()
    const [openClientMenu, setOpenClientMenu] = useState(false)
    const md = useMediaQuery(theme => theme.breakpoints.up('md'))
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenClientMenu = () => {
        setOpenClientMenu(true)
    }

    const handleCloseClientMenu = () => {
      setOpenClientMenu(false)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        logout()
        dispatch(logoutAction())
        navigate('/')
    }

    return (
        <AppBar position={"static"} className={classes.appBar}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', padding: '0 15px'}}>
                {/*<div className={classes.flexItem}>*/}
                {/*    <MenuIcon fontSize={"large"}/>*/}
                {/*</div>*/}
                <div className={classes.flexItem} style={{display: 'flex', alignItems: 'center'}}>
                    <Link href={'/account-page'}>
                        <img src={logo} alt="logo" className={classes.logo} />
                    </Link>
                    <Typography className={classes.title}>
                        ADMIN PANEL
                    </Typography>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexWrap: 'nowrap'}} >
                    {md && (
                        <Typography className={classes.username}>
                            {username}
                        </Typography>
                    )}
                    {!md && (
                        <>
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
                                classes={{paper: classes.drawer, docked: classes.drawer}}
                            >
                               <NavList />
                            </Drawer>
                        </>
                    )}
                    <AccountCircleIcon onClick={handleOpenClientMenu} fontSize={"large"} style={{marginLeft: '15px'}}/>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={openClientMenu}
                        keepMounted
                        open={openClientMenu}
                        onClose={handleCloseClientMenu}
                        classes={{list: classes.userMenu}}
                    >
                        <StyledMenuItem>
                            <NavLink to={'/account-page/personal-settings'} style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center'}}>
                                <ListItemIcon>
                                    <SettingsIcon htmlColor={'white'} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </NavLink>
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <div onClick={handleLogout} style={{textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center'}}>
                                <ListItemIcon>
                                    <ExitToAppIcon htmlColor={'white'} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                            </div>
                        </StyledMenuItem>
                    </StyledMenu>
                </div>
            </div>
        </AppBar>
    );
}

export default EnteredHeader;
