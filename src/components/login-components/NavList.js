import React from 'react';
import {List, makeStyles} from "@material-ui/core";
import OpenIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/ExpandLess";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {Accordion, AccordionDetails, AccordionSummary} from "./Accordion";

const accountRoutes = [  // /account-page
    { to: '/', name: 'Main Page' },
    { to: '/business-settings', name: 'Business Setup', submenu: [
            {to: '/business-settings/setup', name: 'Setup'},
            {to: '/business-settings/organization-view', name: 'Organization'},
            {to: '/business-settings/brands', name: 'Brands'},
            {to : '/business-settings/token-purchase', name: 'Token Purchase'}]
    },
    { to: '/product-pages', name: 'Product pages' },
    { to: 'tag-store', name: 'Tag store', submenu: [
            {to: '/tag-store/tags', name: 'Tags'},
            {to : '/tag-store/credits', name: 'Credits'}] },
    { to: '/guide', name: 'Guide' },
    { to: '/support', name: 'Support' }
]

const useStyles = makeStyles(theme => ({
    flexPage: {
        display: 'flex',
        minHeight: '100vh'
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

const NavList = () => {
    const classes = useStyles()
    const accountRouterPath = '/account-page'
    const isOrganization = useSelector(state => state.user.isOrganization)
    const [expanded, setExpanded] = React.useState('false');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <nav>
            <List classes={{padding: classes.linkList}}>
                {accountRoutes.map((route) => (
                    (route.submenu ? (
                        <Accordion
                            expanded={expanded === route.name}
                            onChange={handleChange(route.name)}
                            classes={{root: classes.subMenu}}>
                            <AccordionSummary
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                                classes={{root: classes.link}}>
                                {/*<NavLink*/}
                                {/*    to={accountRouterPath + route.to}*/}
                                {/*    className={({isActive}) => (isActive ? classNames(classes.activeLink): classNames(classes.linkColor))}*/}
                                {/*    style={{color: 'white',textDecoration: 'none', display: 'block', textAlign: 'center', height: '100%'}}*/}
                                {/*>*/}
                                <div
                                    className={classes.linkColor}
                                    style={{color: 'white',textDecoration: 'none', display: 'block', textAlign: 'center', height: '100%'}}
                                >
                                    {route.name}
                                    {expanded !== 'panel1' ?
                                        <OpenIcon style={{position: 'absolute', right: '5'}}/> :
                                        <CloseIcon style={{position: 'absolute', right: '5'}}/>
                                    }
                                </div>
                                {/*</NavLink>*/}
                            </AccordionSummary>
                            <AccordionDetails>
                                <List classes={{padding: classes.linkList}} style={{width: '100%', backgroundColor: '#0e1731'}}>
                                    {route.submenu.map((childRoute) => (
                                        <>
                                            {childRoute.name === "Setup" && isOrganization ? null : (
                                                <>
                                                {childRoute.name === "Organization" && !isOrganization ? null : (
                                                    <NavLink
                                                        to={accountRouterPath + childRoute.to}
                                                        className={({isActive}) => (isActive ? classNames(classes.activeLink, classes.link): classNames(classes.linkColor, classes.link))}
                                                        style={{textDecoration: 'none', position: 'relative'}}
                                                    >
                                                        {childRoute.name}
                                                    </NavLink>
                                                )}
                                                </>
                                            )}
                                        </>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        <NavLink
                            to={accountRouterPath + route.to}
                            className={({isActive}) => (isActive ? classNames(classes.activeLink, classes.link): classNames(classes.linkColor, classes.link))}
                            style={{textDecoration: 'none'}}
                            exact
                        >
                            {route.name}
                        </NavLink>
                    ))
                ))}
            </List>
        </nav>
    );
}

export default NavList;
