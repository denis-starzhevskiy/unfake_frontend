import React from 'react';
import {
    Drawer,
    makeStyles, Typography,
    useMediaQuery
} from "@material-ui/core";
import NavList from "./NavList";

const useStyles = makeStyles(theme => ({
    flexPage: {
        display: 'flex',
        height: 'max-content'
    },
    drawer: {
        flex: '0 0 20%',
        position: 'relative',
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
            // color: '#d7d7d7'
        }
    },
    linkColor: {
        // textAlign: 'center',
        // fontSize: '15px',
        // height: '50px',
        '&:hover' : {
            backgroundColor: '#0e1731',
            // color: '#d7d7d7'
            // color: theme.palette.secondary.main
            // color: theme.palette.text.secondary
        }

        // backgroundColor: '#070d1f'
    },
    activeLink: {
        backgroundColor: '#0e1731',
        // color: theme.palette.text.secondary
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

const AsidePanel = ({ children }) => {
    const classes = useStyles()
    const md = useMediaQuery(theme => theme.breakpoints.up('md'))

    return (
        <>
            {md && (
                <div className={classes.flexPage}>
                    <Drawer
                        variant="permanent"
                        style={{height: '100%'}}
                        classes={{paper: classes.drawer, docked: classes.drawer}}>
                        <NavList/>
                        {/*<Typography variant={'caption'}*/}
                        {/*            color={"textSecondary"}*/}
                        {/*            style={{fontSize: 8, letterSpacing: '0.1rem', position: 'absolute', bottom: 0, width: '100%', textAlign: 'center'}}>*/}
                        {/*    COPYRIGHT &copy; IDO. HANDCRAFTED BY IO, {new Date().getFullYear()}.*/}
                        {/*</Typography>*/}
                        <Typography variant={'caption'}
                                    style={{fontSize: '0.6rem', letterSpacing: '0.1rem', position: 'absolute', bottom: 1, width: '100%', textAlign: 'center'}}>
                            <strong> &copy; Unfake.io, {new Date().getFullYear()}. </strong>All right are secured.
                        </Typography>
                    </Drawer>
                    <div style={{flex: '0 0 80%', marginBottom: '100px'}}>
                        {children}
                    </div>
                </div>
            )}
            {!md && (
                <>
                    {children}
                </>
            )}
        </>
    );
}

export default AsidePanel;
